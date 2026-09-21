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

  // Eén build-worker. Next verzamelt route-configuratie normaal in
  // parallelle processen, en payload.config.ts haalt zijn bindings via
  // getPlatformProxy() — dus elk van die processen start een eigen
  // miniflare op hetzelfde lokale sqlite-bestand in .wrangler/. Dat
  // levert "database is locked: SQLITE_BUSY_RECOVERY" op en breekt de
  // build op elke route af, ook op een schone checkout zonder database.
  // Serieel kost hier vrijwel niets: zes routes, waarvan drie statisch.
  experimental: { cpus: 1 },

  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
