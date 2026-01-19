globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>We gaan op grote hoogte langs alle torens van Bergen op Zoom. Dat wil je echt niet missen: hoogtemeters maken zonder fiets!</p>";

				const frontmatter = {"date":"Zo 16 November","title":"Bergse Torenrit 🗼","completed":true,"order":12};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/12-bergse-torenrit.md";
				const url = undefined;
				function rawContent() {
					return "\nWe gaan op grote hoogte langs alle torens van Bergen op Zoom. Dat wil je echt niet missen: hoogtemeters maken zonder fiets!\n";
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
