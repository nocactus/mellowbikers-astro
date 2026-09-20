import type { Payload } from 'payload'

type Ctx = {
  payload: Payload
  readJson: <T>(relative: string) => Promise<T>
  media: (
    publicPath: string | undefined,
    alt: string,
    backgroundPosition?: string,
  ) => Promise<number | undefined>
  html: (value: string) => Promise<unknown>
  forms: { contact: number; membership: number }
}

type PageSettings = {
  seo: { title: string; description: string }
  hero: { title: string; backgroundImage: string; backgroundPosition?: string }
  footer?: { backgroundImage?: string; backgroundPosition?: string }
}

const exists = async (payload: Payload, slug: string) =>
  (await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })).docs[0]

/* eslint-disable @typescript-eslint/no-explicit-any */
const asBlocks = (blocks: unknown[]) => blocks as any

export async function migratePages(ctx: Ctx): Promise<string[]> {
  const { payload, readJson, media, html, forms } = ctx
  const made: string[] = []

  const create = async (slug: string, title: string, seo: PageSettings['seo'], layout: unknown[], footerImage?: number) => {
    if (await exists(payload, slug)) return
    await payload.create({
      collection: 'pages',
      data: {
        title,
        slug,
        layout: asBlocks(layout),
        ...(footerImage ? { footerImage } : {}),
        meta: { title: seo.title, description: seo.description },
        _status: 'published',
      },
    })
    made.push(slug)
  }

  /* ------------------------------------------------------------ home */
  const home = await readJson<any>('homepage/content.json')

  await create(
    'home',
    'Home',
    home.seo,
    [
      {
        blockType: 'hero',
        variant: 'full',
        image: await media(home.hero.backgroundImage, 'Mellowbikers op de Brabantse Wal'),
        title: home.hero.title,
        subtitle: home.hero.subtitle,
        overlay: false,
        separatorColor: 'dark',
      },
      {
        blockType: 'splitContent',
        mediaType: 'statement',
        statement: home.lead.greeting,
        eyebrow: home.lead.title,
        content: await html(home.lead.body),
        mediaPosition: 'right',
        appearance: { background: 'dark', padding: 'md', separatorTop: true },
      },
      {
        blockType: 'ctaBanner',
        layout: 'row',
        buttons: [
          { link: { label: home.buttons.spotlightText, type: 'external', url: home.buttons.spotlightLink, style: 'ghost' } },
          { link: { label: home.buttons.contactText, type: 'anchor', anchor: 'contact', style: 'primary' } },
          { link: { label: home.buttons.memberText, type: 'external', url: home.buttons.memberLink, style: 'secondary' } },
        ],
        appearance: { background: 'dark', padding: 'sm' },
      },
      {
        blockType: 'splitContent',
        mediaType: 'image',
        image: await media(home.nextRide.image, 'Mellowbikers onderweg tijdens een clubrit'),
        eyebrow: home.nextRide.title,
        content: await html(home.nextRide.body),
        button: { link: { label: home.nextRide.ctaText, type: 'anchor', anchor: 'contact', style: 'primary' } },
        mediaPosition: 'right',
        framed: true,
        appearance: { background: 'dark', padding: 'md' },
      },
      {
        blockType: 'mediaBlock',
        kind: 'video',
        videoUrl: home.video.src,
        videoTitle: home.video.title,
        fullBleed: true,
        appearance: { background: 'dark', padding: 'none' },
      },
      {
        blockType: 'cardGrid',
        columns: '3',
        cards: await Promise.all(
          home.values.map(async (value: any) => ({ title: value.title, body: stripTags(value.body) })),
        ),
        appearance: { background: 'red', padding: 'md' },
      },
      {
        blockType: 'splitContent',
        mediaType: 'image',
        image: await media(home.beer.image, "Let's Ride — het bier van de Mellowbikers"),
        eyebrow: home.beer.title,
        content: await html(home.beer.body),
        button: { link: { label: home.beer.ctaText, type: 'external', url: home.beer.ctaLink, style: 'primary' } },
        mediaPosition: 'right',
        appearance: { background: 'dark', padding: 'lg' },
      },
      {
        blockType: 'richText',
        content: await html(`<p><em>"${home.quote.text}"</em><br />– ${home.quote.author}</p>`),
        width: 'narrow',
        appearance: { background: 'white', padding: 'md' },
      },
      {
        blockType: 'faqBlock',
        title: 'Vragen? Check dit:',
        source: 'all',
        image: await media('/assets/uploads/20220625_181330_sez7vq34.jpg', 'Mountainbiken op de Brabantse Wal'),
        appearance: { background: 'dark', padding: 'md' },
      },
      {
        blockType: 'gallery',
        layout: 'scroll',
        images: await galleryImages(ctx),
        appearance: { background: 'dark', padding: 'md' },
      },
      {
        blockType: 'formBlock',
        form: forms.contact,
        title: home.contact.title,
        intro: await html(`<p>${home.contact.body}</p>`),
        appearance: { background: 'dark', padding: 'md' },
      },
    ],
    await media('/assets/uploads/mb-hero-2.jpg', 'Mellowbikers groepsfoto'),
  )

  /* ---------------------------------------------------------- agenda */
  const agendaSettings = await readJson<PageSettings>('page-settings/agenda.json')
  const agendaText = await readJson<{ introText: string; leadText: string }>('agenda-settings/settings.json')

  await create(
    'agenda',
    'Agenda',
    agendaSettings.seo,
    [
      {
        blockType: 'hero',
        variant: 'compact',
        image: await media(
          agendaSettings.hero.backgroundImage,
          'De Mellows op de Brabantse Wal',
          agendaSettings.hero.backgroundPosition,
        ),
        title: agendaSettings.hero.title,
        subtitle: agendaText.introText,
        overlay: true,
        showScrollHint: true,
        separatorColor: 'red',
      },
      {
        blockType: 'eventList',
        title: 'Agenda clubritten & weekenden',
        intro: agendaText.leadText,
        filter: 'all',
        limit: 0,
        appearance: { background: 'red', padding: 'lg', separatorTop: true },
      },
      {
        // Stond in de Astro-versie onderin de agendakaart. Hier een eigen
        // blok, zodat de oproep los van de agenda te verplaatsen is.
        blockType: 'ctaBanner',
        body: 'Nog geen zin om lid te worden? Benieuwd of wij wel bij jou passen? Je kunt gewoon een keer meerijden.',
        layout: 'center',
        buttons: [
          {
            link: {
              label: 'Ook meerijden? Word lid!',
              type: 'external',
              url: '/lid-worden',
              style: 'primary',
            },
          },
          {
            link: {
              label: 'Laat het ons even weten',
              type: 'external',
              url: '/#socials',
              style: 'ghost',
            },
          },
        ],
        appearance: { background: 'red', padding: 'md' },
      },
    ],
    await media(
      agendaSettings.footer?.backgroundImage,
      'Mellowbikers onderweg',
      (agendaSettings.footer as { backgroundPosition?: string })?.backgroundPosition,
    ),
  )

  /* -------------------------------------------------------- spotlight */
  const spotlightSettings = await readJson<PageSettings>('page-settings/spotlight.json')

  await create(
    'mellow-in-the-spotlight',
    'Mellow in the spotlight',
    spotlightSettings.seo,
    [
      {
        blockType: 'hero',
        variant: 'compact',
        image: await media(
          spotlightSettings.hero.backgroundImage,
          'Mellowbikers in het bos',
          spotlightSettings.hero.backgroundPosition,
        ),
        title: spotlightSettings.hero.title,
        overlay: true,
        showScrollHint: true,
        separatorColor: 'red',
      },
      {
        blockType: 'memberGrid',
        title: 'In the spotlight',
        intro: await html(
          '<p>Af en toe zetten we een van de Mellows in de spotlight. Zo leer je ze een klein beetje kennen (niet schrikken, het zijn net echte mensen)… Onthullend. Schokkend. Met epische verhalen, zoals altijd. 😎</p><p>Ook lid worden van onze toffe club? <a href="/lid-worden">Hier kan dat</a>.</p>',
        ),
        showIndex: true,
        appearance: { background: 'red', padding: 'md', separatorTop: true },
      },
    ],
    await media(spotlightSettings.footer?.backgroundImage, 'Mellowbikers groepsfoto'),
  )

  /* ---------------------------------------------------------- brewery */
  const brewery = await readJson<any>('brewery/content.json')

  await create(
    'mellow-brewery',
    'Mellow Brewery',
    brewery.seo,
    [
      {
        blockType: 'mediaBlock',
        kind: 'image',
        image: await media(brewery.headerImage, "Mellow Brewery — Let's Ride"),
        appearance: { background: 'dark', padding: 'lg' },
      },
      {
        blockType: 'richText',
        eyebrow: stripTags(brewery.title),
        content: await html(`${brewery.body}<p><em>${stripTags(brewery.partnerText)}</em></p>`),
        width: 'narrow',
        appearance: { background: 'dark', padding: 'md' },
      },
      {
        blockType: 'ctaBanner',
        layout: 'center',
        buttons: [
          { link: { label: 'Volg ons op Untappd', type: 'external', url: brewery.untappdLink, newTab: true, style: 'primary' } },
        ],
        appearance: { background: 'dark', padding: 'md' },
      },
    ],
  )

  /* ------------------------------------------------------- lid worden */
  const lidWorden = await readJson<PageSettings>('page-settings/lid-worden.json')

  await create(
    'lid-worden',
    'Lid worden',
    lidWorden.seo,
    [
      {
        blockType: 'hero',
        variant: 'compact',
        image: await media(lidWorden.hero.backgroundImage, 'Mellowbikers op pad', lidWorden.hero.backgroundPosition),
        title: lidWorden.hero.title,
        overlay: true,
        separatorColor: 'dark',
      },
      {
        blockType: 'formBlock',
        form: forms.membership,
        title: 'Meld je aan als lid',
        intro: await html(
          '<p>Vul het formulier in en we nemen contact met je op. Eerst een keer meerijden kan natuurlijk ook.</p>',
        ),
        privacyNote: await html(
          '<p>We gebruiken deze gegevens alleen voor het ledenbeheer van de vereniging. Lees hoe we daarmee omgaan in onze <a href="/privacy">privacyverklaring</a>.</p>',
        ),
        appearance: { background: 'dark', padding: 'lg' },
      },
    ],
    await media(lidWorden.footer?.backgroundImage, 'Mellowbikers onderweg'),
  )

  /* ---------------------------------------------------------- privacy */
  await create(
    'privacy',
    'Privacyverklaring',
    {
      title: 'Privacyverklaring',
      description: 'Hoe de Mellowbikers omgaan met je persoonsgegevens.',
    },
    [
      {
        blockType: 'hero',
        variant: 'compact',
        image: await media('/assets/uploads/mb-hero-2.jpg', 'Mellowbikers groepsfoto'),
        title: 'Privacyverklaring',
        overlay: true,
        separatorColor: 'dark',
      },
      {
        blockType: 'richText',
        content: await html(
          '<p><strong>Dit is een opzet — nog aanvullen en juridisch nalopen voor livegang.</strong></p>' +
            '<p>De Mellowbikers verwerken persoonsgegevens van leden en van mensen die contact met ons opnemen. Hieronder staat welke gegevens dat zijn, waarvoor we ze gebruiken en hoe lang we ze bewaren.</p>' +
            '<p><strong>Welke gegevens</strong><br />Bij een aanmelding als lid: naam, adres, postcode, woonplaats, geboortedatum, telefoonnummer, e-mailadres en de gegevens van een noodcontact. Bij een contactbericht: naam, e-mailadres en de inhoud van je bericht.</p>' +
            '<p><strong>Waarvoor</strong><br />Voor het ledenbeheer van de vereniging, voor de communicatie over ritten en activiteiten, en om je te kunnen bereiken bij een ongeval tijdens een clubrit.</p>' +
            '<p><strong>Hoe lang</strong><br />Zolang je lid bent, en daarna nog de termijn die we wettelijk verplicht zijn te bewaren.</p>' +
            '<p><strong>Je rechten</strong><br />Je kunt je gegevens opvragen, laten corrigeren of laten verwijderen. Stuur daarvoor een bericht naar info@mellowbikers.nl.</p>',
        ),
        width: 'narrow',
        appearance: { background: 'dark', padding: 'lg' },
      },
    ],
  )

  return made
}

const stripTags = (value: string): string =>
  value.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim()

async function galleryImages(ctx: Ctx): Promise<number[]> {
  const gallery = await ctx.readJson<{ images: { src: string; alt: string }[] }>('gallery/images.json')
  const ids: number[] = []
  for (const image of gallery.images) {
    const id = await ctx.media(image.src, image.alt)
    if (id) ids.push(id)
  }
  return ids
}
