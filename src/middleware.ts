import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Alleen de Keystatic UI beschermen — /api/keystatic/* heeft z'n eigen GitHub OAuth auth
  const isProtectedUI = pathname.startsWith('/keystatic')
    && !pathname.startsWith('/keystatic-login');

  if (!isProtectedUI) {
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

  // Redirect naar login
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
