import type { EmailAdapter, SendEmailOptions } from 'payload'

/**
 * E-mailadapter voor Postmark via de HTTP-API.
 *
 * De standaard nodemailer-adapter van Payload werkt niet op Workers: die
 * opent een SMTP-verbinding en leunt op Node-modules die daar niet
 * bestaan. Postmark heeft een gewone REST-API, dus fetch volstaat.
 *
 * Zonder POSTMARK_API_TOKEN wordt er niet stilletjes niets gedaan: de
 * verzending gooit een fout. Inzendingen zijn op dat moment al in de
 * database opgeslagen, dus er gaat niets verloren — je ziet alleen in de
 * logs dat de notificatie niet aankwam.
 */

type Args = {
  defaultFromAddress: string
  defaultFromName: string
}

const stripHtml = (html: string): string =>
  html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const toRecipients = (value: SendEmailOptions['to']): string => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(toRecipients).join(', ')
  return (value as { address: string }).address
}

export const postmarkAdapter =
  ({ defaultFromAddress, defaultFromName }: Args): EmailAdapter =>
  ({ payload }) => ({
    name: 'postmark',
    defaultFromAddress,
    defaultFromName,

    sendEmail: async (message) => {
      const token = process.env.POSTMARK_API_TOKEN

      if (!token) {
        throw new Error(
          'POSTMARK_API_TOKEN ontbreekt — e-mail niet verstuurd. De inzending staat wel in de database.',
        )
      }

      const html = typeof message.html === 'string' ? message.html : undefined
      const text =
        typeof message.text === 'string' ? message.text : html ? stripHtml(html) : undefined

      const response = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Postmark-Server-Token': token,
        },
        body: JSON.stringify({
          From: message.from ?? `${defaultFromName} <${defaultFromAddress}>`,
          To: toRecipients(message.to),
          Subject: message.subject ?? '',
          ...(html ? { HtmlBody: html } : {}),
          ...(text ? { TextBody: text } : {}),
          ...(message.replyTo ? { ReplyTo: toRecipients(message.replyTo) } : {}),
          MessageStream: 'outbound',
        }),
      })

      if (!response.ok) {
        const body = await response.text()
        payload.logger.error({ msg: 'Postmark weigerde de e-mail', status: response.status, body })
        throw new Error(`Postmark gaf ${response.status} terug.`)
      }

      return response.json()
    },
  })
