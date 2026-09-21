import { APIError } from 'payload'

/**
 * Fail-closed Turnstile-verificatie.
 *
 * De Astro-versie deed dit:
 *   if (turnstileSecret && token) { ...verifieer... }
 * Ontbrak de secret in de omgeving, dan werd de verificatie stilzwijgend
 * overgeslagen en stond het formulier open voor spam. Hier weigert een
 * ontbrekende secret de verzending, zodat je het merkt in plaats van dat
 * het maandenlang onopgemerkt open staat.
 *
 * Alles gooit een APIError met een status buiten de 500, want Payload
 * verbergt de melding van een gewone Error achter "Something went wrong."
 * (zie utilities/isErrorPublic.js). De bezoeker kreeg daardoor geen enkele
 * aanwijzing, en wij ook niet.
 */

type Logger = { error: (obj: object, msg?: string) => void }

type SiteverifyOutcome = {
  success?: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstile(
  token: unknown,
  secret: string | undefined,
  logger?: Logger,
): Promise<void> {
  if (!secret) {
    logger?.error(
      { reden: 'TURNSTILE_SECRET_KEY ontbreekt in de omgeving' },
      'Turnstile: verzending geweigerd',
    )
    // 503 en niet 500: dit is een configuratiefout, en de bezoeker moet
    // horen dat het aan ons ligt en niet aan hun invoer.
    throw new APIError('Het formulier is tijdelijk niet beschikbaar. Probeer het later opnieuw.', 503)
  }

  if (typeof token !== 'string' || token.length === 0) {
    throw new APIError('Verificatie ontbreekt. Vink de beveiligingscheck aan en probeer opnieuw.', 400)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  })

  if (!response.ok) {
    logger?.error(
      { status: response.status },
      'Turnstile: siteverify gaf een onverwachte status',
    )
    throw new APIError('Verificatie is nu niet mogelijk. Probeer het later opnieuw.', 503)
  }

  const outcome = (await response.json()) as SiteverifyOutcome

  if (!outcome.success) {
    // De foutcodes van Cloudflare zijn het enige dat onderscheid maakt
    // tussen een verkeerde secret, een verlopen token en een token dat al
    // gebruikt is. Ze horen in het log, niet in het antwoord.
    logger?.error(
      { foutcodes: outcome['error-codes'] ?? [] },
      'Turnstile: token geweigerd',
    )
    throw new APIError('Verificatie mislukt. Vernieuw de pagina en probeer het opnieuw.', 403)
  }
}
