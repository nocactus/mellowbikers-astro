globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, k as renderUniqueStylesheet, l as renderScriptElement, n as createHeadAndContent, f as renderComponent, r as renderTemplate, u as unescapeHTML, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_D4FOeVpd.mjs';
import { $ as $$Default } from '../chunks/Default_BGQDnuE6.mjs';
import { r as removeBase, i as isCoreRemotePath, V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError, p as prependForwardSlash } from '../chunks/astro/assets-service_B3iZ_nSy.mjs';
import { u as unflatten } from '../chunks/parse_DZl06muL.mjs';
export { renderers } from '../renderers.mjs';

var e=e=>Object.prototype.toString.call(e),t=e=>ArrayBuffer.isView(e)&&!(e instanceof DataView),o=t=>"[object Date]"===e(t),n=t=>"[object RegExp]"===e(t),r=t=>"[object Error]"===e(t),s=t=>"[object Boolean]"===e(t),l=t=>"[object Number]"===e(t),i=t=>"[object String]"===e(t),c=Array.isArray,u=Object.getOwnPropertyDescriptor,a=Object.prototype.propertyIsEnumerable,f=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,h=Object.keys;function d(e){const t=h(e),o=f(e);for(let n=0;n<o.length;n++)a.call(e,o[n])&&t.push(o[n]);return t}function b(e,t){return !u(e,t)?.writable}function y(e,u){if("object"==typeof e&&null!==e){let a;if(c(e))a=[];else if(o(e))a=new Date(e.getTime?e.getTime():e);else if(n(e))a=new RegExp(e);else if(r(e))a={message:e.message};else if(s(e)||l(e)||i(e))a=Object(e);else {if(t(e))return e.slice();a=Object.create(Object.getPrototypeOf(e));}const f=u.includeSymbols?d:h;for(const t of f(e))a[t]=e[t];return a}return e}var g={includeSymbols:false,immutable:false};function m(e,t,o=g){const n=[],r=[];let s=true;const l=o.includeSymbols?d:h,i=!!o.immutable;return function e(u){const a=i?y(u,o):u,f={};let h=true;const d={node:a,node_:u,path:[].concat(n),parent:r[r.length-1],parents:r,key:n[n.length-1],isRoot:0===n.length,level:n.length,circular:void 0,isLeaf:false,notLeaf:true,notRoot:true,isFirst:false,isLast:false,update:function(e,t=false){d.isRoot||(d.parent.node[d.key]=e),d.node=e,t&&(h=false);},delete:function(e){delete d.parent.node[d.key],e&&(h=false);},remove:function(e){c(d.parent.node)?d.parent.node.splice(d.key,1):delete d.parent.node[d.key],e&&(h=false);},keys:null,before:function(e){f.before=e;},after:function(e){f.after=e;},pre:function(e){f.pre=e;},post:function(e){f.post=e;},stop:function(){s=false;},block:function(){h=false;}};if(!s)return d;function g(){if("object"==typeof d.node&&null!==d.node){d.keys&&d.node_===d.node||(d.keys=l(d.node)),d.isLeaf=0===d.keys.length;for(let e=0;e<r.length;e++)if(r[e].node_===u){d.circular=r[e];break}}else d.isLeaf=true,d.keys=null;d.notLeaf=!d.isLeaf,d.notRoot=!d.isRoot;}g();const m=t(d,d.node);if(void 0!==m&&d.update&&d.update(m),f.before&&f.before(d,d.node),!h)return d;if("object"==typeof d.node&&null!==d.node&&!d.circular){r.push(d),g();for(const[t,o]of Object.entries(d.keys??[])){n.push(o),f.pre&&f.pre(d,d.node[o],o);const r=e(d.node[o]);i&&p.call(d.node,o)&&!b(d.node,o)&&(d.node[o]=r.node),r.isLast=!!d.keys?.length&&+t==d.keys.length-1,r.isFirst=0==+t,f.post&&f.post(d,r),n.pop();}r.pop();}return f.after&&f.after(d,d.node),d}(e).node}var j=class{#e;#t;constructor(e,t=g){this.#e=e,this.#t=t;}get(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return;t=t[n];}return t}has(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return  false;t=t[n];}return  true}set(e,t){let o=this.#e,n=0;for(n=0;n<e.length-1;n++){const t=e[n];p.call(o,t)||(o[t]={}),o=o[t];}return o[e[n]]=t,t}map(e){return m(this.#e,e,{immutable:true,includeSymbols:!!this.#t.includeSymbols})}forEach(e){return this.#e=m(this.#e,e,this.#t),this.#e}reduce(e,t){const o=1===arguments.length;let n=o?this.#e:t;return this.forEach(((t,r)=>{t.isRoot&&o||(n=e(t,n,r));})),n}paths(){const e=[];return this.forEach((t=>{e.push(t.path);})),e}nodes(){const e=[];return this.forEach((t=>{e.push(t.node);})),e}clone(){const e=[],o=[],n=this.#t;return t(this.#e)?this.#e.slice():function t(r){for(let t=0;t<e.length;t++)if(e[t]===r)return o[t];if("object"==typeof r&&null!==r){const s=y(r,n);e.push(r),o.push(s);const l=n.includeSymbols?d:h;for(const e of l(r))s[e]=t(r[e]);return e.pop(),o.pop(),s}return r}(this.#e)}};

/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node {
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

class Queue {
	#head;
	#tail;
	#size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
		if (!current) {
			return;
		}

		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	peek() {
		if (!this.#head) {
			return;
		}

		return this.#head.value;

		// TODO: Node.js 18.
		// return this.#head?.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}

	* drain() {
		while (this.#head) {
			yield this.dequeue();
		}
	}
}

function pLimit(concurrency) {
	validateConcurrency(concurrency);

	const queue = new Queue();
	let activeCount = 0;

	const resumeNext = () => {
		if (activeCount < concurrency && queue.size > 0) {
			queue.dequeue()();
			// Since `pendingCount` has been decreased by one, increase `activeCount` by one.
			activeCount++;
		}
	};

	const next = () => {
		activeCount--;

		resumeNext();
	};

	const run = async (function_, resolve, arguments_) => {
		const result = (async () => function_(...arguments_))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (function_, resolve, arguments_) => {
		// Queue `internalResolve` instead of the `run` function
		// to preserve asynchronous context.
		new Promise(internalResolve => {
			queue.enqueue(internalResolve);
		}).then(
			run.bind(undefined, function_, resolve, arguments_),
		);

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// after the `internalResolve` function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency) {
				resumeNext();
			}
		})();
	};

	const generator = (function_, ...arguments_) => new Promise(resolve => {
		enqueue(function_, resolve, arguments_);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value() {
				queue.clear();
			},
		},
		concurrency: {
			get: () => concurrency,

			set(newConcurrency) {
				validateConcurrency(newConcurrency);
				concurrency = newConcurrency;

				queueMicrotask(() => {
					// eslint-disable-next-line no-unmodified-loop-condition
					while (activeCount < concurrency && queue.size > 0) {
						resumeNext();
					}
				});
			},
		},
	});

	return generator;
}

