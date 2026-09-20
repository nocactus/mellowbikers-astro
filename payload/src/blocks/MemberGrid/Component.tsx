import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { MemberGridBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { CONTAINER } from '@/lib/theme'

export const MemberGridComponent = async ({ block }: { block: MemberGridBlock }) => {
  const payload = await getPayload({ config })
  const { docs: members } = await payload.find({
    collection: 'members',
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  if (members.length === 0) return null

  return (
    <>
      <Section appearance={block.appearance}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {block.title && (
                <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-4">{block.title}</h2>
              )}
              {block.intro && (
                <div className="prose-mellow text-xl md:text-2xl leading-relaxed">
                  <RichText data={block.intro} />
                </div>
              )}
            </div>

            {block.showIndex && (
              <ul className="list-none text-xl md:text-2xl leading-relaxed md:text-right">
                {members.map((member) => (
                  <li key={member.id}>
                    <a href={`#${member.slug}`} className="hover:text-mellow-groen transition-colors">
                      🚵🏻‍♂️ {member.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      {members.map((member) => (
        <section key={member.id} id={member.slug} className="w-full bg-mellow-dark px-4 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            {member.images && member.images.length > 0 && (
              <div
                className={`grid gap-4 mb-8 ${
                  member.images.length > 2 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'
                }`}
              >
                {member.images.map((image, i) => (
                  <CfImage
                    key={i}
                    media={image}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="w-full h-64 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-6">{member.name}</h2>

            <div className="prose-mellow text-base md:text-lg text-mellow-white leading-relaxed">
              <RichText data={member.story} />
            </div>

            <hr className="border-t-2 border-mellow-red my-12" />
          </div>
        </section>
      ))}
    </>
  )
}
