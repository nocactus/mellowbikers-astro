import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://astro.mellowbikers.nl',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/keystatic') && !page.includes('/dankje'),
    }),
    react(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Keystatic GitHub auth vars expliciet in de bundle bakken.
    // In Cloudflare Pages: zet deze als "Environment variable" (niet Encrypted secret)
    // zodat ze beschikbaar zijn tijdens de build als process.env.*
    define: {
      ...(process.env.KEYSTATIC_GITHUB_CLIENT_ID && {
        'import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
        'import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
        'import.meta.env.KEYSTATIC_SECRET': JSON.stringify(process.env.KEYSTATIC_SECRET),
      }),
    },
    build: {
      assetsInlineLimit: 30000,
    },
  },
});
