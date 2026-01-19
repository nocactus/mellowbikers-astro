globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>We luiden het nieuwe jaar in met de beste ballen die je ooit hebt gehad van de beste bakker die we kennen.</p>";

				const frontmatter = {"date":"Zo 11 Januari","title":"Oliebollenrit 🍪","completed":true,"order":14};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/14-oliebollenrit-2026.md";
				const url = undefined;
				function rawContent() {
					return "\nWe luiden het nieuwe jaar in met de beste ballen die je ooit hebt gehad van de beste bakker die we kennen.\n";
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
