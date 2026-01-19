globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>De legendarische jaarlijks respect-ride voor onze oud-penningmeester. Baarden verplicht natuurlijk. Start 9 uur bij Bozlust. Of als Pascal wakker is. Aansluitend bier en bitterballen.</p>";

				const frontmatter = {"date":"Zo 16 maart","title":"Pascal Classic","completed":true,"order":3};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/03-pascal-classic.md";
				const url = undefined;
				function rawContent() {
					return "\nDe legendarische jaarlijks respect-ride voor onze oud-penningmeester. Baarden verplicht natuurlijk. Start 9 uur bij Bozlust. Of als Pascal wakker is. Aansluitend bier en bitterballen.\n";
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
