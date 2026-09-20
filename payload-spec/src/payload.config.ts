import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { getCloudflareContext, type CloudflareContext } from '@opennextjs/cloudflare'
import type { GetPlatformProxyOptions } from 'wrangler'

import { Pages } from './collections/Pages'
import { Events } from './collections/Events'
import { Members } from './collections/Members'
import { Faq } from './collections/Faq'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { verifyTurnstile } from './lib/turnstile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value)?.endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Mellowbikers' },
  },

  collections: [Pages, Events, Members, Faq, Media, Users],
  globals: [Header, Footer, SiteSettings],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    // NIET WEGHALEN.
    //
    // Zonder deze vlag slaat D1 elk blokveld op als losse kolom in een
    // relationele structuur. Bij een blokkenbibliotheek van deze omvang
    // overschrijdt een UPDATE dan de SQLite-limiet op bound parameters
    // en faalt elke save met "too many SQL variables"
    // (payloadcms/payload#14766, open sinds november 2025).
    //
    // Achteraf omzetten vereist een datamigratie, dus dit staat vanaf de
    // allereerste migratie aan.
    blocksAsJSON: true,
  }),

  storage: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],

  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${doc?.title} | Mellowbikers`,
      generateURL: ({ doc }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}${doc?.slug === 'home' ? '' : `/${doc?.slug}`}`,
    }),

    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        admin: {
          description:
            'Oude URL naar nieuwe URL. Vul hier de WordPress-paden in zodat bestaande links blijven werken.',
        },
      },
    }),

    formBuilderPlugin({
      fields: { payment: false },
      formOverrides: {
        admin: { group: 'Formulieren' },
      },
      formSubmissionOverrides: {
        admin: { group: 'Formulieren' },
        hooks: {
          beforeValidate: [
            async ({ data, operation }) => {
              if (operation !== 'create') return data

              // Fail-closed: ontbreekt de secret, dan wordt er niets
              // opgeslagen en niets gemaild.
              await verifyTurnstile(
                (data as { turnstileToken?: unknown })?.turnstileToken,
                process.env.TURNSTILE_SECRET_KEY,
              )

              // Het token hoort niet in de database.
              if (data && 'turnstileToken' in data) delete (data as Record<string, unknown>).turnstileToken

              return data
            },
          ],
        },
      },
    }),
  ],

  // Op Workers werkt pino-pretty niet; console-based logger zoals in de
  // officiele Cloudflare-template.
  logger: isProduction ? cloudflareLogger() : undefined,
})

function cloudflareLogger() {
  const write = (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') fn(JSON.stringify({ level, msg: objOrMsg }))
    else fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
  }

  return {
    level: process.env.PAYLOAD_LOG_LEVEL || 'info',
    trace: write('trace', console.debug),
    debug: write('debug', console.debug),
    info: write('info', console.log),
    warn: write('warn', console.warn),
    error: write('error', console.error),
    fatal: write('fatal', console.error),
    silent: () => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
}

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
