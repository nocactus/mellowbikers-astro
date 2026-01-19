globalThis.process ??= {}; globalThis.process.env ??= {};
async function getMod() {
						return import('./09-enduro-saalbach_BSDyaoJB.mjs');
					}
					const collectedLinks = [];
					const collectedStyles = [];
					const collectedScripts = [];
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };

export { defaultMod as default };
