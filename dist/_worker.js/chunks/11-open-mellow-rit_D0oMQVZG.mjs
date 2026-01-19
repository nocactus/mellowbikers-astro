globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Dit is je kans: geen inschrijving, gewoon op komen dagen met je mountainbike en helm en aansluiten! No worries, nieuwe vrienden maken, lekker biken!</p>";

				const frontmatter = {"date":"Zo 19 Oktober","title":"Open Mellow Rit 🙌","completed":true,"order":11};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/11-open-mellow-rit.md";
				const url = undefined;
				function rawContent() {
					return "\nDit is je kans: geen inschrijving, gewoon op komen dagen met je mountainbike en helm en aansluiten! No worries, nieuwe vrienden maken, lekker biken!\n";
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
