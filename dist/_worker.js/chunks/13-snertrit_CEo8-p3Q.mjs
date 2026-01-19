globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>De jaarlijkse traditie: start bij Hoeve Hildernisse, alle Fellows mogen mee dus spreek een Mellow aan als je erbij wil zijn! En na afloop natuurlijk huisgemaakte snert en een lekker biertje.</p>";

				const frontmatter = {"date":"Zo 14 December","title":"Snertrit met Fellows 👋","completed":false,"order":13};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/13-snertrit.md";
				const url = undefined;
				function rawContent() {
					return "\nDe jaarlijkse traditie: start bij Hoeve Hildernisse, alle Fellows mogen mee dus spreek een Mellow aan als je erbij wil zijn! En na afloop natuurlijk huisgemaakte snert en een lekker biertje.\n";
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
