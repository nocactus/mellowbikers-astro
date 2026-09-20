/**
 * Alle Tailwind-classes staan hier als complete string-literals.
 *
 * Dit is bewust: in de Astro-versie bouwde MountainSeparator zijn classes
 * op als `bg-${color}`. Tailwind scant de broncode op letterlijke strings,
 * dus zo'n samengestelde class wordt nooit gegenereerd en de kleur viel
 * stilletjes terug op transparant. Nooit interpoleren in classnames.
 */

export type SectionColor = 'dark' | 'red' | 'white' | 'blue' | 'none'

export const SECTION_BG: Record<SectionColor, string> = {
  dark: 'bg-mellow-dark',
  red: 'bg-mellow-red',
  white: 'bg-mellow-white',
  blue: 'bg-mellow-blue',
  none: 'bg-transparent',
}

/** Tekstkleur die leesbaar is op de betreffende achtergrond. */
export const SECTION_TEXT: Record<SectionColor, string> = {
  dark: 'text-mellow-white',
  red: 'text-mellow-white',
  white: 'text-mellow-dark',
  blue: 'text-mellow-white',
  none: 'text-mellow-white',
}

/** De twee lagen van de bergsilhouet-separator. */
export const SEPARATOR_FILL: Record<Exclude<SectionColor, 'none'>, [string, string]> = {
  dark: ['bg-mellow-dark', 'bg-mellow-dark/50'],
  red: ['bg-mellow-red', 'bg-mellow-red/50'],
  white: ['bg-mellow-white', 'bg-mellow-white/50'],
  blue: ['bg-mellow-blue', 'bg-mellow-blue/50'],
}

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg'

export const SECTION_PADDING: Record<SectionPadding, string> = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-12 md:py-16',
  lg: 'py-12 md:py-24',
}

export const CONTAINER = 'max-w-7xl mx-auto px-4'
export const CONTAINER_NARROW = 'max-w-4xl mx-auto px-4'

/** Knopvarianten, overgenomen uit de bestaande Astro-markup. */
export const BUTTON: Record<'primary' | 'secondary' | 'ghost', string> = {
  primary:
    'inline-block text-center px-6 py-3 rounded-lg bg-mellow-blue hover:bg-mellow-red text-mellow-white text-xl font-medium transition-colors border-0',
  secondary:
    'inline-block text-center px-6 py-3 rounded-lg border-2 border-mellow-white hover:border-mellow-groen text-xl text-mellow-white hover:text-mellow-groen font-medium transition-colors',
  ghost:
    'inline-block text-center px-6 py-3 rounded-lg text-mellow-groen hover:text-mellow-groen/80 text-xl font-medium transition-colors',
}
