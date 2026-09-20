/**
 * Fail-closed Turnstile-verificatie.
 *
 * De Astro-versie deed dit:
 *   if (turnstileSecret && token) { ...verifieer... }
 * Ontbrak de secret in de omgeving, dan werd de verificatie stilzwijgend
 * overgeslagen en stond het formulier open voor spam. Hier gooit een
 * ontbrekende secret een fout, zodat je het merkt in plaats van dat het
 * maandenlang onopgemerkt open staat.
 */
export async function verifyTurnstile(token: unknown, secret: string | undefined): Promise<void> {
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY ontbreekt — formulierverzending geweigerd.')
  }

  if (typeof token !== 'string' || token.length === 0) {
    throw new Error('Verificatie ontbreekt. Vink de beveiligingscheck aan en probeer opnieuw.')
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  })

  const outcome = (await response.json()) as { success?: boolean }

  if (!outcome.success) {
    throw new Error('Verificatie mislukt. Probeer het opnieuw.')
  }
}
