globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4FOeVpd.mjs';
import { $ as $$Default } from '../chunks/Default_D9SsUnqT.mjs';
export { renderers } from '../renderers.mjs';

const $$Dankje = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Default", $$Default, { "title": "Dank je wel | Mellowbikers" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container py-10"><div class="card"><h1 class="text-2xl font-bold mb-2">Dank je wel!</h1><p>We hebben je bericht ontvangen. We nemen zo snel mogelijk contact met je op.</p></div></section> ` })}`;
}, "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/dankje.astro", void 0);

const $$file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/dankje.astro";
const $$url = "/dankje";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dankje,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
