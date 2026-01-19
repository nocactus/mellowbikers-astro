globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Vette trails? Vette worsten! Rustiek rondje door de bossen met een worst en koffie stop ergens in het woud. 😎🌲</p>";

				const frontmatter = {"date":"Zo 18 mei","title":"Knakworstenrit 🌭","completed":true,"order":6};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/06-knakworstenrit.md";
				const url = undefined;
				function rawContent() {
					return "\nVette trails? Vette worsten! Rustiek rondje door de bossen met een worst en koffie stop ergens in het woud. 😎🌲\n";
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
