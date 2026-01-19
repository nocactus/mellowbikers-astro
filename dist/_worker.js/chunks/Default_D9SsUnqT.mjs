globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderTemplate, b as renderSlot, d as renderHead, e as addAttribute } from './astro/server_D4FOeVpd.mjs';
/* empty css                          */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://astro.mellowbikers.nl");
const $$Default = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Default;
  const { title = "Mellowbikers", description = "D\xE9 mountainbike vereniging van de Brabantse Wal" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="nl"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description"', '><link rel="icon" href="/assets/favicon-32x32-1.png"><link rel="icon" href="/assets/favicon-32x32-1.png" sizes="32x32"><link rel="icon" href="/assets/favicon-32x32-1.png" sizes="192x192"><link rel="apple-touch-icon" href="/assets/favicon-32x32-1.png"><meta name="msapplication-TileImage" content="/assets/favicon-32x32-1.png"><title>', '</title><link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/InterVariable-Italic.woff2" as="font" type="font/woff2" crossorigin><!-- Cloudflare Turnstile --><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>', '</head> <body class="text-slate-100 bg-mellow-dark"> <!-- HEADER --> <header id="site-header" class="fixed top-0 left-0 right-0 z-40 transition-transform duration-300 pt-2"> <div id="header-bg" class="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 pointer-events-none z-0"></div> <div class="container flex items-center gap-8 py-6 relative z-10"> <a href="/" class="flex items-center gap-4"> <img src="/assets/mellowbikers-logo-2023.svg" alt="Mellowbikers" class="h-20 w-auto"> <span class="sr-only">Mellowbikers</span> </a> <nav class="ml-auto flex items-center gap-8 text-base font-medium"> <a href="/" class="hover:text-mellow-red text-shadow transition-colors">Home</a> <a href="/agenda" class="hover:text-mellow-red transition-colors">Agenda</a> <a href="/mellow-in-the-spotlight" class="hover:text-mellow-red transition-colors">Spotlight</a> <a href="/mellow-brewery" class="hover:text-mellow-red transition-colors">Bier</a> <a href="/lid-worden" class="btn !py-2 !px-5 !text-base text-mellow-dark bg-mellow-groen hover:drop-shadow-lg transition-colors">\nLid worden\n</a> </nav> </div> </header> <!-- MAIN CONTENT WRAPPER: bg pas NA hero --> <main class="bg-transparent"> ', " </main>  </body> </html>"])), addAttribute(description, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/layouts/Default.astro", void 0);

export { $$Default as $ };
