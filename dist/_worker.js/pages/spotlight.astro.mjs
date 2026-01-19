globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_D4FOeVpd.mjs';
import { $ as $$Default } from '../chunks/Default_BGQDnuE6.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D6SDLvoV.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://astro.mellowbikers.nl");
const $$Spotlight = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Spotlight;
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({}), () => "../content/spotlight/*.md");
  return renderTemplate`${renderComponent($$result, "Default", $$Default, { "title": "Spotlight | Mellowbikers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container py-10"> <h1 class="text-3xl font-extrabold mb-6">Spotlight</h1> <div class="grid md:grid-cols-2 gap-6"> ${posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)).map(({ url, frontmatter }) => renderTemplate`<a${addAttribute(url, "href")} class="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"> ${frontmatter.image && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": frontmatter.image, "alt": frontmatter.title, "widths": [480, 768, 1024], "formats": ["avif", "webp", "jpeg"], "class": "w-full h-44 object-cover", "loading": "lazy", "decoding": "async" })}`} <div class="p-4 bg-white dark:bg-slate-800"> <h2 class="text-xl font-bold mb-1 text-slate-900 dark:text-slate-50">${frontmatter.title}</h2> ${frontmatter.teaser && renderTemplate`<p class="text-sm mb-2 text-slate-600 dark:text-slate-300">${frontmatter.teaser}</p>`} <small class="text-slate-400">${new Date(frontmatter.date).toLocaleDateString("nl-NL")}</small> </div> </a>`)} </div> </section> ` })}`;
}, "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/spotlight.astro", void 0);

const $$file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/spotlight.astro";
const $$url = "/spotlight";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Spotlight,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
