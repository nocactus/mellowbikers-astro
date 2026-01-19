globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { createExports } from './_@astrojs-ssr-adapter.mjs';
import { manifest } from './manifest_BjSvos--.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/agenda.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/api/lid-worden.astro.mjs');
const _page4 = () => import('./pages/dankje.astro.mjs');
const _page5 = () => import('./pages/festival.astro.mjs');
const _page6 = () => import('./pages/lid-worden.astro.mjs');
const _page7 = () => import('./pages/mellow-brewery.astro.mjs');
const _page8 = () => import('./pages/mellow-in-the-spotlight.astro.mjs');
const _page9 = () => import('./pages/spotlight.astro.mjs');
const _page10 = () => import('./pages/spotlight/_---slug_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/agenda.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/api/lid-worden.ts", _page3],
    ["src/pages/dankje.astro", _page4],
    ["src/pages/festival.astro", _page5],
    ["src/pages/lid-worden.astro", _page6],
    ["src/pages/mellow-brewery.astro", _page7],
    ["src/pages/mellow-in-the-spotlight.astro", _page8],
    ["src/pages/spotlight.astro", _page9],
    ["src/pages/spotlight/[...slug].astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
