globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_D4FOeVpd.mjs';

const html = "<p>We beginnen het jaar met een rustig ritje de overtollige Kerstkilo’s eraf fietsen om daarna het calorieëntekort weer aanvullen met superverse oliebollen. Ook dit jaar weer met veel liefde gebakken door de vrouw van de secretaris. En er zijn bubbels!</p>";

				const frontmatter = {"date":"Zo 5 januari","title":"Oliebollenrit","completed":true,"order":1};
				const file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/content/agenda-items/01-oliebollenrit.md";
				const url = undefined;
				function rawContent() {
					return "\nWe beginnen het jaar met een rustig ritje de overtollige Kerstkilo's eraf fietsen om daarna het calorieëntekort weer aanvullen met superverse oliebollen. Ook dit jaar weer met veel liefde gebakken door de vrouw van de secretaris. En er zijn bubbels!\n";
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
