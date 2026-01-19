globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>Kom ook naar dit unieke weekend vol toffe ritten, goed gezelschap, bier, BBQ, Belgische koffiekoeken en bizarre bingo. En dat alles op onze eigen camping – gewoon zoals een Mellow-weekend hoort te zijn.</p>";

				const frontmatter = {"date":"20-22 juni","title":"Mellowbikers BBB-weekend","completed":true,"order":7};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/07-bbb-weekend.md";
				const url = undefined;
				function rawContent() {
					return "\nKom ook naar dit unieke weekend vol toffe ritten, goed gezelschap, bier, BBQ, Belgische koffiekoeken en bizarre bingo. En dat alles op onze eigen camping – gewoon zoals een Mellow-weekend hoort te zijn.\n";
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