function validateConcurrency(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isCoreRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('../chunks/_astro_data-layer-content_tqJQiZwR.mjs');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://astro.mellowbikers.nl", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('../chunks/_astro_asset-imports_Dno0vHp6.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames
}) {
  return async function getEntry(collectionOrLookupObject, _lookupId) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('../chunks/_astro_asset-imports_Dno0vHp6.mjs');
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames.has(collection)) {
      console.warn(`The collection ${JSON.stringify(collection)} does not exist.`);
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new j(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/agenda-items/01-oliebollenrit.md": () => import('../chunks/01-oliebollenrit_7PAjSUvb.mjs'),"/src/content/agenda-items/02-rondje-leeuw-vlaanderen.md": () => import('../chunks/02-rondje-leeuw-vlaanderen_CMjFwMzO.mjs'),"/src/content/agenda-items/03-pascal-classic.md": () => import('../chunks/03-pascal-classic_Cmr7-fsn.mjs'),"/src/content/agenda-items/04-westenschouwen.md": () => import('../chunks/04-westenschouwen_B_Ct2kVV.mjs'),"/src/content/agenda-items/05-ek-single-speed.md": () => import('../chunks/05-ek-single-speed_Dsay5siX.mjs'),"/src/content/agenda-items/06-knakworstenrit.md": () => import('../chunks/06-knakworstenrit_DQylqh04.mjs'),"/src/content/agenda-items/07-bbb-weekend.md": () => import('../chunks/07-bbb-weekend_DzhhASwO.mjs'),"/src/content/agenda-items/08-camping-weekend-duitsland.md": () => import('../chunks/08-camping-weekend-duitsland_BJs95hpn.mjs'),"/src/content/agenda-items/09-enduro-saalbach.md": () => import('../chunks/09-enduro-saalbach_B4XwJPvN.mjs'),"/src/content/agenda-items/10-sweet-surprise-ride.md": () => import('../chunks/10-sweet-surprise-ride_BEXjjJL4.mjs'),"/src/content/agenda-items/11-open-mellow-rit.md": () => import('../chunks/11-open-mellow-rit_12OsQZAR.mjs'),"/src/content/agenda-items/12-bergse-torenrit.md": () => import('../chunks/12-bergse-torenrit_alYo3STM.mjs'),"/src/content/agenda-items/13-snertrit.md": () => import('../chunks/13-snertrit_DvH4kOE4.mjs'),"/src/content/agenda-items/14-oliebollenrit-2026.md": () => import('../chunks/14-oliebollenrit-2026_AvyzX--_.mjs'),"/src/content/agenda-items/15-alv.md": () => import('../chunks/15-alv_CMJOzaSS.mjs'),"/src/content/agenda-items/16-mellow-weekend-luxemburg.md": () => import('../chunks/16-mellow-weekend-luxemburg_6N0Jma2V.mjs'),"/src/content/agenda-items/17-bkss.md": () => import('../chunks/17-bkss_BoXI52xH.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/agenda-settings/settings.json": () => import('../chunks/settings_Dje2hy31.mjs')});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"agenda-settings":{"type":"data","entries":{"settings":"/src/content/agenda-settings/settings.json"}},"agenda-items":{"type":"content","entries":{"04-westenschouwen":"/src/content/agenda-items/04-westenschouwen.md","05-ek-single-speed":"/src/content/agenda-items/05-ek-single-speed.md","02-rondje-leeuw-vlaanderen":"/src/content/agenda-items/02-rondje-leeuw-vlaanderen.md","06-knakworstenrit":"/src/content/agenda-items/06-knakworstenrit.md","07-bbb-weekend":"/src/content/agenda-items/07-bbb-weekend.md","09-enduro-saalbach":"/src/content/agenda-items/09-enduro-saalbach.md","01-oliebollenrit":"/src/content/agenda-items/01-oliebollenrit.md","08-camping-weekend-duitsland":"/src/content/agenda-items/08-camping-weekend-duitsland.md","10-sweet-surprise-ride":"/src/content/agenda-items/10-sweet-surprise-ride.md","03-pascal-classic":"/src/content/agenda-items/03-pascal-classic.md","11-open-mellow-rit":"/src/content/agenda-items/11-open-mellow-rit.md","12-bergse-torenrit":"/src/content/agenda-items/12-bergse-torenrit.md","13-snertrit":"/src/content/agenda-items/13-snertrit.md","14-oliebollenrit-2026":"/src/content/agenda-items/14-oliebollenrit-2026.md","15-alv":"/src/content/agenda-items/15-alv.md","16-mellow-weekend-luxemburg":"/src/content/agenda-items/16-mellow-weekend-luxemburg.md","17-bkss":"/src/content/agenda-items/17-bkss.md"}}};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/agenda-items/01-oliebollenrit.md": () => import('../chunks/01-oliebollenrit_KXzmswbs.mjs'),"/src/content/agenda-items/02-rondje-leeuw-vlaanderen.md": () => import('../chunks/02-rondje-leeuw-vlaanderen_FGMcgeQT.mjs'),"/src/content/agenda-items/03-pascal-classic.md": () => import('../chunks/03-pascal-classic_F0GARGBc.mjs'),"/src/content/agenda-items/04-westenschouwen.md": () => import('../chunks/04-westenschouwen_CPenXnwl.mjs'),"/src/content/agenda-items/05-ek-single-speed.md": () => import('../chunks/05-ek-single-speed_Dj7ZNWmq.mjs'),"/src/content/agenda-items/06-knakworstenrit.md": () => import('../chunks/06-knakworstenrit_DcIzZOIc.mjs'),"/src/content/agenda-items/07-bbb-weekend.md": () => import('../chunks/07-bbb-weekend_CcXUT8Mu.mjs'),"/src/content/agenda-items/08-camping-weekend-duitsland.md": () => import('../chunks/08-camping-weekend-duitsland_BPdXZ4JU.mjs'),"/src/content/agenda-items/09-enduro-saalbach.md": () => import('../chunks/09-enduro-saalbach_CQhfj_Rb.mjs'),"/src/content/agenda-items/10-sweet-surprise-ride.md": () => import('../chunks/10-sweet-surprise-ride_B_zN80QZ.mjs'),"/src/content/agenda-items/11-open-mellow-rit.md": () => import('../chunks/11-open-mellow-rit_DEsebB9t.mjs'),"/src/content/agenda-items/12-bergse-torenrit.md": () => import('../chunks/12-bergse-torenrit_D9zpEBMt.mjs'),"/src/content/agenda-items/13-snertrit.md": () => import('../chunks/13-snertrit_D3Ko5CfS.mjs'),"/src/content/agenda-items/14-oliebollenrit-2026.md": () => import('../chunks/14-oliebollenrit-2026_DZJC85gJ.mjs'),"/src/content/agenda-items/15-alv.md": () => import('../chunks/15-alv_2WtjK8CZ.mjs'),"/src/content/agenda-items/16-mellow-weekend-luxemburg.md": () => import('../chunks/16-mellow-weekend-luxemburg_CIO5W3oU.mjs'),"/src/content/agenda-items/17-bkss.md": () => import('../chunks/17-bkss_DRbLTQ65.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
});

