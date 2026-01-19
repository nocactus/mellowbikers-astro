globalThis.process ??= {}; globalThis.process.env ??= {};
async function getMod() {
						return import('./01-oliebollenrit_CN5iiVB1.mjs');
					}
					const collectedLinks = [];
					const collectedStyles = [];
					const collectedScripts = [];
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };

export { defaultMod as default };
