import { JSDOM } from 'jsdom'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { Payload } from 'payload'

/**
 * Zet de HTML-strings uit de oude content-collections om naar Lexical.
 *
 * De Astro-site zette deze fragmenten met set:html rechtstreeks in de
 * pagina. In Payload wordt het echte gestructureerde rich text, zodat
 * redacteuren het kunnen bewerken zonder HTML te typen.
 */
export async function htmlToLexical(payload: Payload, html: string) {
  const editorConfig = await editorConfigFactory.default({ config: payload.config })

  return convertHTMLToLexical({
    editorConfig,
    html: html.trim().startsWith('<') ? html : `<p>${html}</p>`,
    JSDOM,
  })
}

/** Platte tekst (bijvoorbeeld een markdown-body) naar Lexical, waarbij
 *  lege regels een nieuwe alinea worden. */
export async function textToLexical(payload: Payload, text: string) {
  const html = text
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br />')}</p>`)
    .join('')

  return htmlToLexical(payload, html)
}
