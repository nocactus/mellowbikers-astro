globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Samen op pad, tent, camper, caravan mee, kampvuurtje, bbq, biertje…en de mooiste trails in Luxemburg. Wie gaat er mee? ✋</p>";

				const frontmatter = {"date":"12-14 juni 2026","title":"Mellow Weekend","completed":false,"order":16};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/16-mellow-weekend-luxemburg.md";
				const url = undefined;
				function rawContent() {
					return "\nSamen op pad, tent, camper, caravan mee, kampvuurtje, bbq, biertje...en de mooiste trails in Luxemburg. Wie gaat er mee? ✋\n";
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
