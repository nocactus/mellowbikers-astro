import { defineCollection, z } from 'astro:content';

// Collection voor agenda items (individuele markdown bestanden)
const agendaItemsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    completed: z.boolean(),
    order: z.number(), // Voor sortering
  }),
});

// Collection voor agenda settings (introText, leadText)
const agendaSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    introText: z.string(),
    leadText: z.string(),
  }),
});

// Homepage singleton (data/JSON)
const homepageCollection = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      backgroundImage: z.string(),
    }),
    lead: z.object({
      greeting: z.string(),
      title: z.string(),
      body: z.string(),
    }),
    nextRide: z.object({
      title: z.string(),
      body: z.string(),
      ctaText: z.string(),
      image: z.string(),
    }),
    values: z.array(z.object({
      title: z.string(),
      body: z.string(),
    })),
    beer: z.object({
      title: z.string(),
      body: z.string(),
      ctaText: z.string(),
      ctaLink: z.string(),
      image: z.string(),
    }),
    quote: z.object({
      text: z.string(),
      author: z.string(),
    }),
    contact: z.object({
      title: z.string(),
      body: z.string(),
    }),
    buttons: z.object({
      spotlightText: z.string(),
      spotlightLink: z.string(),
      contactText: z.string(),
      contactLink: z.string(),
      memberText: z.string(),
      memberLink: z.string(),
    }),
    video: z.object({
      src: z.string(),
      title: z.string(),
    }),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

// FAQ collection (meerdere JSON bestanden)
const faqCollection = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number(),
  }),
});

// Gallery singleton (data/JSON met array)
const galleryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })),
  }),
});

// Members collection (content/MD met frontmatter)
const membersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    memberId: z.string(),
    order: z.number(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })),
  }),
});

// Festival singleton (data/JSON)
const festivalCollection = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.number(),
    title: z.string(),
    dates: z.string(),
    location: z.string(),
    description: z.string(),
    tickets: z.array(z.object({
      emoji: z.string(),
      title: z.string(),
      price: z.string(),
      description: z.string(),
      link: z.string(),
    })),
    program: z.array(z.object({
      emoji: z.string(),
      text: z.string(),
    })),
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      body: z.string(),
    })),
    sponsors: z.array(z.object({
      name: z.string(),
      logo: z.string(),
      link: z.string(),
    })),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

// Brewery singleton (data/JSON)
const breweryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    headerImage: z.string(),
    body: z.string(),
    partnerText: z.string(),
    untappdLink: z.string(),
    untappdImage: z.string(),
    socialLinks: z.array(z.object({
      label: z.string(),
      url: z.string(),
      icon: z.string(),
    })),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

// Page settings (data/JSON, per pagina)
const pageSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.object({
      title: z.string(),
      backgroundImage: z.string(),
      backgroundPosition: z.string().optional(),
    }).optional(),
    footer: z.object({
      backgroundImage: z.string(),
      backgroundPosition: z.string().optional(),
      separatorColor: z.string().optional(),
    }).optional(),
  }),
});

// Navigation singleton (data/JSON)
const navigationCollection = defineCollection({
  type: 'data',
  schema: z.object({
    header: z.array(z.object({
      label: z.string(),
      href: z.string(),
      isButton: z.boolean().optional(),
    })),
    footer: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
    socials: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })),
  }),
});

export const collections = {
  'agenda-items': agendaItemsCollection,
  'agenda-settings': agendaSettingsCollection,
  'homepage': homepageCollection,
  'faq': faqCollection,
  'gallery': galleryCollection,
  'members': membersCollection,
  'festival': festivalCollection,
  'brewery': breweryCollection,
  'page-settings': pageSettingsCollection,
  'navigation': navigationCollection,
};
