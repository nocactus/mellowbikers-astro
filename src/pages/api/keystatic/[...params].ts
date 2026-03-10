import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

// Override Keystatic's injected API route om credentials expliciet via _config
// (priority 1) mee te geven. De standaard injected route roept makeHandler({ config })
// aan zonder clientId/clientSecret/secret, waardoor Keystatic terugvalt op
// context.locals.runtime.env (priority 2) en import.meta.env (priority 3).
// Door ze hier direct op te zetten wordt priority-1 gebruikt (meest betrouwbaar).
// De waarden worden door Vite's define in astro.config.mjs ingebakken tijdens de build.
export const ALL = makeHandler({
  config,
  clientId: import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: import.meta.env.KEYSTATIC_SECRET,
});
