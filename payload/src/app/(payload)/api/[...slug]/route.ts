import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

/* Bewust geen GraphQL-routes.
 *
 * Volledige GraphQL-ondersteuning is niet gegarandeerd wanneer Payload op
 * Workers draait, en elke extra route telt mee richting de 3MB
 * bundle-limiet. De site gebruikt de Local API (server components) en
 * REST (formulieren), dus GraphQL levert hier niets op. */

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
