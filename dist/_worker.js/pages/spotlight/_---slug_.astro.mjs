globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, b as renderSlot } from '../../chunks/astro/server_D4FOeVpd.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_D6SDLvoV.mjs';
import { $ as $$Default } from '../../chunks/Default_D9SsUnqT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://astro.mellowbikers.nl");
const $$SpotlightItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SpotlightItem;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Default", $$Default, { "title": `${frontmatter.title} | Mellowbikers` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative flex items-center justify-center text-center text-white h-[40vh] bg-slate-900 overflow-hidden"> ${frontmatter.image && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": frontmatter.image, "alt": frontmatter.title, "widths": [480, 768, 1024, 1440, 1920], "formats": ["avif", "webp", "jpeg"], "class": "absolute inset-0 w-full h-full object-cover brightness-75", "loading": "eager", "decoding": "async" })}`} <div class="relative z-10 max-w-3xl px-6"> <h1 class="text-4xl md:text-5xl font-extrabold drop-shadow">${frontmatter.title}</h1> ${frontmatter.teaser && renderTemplate`<p class="mt-3 text-lg drop-shadow">${frontmatter.teaser}</p>`} </div> </section> <main class="container py-10"> <article class="prose prose-slate dark:prose-invert max-w-none"> ${renderSlot($$result2, $$slots["default"])} </article> </main> ` })}`;
}, "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/layouts/SpotlightItem.astro", void 0);

const $$Astro = createAstro("https://astro.mellowbikers.nl");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const md = await Astro2.glob(/* #__PURE__ */ Object.assign({}), () => "../../content/spotlight/*.md");
  const current = md.find((p) => p.url === Astro2.url.pathname);
  return renderTemplate`${renderComponent($$result, "SpotlightItem", $$SpotlightItem, { "frontmatter": current.frontmatter }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "current.Content", current.Content, {})} ` })}`;
}, "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/spotlight/[...slug].astro", void 0);

const $$file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/spotlight/[...slug].astro";
const $$url = "/spotlight/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
