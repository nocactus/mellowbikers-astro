import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // LET OP: de build draait op webpack (`next build --webpack`), niet op
  // Turbopack. Turbopack externaliseert de drizzle-kit-import van de
  // SQLite-adapter onder een gehashte naam die esbuild vervolgens niet
  // kan vinden, waardoor `opennextjs-cloudflare build` afbreekt — zie
  // payloadcms/payload#16470. Met webpack ontstaat die import niet.
  // Terug naar Turbopack kan zodra die issue gesloten is.

  // Expliciete workspace root. Zonder dit leidt Next de root af uit de
  // dichtstbijzijnde lockfile, en pakt dan bij een genest project de
  // verkeerde map — inclusief bestanden die hier niet horen.
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },

  // Next schrijft anders ongevraagd AGENTS.md en CLAUDE.md in de repo.
  agentRules: false,

  // Beeldformaten komen van Cloudflare Image Transformations, niet van
  // next/image. Zie src/lib/cfImage.ts voor het waarom.
  images: { unoptimized: true },

  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
