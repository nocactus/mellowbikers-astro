globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>We regelen voor onze zuiderburen het jaarlijkse Singlespeed-feestje: no gears = more fun! Natuurlijk in onze favoriete kampeerboerderij De Rommeshoef bij Essen. Meer info volgt!</p>";

				const frontmatter = {"date":"25-27 September 2026","title":"BKSS 🇧🇪","completed":false,"order":17};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/17-bkss.md";
				const url = undefined;
				function rawContent() {
					return "\nWe regelen voor onze zuiderburen het jaarlijkse Singlespeed-feestje: no gears = more fun! Natuurlijk in onze favoriete kampeerboerderij De Rommeshoef bij Essen. Meer info volgt!\n";
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
