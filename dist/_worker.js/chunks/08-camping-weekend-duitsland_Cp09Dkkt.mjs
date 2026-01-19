globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Mellow-Wochenende im Osten. Mit coolen Trails, Schnitzel und natürlich Weizen…jawolh, we bezoeken onze oosterburen. Viel Spaß und Prost!</p>";

				const frontmatter = {"date":"22-24 augustus","title":"Mellow Camping Weekend 🇩🇪","completed":true,"order":8};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/08-camping-weekend-duitsland.md";
				const url = undefined;
				function rawContent() {
					return "\nMellow-Wochenende im Osten. Mit coolen Trails, Schnitzel und natürlich Weizen...jawolh, we bezoeken onze oosterburen. Viel Spaß und Prost!\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
