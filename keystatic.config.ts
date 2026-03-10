import { config, fields, collection, singleton } from '@keystatic/core';

// Herbruikbaar schema voor pagina-instellingen
const pageSettingsSchema = {
  seo: fields.object({
    title: fields.text({ label: 'SEO Titel' }),
    description: fields.text({ label: 'SEO Beschrijving', multiline: true }),
  }, { label: 'SEO' }),
  hero: fields.object({
    title: fields.text({ label: 'Hero titel' }),
    backgroundImage: fields.text({ label: 'Achtergrondafbeelding (pad)' }),
    backgroundPosition: fields.text({ label: 'Achtergrond positie', defaultValue: '50% 50%' }),
  }, { label: 'Hero sectie' }),
  footer: fields.object({
    backgroundImage: fields.text({ label: 'Achtergrondafbeelding (pad)' }),
    backgroundPosition: fields.text({ label: 'Achtergrond positie', defaultValue: '50% 50%' }),
    separatorColor: fields.text({ label: 'Separator kleur', defaultValue: '' }),
  }, { label: 'Footer' }),
};

export default config({
  // Alleen lokaal gebruikt — content bewerken via `npm run dev`, dan committen & pushen
  storage: { kind: 'local' },

  singletons: {
    // Homepage content
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage/content',
      format: { data: 'json' },
      schema: {
        hero: fields.object({
          title: fields.text({ label: 'Titel', multiline: true }),
          subtitle: fields.text({ label: 'Subtitel' }),
          backgroundImage: fields.text({ label: 'Achtergrondafbeelding (pad)' }),
        }, { label: 'Hero sectie' }),
        lead: fields.object({
          greeting: fields.text({ label: 'Begroeting' }),
          title: fields.text({ label: 'Titel' }),
          body: fields.text({ label: 'Tekst', multiline: true }),
        }, { label: 'Lead sectie' }),
        nextRide: fields.object({
          title: fields.text({ label: 'Titel' }),
          body: fields.text({ label: 'Tekst', multiline: true }),
          ctaText: fields.text({ label: 'CTA tekst' }),
          image: fields.text({ label: 'Afbeelding (pad)' }),
        }, { label: 'Volgende rit' }),
        values: fields.array(
          fields.object({
            title: fields.text({ label: 'Titel' }),
            body: fields.text({ label: 'Tekst', multiline: true }),
          }),
          {
            label: 'Waarden',
            itemLabel: (props) => props.fields.title.value || 'Nieuwe waarde',
          }
        ),
        beer: fields.object({
          title: fields.text({ label: 'Titel' }),
          body: fields.text({ label: 'Tekst', multiline: true }),
          ctaText: fields.text({ label: 'CTA tekst' }),
          ctaLink: fields.text({ label: 'CTA link' }),
          image: fields.text({ label: 'Afbeelding (pad)' }),
        }, { label: 'Bier sectie' }),
        quote: fields.object({
          text: fields.text({ label: 'Quote tekst', multiline: true }),
          author: fields.text({ label: 'Auteur' }),
        }, { label: 'Quote' }),
        contact: fields.object({
          title: fields.text({ label: 'Titel' }),
          body: fields.text({ label: 'Tekst', multiline: true }),
        }, { label: 'Contact sectie' }),
        buttons: fields.object({
          spotlightText: fields.text({ label: 'Spotlight knop tekst' }),
          spotlightLink: fields.text({ label: 'Spotlight knop link' }),
          contactText: fields.text({ label: 'Contact knop tekst' }),
          contactLink: fields.text({ label: 'Contact knop link' }),
          memberText: fields.text({ label: 'Lid worden knop tekst' }),
          memberLink: fields.text({ label: 'Lid worden knop link' }),
        }, { label: 'Knoppen' }),
        video: fields.object({
          src: fields.text({ label: 'Video URL' }),
          title: fields.text({ label: 'Video titel' }),
        }, { label: 'Video' }),
        seo: fields.object({
          title: fields.text({ label: 'SEO Titel' }),
          description: fields.text({ label: 'SEO Beschrijving', multiline: true }),
        }, { label: 'SEO' }),
      },
    }),

    // Navigation
    navigation: singleton({
      label: 'Navigatie',
      path: 'src/content/navigation/main',
      format: { data: 'json' },
      schema: {
        header: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link' }),
            isButton: fields.checkbox({ label: 'Als knop tonen', defaultValue: false }),
          }),
          {
            label: 'Header navigatie',
            itemLabel: (props) => props.fields.label.value || 'Nieuw item',
          }
        ),
        footer: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link' }),
          }),
          {
            label: 'Footer navigatie',
            itemLabel: (props) => props.fields.label.value || 'Nieuw item',
          }
        ),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Platform' }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Social media',
            itemLabel: (props) => props.fields.label.value || 'Nieuw platform',
          }
        ),
      },
    }),

    // Gallery
    gallery: singleton({
      label: 'Galerij',
      path: 'src/content/gallery/images',
      format: { data: 'json' },
      schema: {
        images: fields.array(
          fields.object({
            src: fields.text({ label: 'Afbeelding pad' }),
            alt: fields.text({ label: 'Alt tekst' }),
          }),
          {
            label: 'Afbeeldingen',
            itemLabel: (props) => props.fields.alt.value || 'Nieuwe afbeelding',
          }
        ),
      },
    }),

    // Agenda settings
    agendaSettings: singleton({
      label: 'Agenda instellingen',
      path: 'src/content/agenda-settings/settings',
      format: { data: 'json' },
      schema: {
        introText: fields.text({ label: 'Intro tekst', multiline: true }),
        leadText: fields.text({ label: 'Lead tekst', multiline: true }),
      },
    }),

    // Brewery
    brewery: singleton({
      label: 'Mellow Brewery',
      path: 'src/content/brewery/content',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titel' }),
        headerImage: fields.text({ label: 'Header afbeelding (pad)' }),
        body: fields.text({ label: 'Tekst (HTML)', multiline: true }),
        partnerText: fields.text({ label: 'Partner tekst (HTML)', multiline: true }),
        untappdLink: fields.url({ label: 'Untappd link' }),
        untappdImage: fields.text({ label: 'Untappd afbeelding (pad)' }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
            icon: fields.select({
              label: 'Icoon',
              options: [
                { label: 'Globe', value: 'globe' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
              ],
              defaultValue: 'globe',
            }),
          }),
          {
            label: 'Social links',
            itemLabel: (props) => props.fields.label.value || 'Nieuwe link',
          }
        ),
        seo: fields.object({
          title: fields.text({ label: 'SEO Titel' }),
          description: fields.text({ label: 'SEO Beschrijving', multiline: true }),
        }, { label: 'SEO' }),
      },
    }),

    // Page settings - Spotlight
    spotlightSettings: singleton({
      label: 'Pagina: Spotlight',
      path: 'src/content/page-settings/spotlight',
      format: { data: 'json' },
      schema: { ...pageSettingsSchema },
    }),

    // Page settings - Agenda
    agendaPageSettings: singleton({
      label: 'Pagina: Agenda',
      path: 'src/content/page-settings/agenda',
      format: { data: 'json' },
      schema: { ...pageSettingsSchema },
    }),

    // Page settings - Lid worden
    lidWordenSettings: singleton({
      label: 'Pagina: Lid worden',
      path: 'src/content/page-settings/lid-worden',
      format: { data: 'json' },
      schema: { ...pageSettingsSchema },
    }),

    // Festival
    festival: singleton({
      label: 'Festival',
      path: 'src/content/festival/festival-2025',
      format: { data: 'json' },
      schema: {
        year: fields.integer({ label: 'Jaar' }),
        title: fields.text({ label: 'Titel' }),
        dates: fields.text({ label: 'Data' }),
        location: fields.text({ label: 'Locatie' }),
        description: fields.text({ label: 'Beschrijving', multiline: true }),
        tickets: fields.array(
          fields.object({
            emoji: fields.text({ label: 'Emoji' }),
            title: fields.text({ label: 'Titel' }),
            price: fields.text({ label: 'Prijs' }),
            description: fields.text({ label: 'Beschrijving' }),
            link: fields.url({ label: 'Ticket link' }),
          }),
          {
            label: 'Tickets',
            itemLabel: (props) => props.fields.title.value || 'Nieuw ticket',
          }
        ),
        program: fields.array(
          fields.object({
            emoji: fields.text({ label: 'Emoji' }),
            text: fields.text({ label: 'Programma item' }),
          }),
          {
            label: 'Programma',
            itemLabel: (props) => props.fields.text.value || 'Nieuw item',
          }
        ),
        sections: fields.array(
          fields.object({
            id: fields.text({ label: 'ID (voor anker link)' }),
            title: fields.text({ label: 'Titel' }),
            body: fields.text({ label: 'Tekst (HTML)', multiline: true }),
          }),
          {
            label: 'Secties',
            itemLabel: (props) => props.fields.title.value || 'Nieuwe sectie',
          }
        ),
        sponsors: fields.array(
          fields.object({
            name: fields.text({ label: 'Naam' }),
            logo: fields.text({ label: 'Logo (pad)' }),
            link: fields.url({ label: 'Website' }),
          }),
          {
            label: 'Sponsors',
            itemLabel: (props) => props.fields.name.value || 'Nieuwe sponsor',
          }
        ),
        seo: fields.object({
          title: fields.text({ label: 'SEO Titel' }),
          description: fields.text({ label: 'SEO Beschrijving', multiline: true }),
        }, { label: 'SEO' }),
      },
    }),
  },

  collections: {
    // FAQ items
    faq: collection({
      label: 'FAQ',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      slugField: 'question',
      schema: {
        question: fields.text({ label: 'Vraag' }),
        answer: fields.text({ label: 'Antwoord (HTML)', multiline: true }),
        order: fields.integer({ label: 'Volgorde' }),
      },
    }),

    // Members (spotlight)
    members: collection({
      label: 'Leden (Spotlight)',
      path: 'src/content/members/*',
      format: { contentField: 'bio' },
      slugField: 'name',
      schema: {
        name: fields.text({ label: 'Naam' }),
        memberId: fields.text({ label: 'Member ID (voor anker link)' }),
        order: fields.integer({ label: 'Volgorde' }),
        images: fields.array(
          fields.object({
            src: fields.text({ label: 'Afbeelding pad' }),
            alt: fields.text({ label: 'Alt tekst' }),
          }),
          {
            label: 'Foto\'s',
            itemLabel: (props) => props.fields.alt.value || 'Nieuwe foto',
          }
        ),
        bio: fields.document({ label: 'Biografie', formatting: true, links: true }),
      },
    }),

    // Agenda items
    agendaItems: collection({
      label: 'Agenda items',
      path: 'src/content/agenda-items/*',
      format: { contentField: 'description' },
      slugField: 'title',
      schema: {
        date: fields.text({ label: 'Datum' }),
        title: fields.text({ label: 'Titel' }),
        completed: fields.checkbox({ label: 'Afgerond', defaultValue: false }),
        order: fields.integer({ label: 'Volgorde' }),
        description: fields.document({ label: 'Beschrijving', formatting: true, links: true }),
      },
    }),
  },
});
