globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Rondje Zeeland met Mr. en Mrs. V. Grote kans op bolussen en bier 🤘</p>";

				const frontmatter = {"date":"13 april","title":"Westenschouwen en meer","completed":true,"order":4};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/04-westenschouwen.md";
				const url = undefined;
				function rawContent() {
					return "\nRondje Zeeland met Mr. en Mrs. V. Grote kans op bolussen en bier 🤘\n";
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
