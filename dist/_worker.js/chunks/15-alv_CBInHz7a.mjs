globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Onze jaarlijkse ledenvergadering, ergens in een kroeg in Bergen op Zoom…</p>";

				const frontmatter = {"date":"Wo 14 Januari","title":"ALV","completed":true,"order":15};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/15-alv.md";
				const url = undefined;
				function rawContent() {
					return "\nOnze jaarlijkse ledenvergadering, ergens in een kroeg in Bergen op Zoom...\n";
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
