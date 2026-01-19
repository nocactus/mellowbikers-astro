globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Het zomerseizoen is zo’n beetje voorbij, dus geen ijscoupe met aardbijen deze rit. Wel een andere zoete verrassing. Vertrek 9.00 uur bij Caravanpark Staartse Duinen, Putsebaan 30 te Huijbergen!</p>";

				const frontmatter = {"date":"Zo 21 September","title":"Sweet Surprise Ride 🍭","completed":true,"order":10};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/10-sweet-surprise-ride.md";
				const url = undefined;
				function rawContent() {
					return "\nHet zomerseizoen is zo'n beetje voorbij, dus geen ijscoupe met aardbijen deze rit. Wel een andere zoete verrassing. Vertrek 9.00 uur bij Caravanpark Staartse Duinen, Putsebaan 30 te Huijbergen!\n";
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
