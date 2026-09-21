/**
 * Zet de vrije-tekst datums uit de Astro-agenda om naar echte datums.
 *
 * De oude notatie was inconsistent: "Zo 11 Januari", "12-14 juni 2026",
 * "29-31 mei", "1e week September". Wat niet met zekerheid te lezen is,
 * wordt NIET gegokt maar gemeld, zodat iemand het handmatig nakijkt.
 */

const MONTHS: Record<string, number> = {
  januari: 0, februari: 1, maart: 2, april: 3, mei: 4, juni: 5,
  juli: 6, augustus: 7, september: 8, oktober: 9, november: 10, december: 11,
}

export type ParsedDate =
  | { ok: true; startDate: string; endDate?: string }
  | { ok: false; reason: string }

const iso = (year: number, month: number, day: number): string =>
  new Date(Date.UTC(year, month, day, 12, 0, 0)).toISOString()

const findMonth = (text: string): number | null => {
  const lower = text.toLowerCase()
  for (const [name, index] of Object.entries(MONTHS)) {
    if (lower.includes(name)) return index
  }
  return null
}

export function parseDutchDate(raw: string, defaultYear: number): ParsedDate {
  const text = raw.trim()
  const month = findMonth(text)

  if (month === null) return { ok: false, reason: 'geen maandnaam gevonden' }

  const yearMatch = text.match(/\b(20\d{2})\b/)
  const year = yearMatch ? Number(yearMatch[1]) : defaultYear

  // Strip het jaartal zodat het niet als dagnummer wordt gelezen.
  const withoutYear = yearMatch ? text.replace(yearMatch[0], ' ') : text

  // Bereik: "12-14 juni", "29-31 mei"
  const range = withoutYear.match(/\b(\d{1,2})\s*[-–]\s*(\d{1,2})\b/)
  if (range) {
    const from = Number(range[1])
    const to = Number(range[2])
    if (from < 1 || from > 31 || to < 1 || to > 31 || to < from) {
      return { ok: false, reason: `onlogisch bereik "${range[0]}"` }
    }
    return { ok: true, startDate: iso(year, month, from), endDate: iso(year, month, to) }
  }

  // Enkele dag: "Zo 11 Januari", "19 april"
  const single = withoutYear.match(/\b(\d{1,2})\b/)
  if (single) {
    const day = Number(single[1])
    if (day < 1 || day > 31) return { ok: false, reason: `ongeldige dag "${day}"` }
    return { ok: true, startDate: iso(year, month, day) }
  }

  // "1e week September" en soortgelijke omschrijvingen.
  return { ok: false, reason: 'wel een maand, maar geen concrete dag' }
}
