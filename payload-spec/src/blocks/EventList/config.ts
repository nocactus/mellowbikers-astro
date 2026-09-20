import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

/**
 * Vervangt de handmatige agenda uit de Astro-versie. Daar waren datums
 * vrije tekst ("Zo 11 Januari") met een handmatig order-veld en een
 * completed-vinkje, waardoor er in september 2026 nog tien verlopen
 * ritten als "aankomend" op de site stonden. Hier komt de scheiding
 * tussen komend en geweest uit de datum zelf.
 */
export const EventList: Block = {
  slug: 'eventList',
  interfaceName: 'EventListBlock',
  labels: { singular: 'Agenda', plural: "Agenda's" },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje' },
    { name: 'intro', type: 'textarea', label: 'Inleiding' },
    {
      name: 'filter',
      type: 'select',
      label: 'Welke ritten tonen?',
      defaultValue: 'upcoming',
      options: [
        { label: 'Alleen komende', value: 'upcoming' },
        { label: 'Alleen geweest', value: 'past' },
        { label: 'Komende eerst, daarna geweest', value: 'all' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Maximaal aantal',
      defaultValue: 0,
      min: 0,
      admin: { description: '0 = geen limiet.' },
    },
    sectionAppearance,
  ],
}
