/**
 * Verlaagt Payload's PBKDF2-iteraties naar wat de Workers-runtime toestaat.
 *
 * Payload hasht wachtwoorden met 600.000 iteraties (de OWASP-aanbeveling
 * voor PBKDF2-SHA256). workerd staat er maximaal 100.000 toe, bewust, als
 * DoS-bescherming — zie cloudflare/workerd#1346. Boven die grens gooit
 * crypto.pbkdf2 een NotSupportedError, en dan mislukt zowel het aanmaken
 * van een gebruiker als elke login:
 *
 *   NotSupportedError: Pbkdf2 failed: iteration counts above 100000 are
 *   not supported (requested 600000).
 *
 * Er is geen configuratie-optie voor; de waarde is een constante in
 * generatePasswordSaltHash.js. Dezelfde constante wordt gebruikt bij het
 * verifiëren, dus hashen en controleren blijven consistent zolang deze
 * patch overal draait — daarom hangt hij aan postinstall en niet aan een
 * handmatige stap.
 *
 * Let op bij een Payload-upgrade: dit script stopt met een foutmelding
 * als het de verwachte regel niet meer vindt. Dat is opzet. Draait het
 * niet, dan is de admin onbruikbaar op Workers, en dat wil je bij de
 * upgrade weten en niet bij de eerste inlogpoging.
 */
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const target = path.resolve(
  dirname,
  '../node_modules/payload/dist/auth/strategies/local/generatePasswordSaltHash.js',
)

const WORKERD_MAX = 100000
const PAYLOAD_DEFAULT = 600000
const zoek = `const currentPasswordHashIterations = ${PAYLOAD_DEFAULT};`
const vervang = `const currentPasswordHashIterations = ${WORKERD_MAX};`

const source = await readFile(target, 'utf8').catch(() => null)

if (source === null) {
  console.error(`\nPBKDF2-patch: ${path.relative(process.cwd(), target)} niet gevonden.`)
  console.error('Is de map van Payload verplaatst? De patch is niet toegepast.\n')
  process.exit(1)
}

if (source.includes(vervang)) {
  console.log(`PBKDF2-patch: al toegepast (${WORKERD_MAX} iteraties).`)
  process.exit(0)
}

if (!source.includes(zoek)) {
  console.error('\nPBKDF2-patch: de verwachte regel staat er niet.')
  console.error(`  gezocht: ${zoek}`)
  console.error('\nPayload heeft deze code gewijzigd. Controleer of er inmiddels een')
  console.error('configuratie-optie voor de iteraties bestaat — dan kan dit script weg.')
  console.error('Zo niet, pas de patch aan. Zonder patch werkt inloggen niet op Workers.\n')
  process.exit(1)
}

await writeFile(target, source.replace(zoek, vervang), 'utf8')
console.log(`PBKDF2-patch: ${PAYLOAD_DEFAULT} -> ${WORKERD_MAX} iteraties (Workers-limiet).`)
