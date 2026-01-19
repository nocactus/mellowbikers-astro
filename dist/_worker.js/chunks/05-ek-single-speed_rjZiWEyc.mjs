globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>EK Singlespeed in Luik. Voor de echte Single Speed liefhebbers. En voor campinggangers die van een feestje houden. 🍻</p>";

				const frontmatter = {"date":"1-4 mei","title":"EK Single Speed","completed":true,"order":5};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/05-ek-single-speed.md";
				const url = undefined;
				function rawContent() {
					return "\nEK Singlespeed in Luik. Voor de echte Single Speed liefhebbers. En voor campinggangers die van een feestje houden. 🍻\n";
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
