import { parseDutchDate } from './parseDutchDate.ts'

const cases = [
  ['Zo 11 Januari', '2026-01-11', undefined],
  ['Zo 15 februari', '2026-02-15', undefined],
  ['Zo 12 april', '2026-04-12', undefined],
  ['19 april', '2026-04-19', undefined],
  ['Zo 17 mei', '2026-05-17', undefined],
  ['29-31 mei', '2026-05-29', '2026-05-31'],
  ['12-14 juni 2026', '2026-06-12', '2026-06-14'],
  ['28 juni', '2026-06-28', undefined],
  ['9 augustus', '2026-08-09', undefined],
  ['21-23 augustus', '2026-08-21', '2026-08-23'],
  ['25-27 September 2026', '2026-09-25', '2026-09-27'],
  ['25 oktober', '2026-10-25', undefined],
]

let failed = 0
for (const [input, expectStart, expectEnd] of cases) {
  const result = parseDutchDate(input, 2026)
  const start = result.ok ? result.startDate.slice(0, 10) : null
  const end = result.ok && result.endDate ? result.endDate.slice(0, 10) : undefined
  const pass = start === expectStart && end === expectEnd
  if (!pass) { failed++; console.log(`FOUT  "${input}" -> ${start} / ${end}  (verwacht ${expectStart} / ${expectEnd})`) }
  else console.log(`ok    "${input}" -> ${start}${end ? ' t/m ' + end : ''}`)
}

// Deze hoort NIET te parsen.
const vague = parseDutchDate('1e week September', 2026)
if (vague.ok) { failed++; console.log('FOUT  "1e week September" werd geparsed terwijl dat niet kan') }
else console.log(`ok    "1e week September" terecht geweigerd: ${vague.reason}`)

console.log(failed === 0 ? '\nAlle datums kloppen.' : `\n${failed} fout(en).`)
process.exit(failed ? 1 : 0)
