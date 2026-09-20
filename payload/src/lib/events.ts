import type { Event } from '@/payload-types'

const DAY = new Intl.DateTimeFormat('nl-NL', { weekday: 'short', timeZone: 'Europe/Amsterdam' })
const FULL = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Amsterdam',
})
const DAY_ONLY = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', timeZone: 'Europe/Amsterdam' })
const MONTH_YEAR = new Intl.DateTimeFormat('nl-NL', {
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Amsterdam',
})

/**
 * Levert dezelfde leesbare notatie op als de handgetypte datums in de
 * oude agenda ("Zo 11 januari", "12-14 juni 2026"), maar afgeleid uit
 * echte datumvelden — dus altijd kloppend en sorteerbaar.
 */
export function formatEventDate(event: Pick<Event, 'startDate' | 'endDate'>): string {
  const start = new Date(event.startDate)
  const end = event.endDate ? new Date(event.endDate) : null

  if (end && end.toDateString() !== start.toDateString()) {
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    return sameMonth
      ? `${DAY_ONLY.format(start)}-${DAY_ONLY.format(end)} ${MONTH_YEAR.format(end)}`
      : `${FULL.format(start)} - ${FULL.format(end)} ${MONTH_YEAR.format(end)}`
  }

  const weekday = DAY.format(start).replace('.', '')
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${FULL.format(start)}`
}

/** JSON-LD voor rich results in Google. Dit kon met de oude vrije-tekst
 *  datums helemaal niet. */
export function eventJsonLd(event: Event, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    ...(event.location
      ? { location: { '@type': 'Place', name: event.location } }
      : {}),
    ...(event.summary ? { description: event.summary } : {}),
    organizer: { '@type': 'SportsClub', name: 'Mellowbikers', url: siteUrl },
  }
}
