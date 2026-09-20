import type { MapBlockType } from '@/payload-types'
import { Section } from '@/components/Section'
import { CONTAINER } from '@/lib/theme'

export const MapBlockComponent = ({ block }: { block: MapBlockType }) => {
  const query = `${block.latitude},${block.longitude}`
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${block.zoom ?? 14}&output=embed`
  const linkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

  return (
    <Section appearance={block.appearance}>
      <div className={CONTAINER}>
        {block.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-4">{block.title}</h2>
        )}

        <p className="text-xl text-mellow-white mb-4">
          <strong>{block.placeName}</strong>
          {block.address && <span className="block text-base opacity-80">{block.address}</span>}
        </p>

        <iframe
          src={embedUrl}
          title={`Kaart van ${block.placeName}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[300px] rounded-lg border-0 grayscale"
        />

        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-mellow-groen hover:text-mellow-groen/80 underline"
        >
          Route plannen naar {block.placeName}
        </a>
      </div>
    </Section>
  )
}
