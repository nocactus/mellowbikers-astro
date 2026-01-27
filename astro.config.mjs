import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://astro.mellowbikers.nl',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap(),
    sanity({
      projectId: 'HIER_JE_PROJECT_ID', // Te vervangen door eigen ID
      dataset: 'production',
      useCdn: true,
      studioPath: '/admin', // Optioneel: route voor Sanity Studio
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 30000,
    },
  },
});
