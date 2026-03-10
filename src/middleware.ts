import { defineMiddleware } from 'astro:middleware';

const PROTECTED_PREFIXES = ['/keystatic', '/api/keystatic'];

// GitHub OAuth callback mag nooit geblokkeerd worden (anders werkt de login-flow niet)
const ALWAYS_ALLOW = [
  '/keystatic-login',
  '/api/keystatic/github/oauth/callback',
];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Alleen beschermde routes checken
  const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
  if (!isProtected) {
    return next();
  }

  // Uitzonderingen: login pagina en OAuth callback
  if (ALWAYS_ALLOW.includes(pathname)) {
    return next();
  }

  // In development: geen auth nodig
  if (import.meta.env.DEV) {
    return next();
  }

  // Check sessie cookie
  const sessionCookie = context.cookies.get('keystatic_session')?.value;
  const expectedToken = getExpectedToken(context);

  if (expectedToken && sessionCookie === expectedToken) {
    return next();
  }

  // API requests: 401 teruggeven (geen redirect)
  if (pathname.startsWith('/api/keystatic')) {
    return new Response('Unauthorized', { status: 401 });
  }

  // UI requests: redirect naar login
  return context.redirect(`/keystatic-login?redirect=${encodeURIComponent(pathname)}`);
});

function getExpectedToken(context: any): string {
  const password = (context.locals.runtime?.env?.KEYSTATIC_PASSWORD as string)
    || import.meta.env.KEYSTATIC_PASSWORD
    || '';

  if (!password) return '';

  // Genereer een afgeleide token (niet het wachtwoord zelf in de cookie)
  return btoa(`keystatic-admin:${password}`);
}
