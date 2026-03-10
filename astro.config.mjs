import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// Keystatic alleen in dev modus laden (lokaal content bewerken, dan committen)
const isDev = process.argv.includes('dev');
const extraIntegrations = [];
if (isDev) {
  const { default: keystatic } = await import('@keystatic/astro');
  extraIntegrations.push(keystatic());
}

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
    ...extraIntegrations,
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 30000,
    },
  },
});
