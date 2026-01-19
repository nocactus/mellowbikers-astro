globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Hacklberg, Panorama, Milka, X-Line, Bergstadl. Epische trails in Saalbach: lift omhoog, zwaartekracht naarbeneden. Knallen!</p>";

				const frontmatter = {"date":"1e week September","title":"Enduro Weekend Saalbach 🇦🇹","completed":true,"order":9};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/09-enduro-saalbach.md";
				const url = undefined;
				function rawContent() {
					return "\nHacklberg, Panorama, Milka, X-Line, Bergstadl. Epische trails in Saalbach: lift omhoog, zwaartekracht naarbeneden. Knallen!\n";
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
