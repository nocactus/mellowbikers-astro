globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>In het wiel van Martijn F. Over de mooiste routes van de Brabantse Wal. Aansluitend iets eten en drinken…?</p>";

				const frontmatter = {"date":"Zo 9 februari","title":"Rondje Leeuw van Vlaanderen","completed":true,"order":2};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/02-rondje-leeuw-vlaanderen.md";
				const url = undefined;
				function rawContent() {
					return "\nIn het wiel van Martijn F. Over de mooiste routes van de Brabantse Wal. Aansluitend iets eten en drinken...?\n";
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