const $$Agenda = createComponent(async ($$result, $$props, $$slots) => {
  const settings = await getEntry("agenda-settings", "settings");
  const { introText, leadText } = settings.data;
  const allAgendaItems = await getCollection("agenda-items");
  const agendaItems = allAgendaItems.sort((a, b) => a.data.order - b.data.order).map((item) => ({
    date: item.data.date,
    title: item.data.title,
    description: item.body,
    completed: item.data.completed
  }));
  return renderTemplate`${renderComponent($$result, "Default", $$Default, { "title": "agenda | Mellowbikers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- Hero Section --> <section class="relative w-full min-h-[90vh] bg-[#0d0f19] bg-cover bg-center bg-fixed flex items-end pb-20 px-4" style="background-image: url('https://mellowbikers.nl/wp-content/uploads/2025/09/mellows-berg.jpeg'); background-position: 50% 100%;"> <!-- Mountains separator at bottom - Layer 1 (full color) --> <div class="absolute -bottom-1 left-0 right-0 h-24 bg-mellow-red" style="clip-path: polygon(0 100%, 0 60%, 10% 70%, 20% 50%, 30% 60%, 40% 40%, 50% 55%, 60% 35%, 70% 50%, 80% 40%, 90% 55%, 100% 45%, 100% 100%);"></div> <!-- Mountains separator at bottom - Layer 2 (50% transparent, offset pattern) --> <div class="absolute bottom-0 left-0 right-0 h-28 bg-mellow-red/50" style="clip-path: polygon(0 100%, 0 50%, 10% 60%, 20% 40%, 30% 55%, 40% 30%, 50% 45%, 60% 25%, 70% 40%, 80% 30%, 90% 50%, 100% 35%, 100% 100%);"></div> <div class="relative z-10 w-full text-center"> <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f1ffff] mb-6" style="text-shadow: 10px 10px 30px rgba(0,0,0,0.2); line-height: 1; letter-spacing: -0.05em;">
Activiteiten 25/26
</h2> <h2 class="text-lg md:text-xl text-[#f1ffff] max-w-4xl mx-auto mb-8" style="text-shadow: 2px 2px 2px rgba(0,0,0,0.2);"> ${introText} </h2> <div class="text-[#f1ffff] text-4xl"> <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </div> </div> </section> <!-- Agenda Content Section --> <section class="relative w-full bg-[#d90b1e] py-12 md:py-20 px-4"> <!-- Mountains separator at top - Layer 1 (full color) --> <div class="absolute -top-1 left-0 right-0 h-24 bg-[#d90b1e]" style="clip-path: polygon(0 0, 0 40%, 10% 50%, 20% 30%, 30% 40%, 40% 20%, 50% 35%, 60% 15%, 70% 30%, 80% 20%, 90% 35%, 100% 25%, 100% 0);"></div> <!-- Mountains separator at top - Layer 2 (50% transparent, offset pattern) --> <div class="absolute top-0 left-0 right-0 h-28 bg-[#d90b1e]/50" style="clip-path: polygon(0 0, 0 50%, 10% 60%, 20% 40%, 30% 55%, 40% 30%, 50% 45%, 60% 25%, 70% 40%, 80% 30%, 90% 50%, 100% 35%, 100% 0);"></div> <div class="relative z-10 max-w-7xl mx-auto"> <div class="bg-[#0d0f19] rounded-lg p-6 md:p-12"> <h4 class="text-lg md:text-xl text-[#2affcc] font-bold mb-4">Agenda clubritten</h4> <p class="text-base text-[#f1ffff] mb-8"> ${leadText} </p> <ul class="space-y-4 text-[#f1ffff] mb-8"> ${agendaItems.map((item) => renderTemplate`<li class="flex gap-3"> <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"> ${item.completed ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <path d="M9 11l3 3L22 4 20.59 2.59 12 11.17 8.41 7.59 7 9z"></path> <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect> ` })}` : renderTemplate`<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>`} </svg> <span> <strong>${item.date}: ${item.title}</strong><br> ${item.description} </span> </li>`)} </ul> <div class="mt-8"> <a href="/lid-worden" class="inline-block px-6 py-3 rounded-lg bg-[#004fff] hover:bg-[#003acc] text-[#f1ffff] font-medium transition-colors border-2 border-[#004fff] hover:border-[#85afff]">
Ook meerijden? Word lid!
</a> </div> <p class="text-sm text-[#f1ffff] text-center mt-8">
Nog geen zin om lid te worden? Benieuwd of wij wel bij jou passen? Je kunt gewoon een keer meerijden! <a href="/#socials" class="underline text-[#2affcc] hover:text-[#1fe6b8]">Laat het ons hier even weten</a>.
</p> </div> </div> </section> <!-- Bottom Hero Section --> <section class="relative w-full min-h-[50vh] bg-[#0d0f19] bg-cover bg-center bg-fixed flex items-end justify-center px-4 pb-8" style="background-image: url('https://mellowbikers.nl/wp-content/uploads/2024/09/mb-scroll-agenda-2048.jpg'); background-position: 36% 64%;"> <!-- Mountains separator at top - Layer 1 (full color) --> <div class="absolute -top-1 left-0 right-0 h-24 bg-[#0d0f19]" style="clip-path: polygon(0 0, 0 40%, 10% 50%, 20% 30%, 30% 40%, 40% 20%, 50% 35%, 60% 15%, 70% 30%, 80% 20%, 90% 35%, 100% 25%, 100% 0);"></div> <!-- Mountains separator at top - Layer 2 (50% transparent, offset pattern) --> <div class="absolute top-0 left-0 right-0 h-28 bg-[#0d0f19]/50" style="clip-path: polygon(0 0, 0 50%, 10% 60%, 20% 40%, 30% 55%, 40% 30%, 50% 45%, 60% 25%, 70% 40%, 80% 30%, 90% 50%, 100% 35%, 100% 0);"></div> <div class="relative z-10 text-center text-sm text-[#f1ffff]/70"> <p class="text-shadow-lg">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Mellowbikers |
<a href="/" class="hover:text-[#2affcc] transition-colors">Home</a> |
<a href="/agenda" class="hover:text-[#2affcc] transition-colors">Agenda</a> |
<a href="/mellow-in-the-spotlight" class="hover:text-[#2affcc] transition-colors">Spotlight</a> |
<a href="/mellow-brewery" class="hover:text-[#2affcc] transition-colors">Bier</a> |
<a href="/lid-worden" class="hover:text-[#2affcc] transition-colors">Lid worden</a> </p> </div> </section> </main> ` })}`;
}, "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/agenda.astro", void 0);

const $$file = "/Users/timo/Library/Mobile Documents/com~apple~CloudDocs/Developer/mellowbikers-astro/src/pages/agenda.astro";
const $$url = "/agenda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Agenda,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
