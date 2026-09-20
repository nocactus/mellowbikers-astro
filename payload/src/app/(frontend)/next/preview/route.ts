import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * Zet draft mode aan zodat een redacteur een concept kan bekijken.
 *
 * De toegang wordt hier gecontroleerd met payload.auth() op de
 * inkomende cookies: alleen wie in de admin is ingelogd, krijgt draft
 * mode. Zonder die check zou iedereen met de URL ongepubliceerde
 * content kunnen lezen.
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (!path?.startsWith('/')) {
    return new Response('Ongeldig pad.', { status: 400 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return new Response('Je moet ingelogd zijn om concepten te bekijken.', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
