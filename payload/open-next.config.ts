import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

/**
 * Vereist voor `opennextjs-cloudflare build`. Zonder dit bestand stopt
 * de deploy meteen met "No open-next.config.ts file was found".
 *
 * Leeg is prima: de standaardinstellingen volstaan. Wil je later
 * incremental caching op R2 (zodat pagina's niet per request gerenderd
 * worden), dan komt die configuratie hier.
 */
export default defineCloudflareConfig({})
