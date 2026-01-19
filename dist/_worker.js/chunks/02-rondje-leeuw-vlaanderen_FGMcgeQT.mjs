globalThis.process ??= {}; globalThis.process.env ??= {};
async function getMod() {
						return import('./02-rondje-leeuw-vlaanderen_DYREOZN-.mjs');
					}
					const collectedLinks = [];
					const collectedStyles = [];
					const collectedScripts = [];
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };

export { defaultMod as default };
