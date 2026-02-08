declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"agenda-items": {
"01-oliebollenrit-2026.md": {
	id: "01-oliebollenrit-2026.md";
  slug: "01-oliebollenrit-2026";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"02-lossenochtend Rit.md": {
	id: "02-lossenochtend Rit.md";
  slug: "02-lossenochtend-rit";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"04-westenschouwen.md": {
	id: "04-westenschouwen.md";
  slug: "04-westenschouwen";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"05- Skills Ride.md": {
	id: "05- Skills Ride.md";
  slug: "05--skills-ride";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"06-knakworstenrit.md": {
	id: "06-knakworstenrit.md";
  slug: "06-knakworstenrit";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"07-NKSS.md": {
	id: "07-NKSS.md";
  slug: "07-nkss";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"08-mellow-weekend-luxemburg.md": {
	id: "08-mellow-weekend-luxemburg.md";
  slug: "08-mellow-weekend-luxemburg";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"09-15 jaar Mellowbikers BBQ.md": {
	id: "09-15 jaar Mellowbikers BBQ.md";
  slug: "09-15-jaar-mellowbikers-bbq";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"10-Lustrum Rit 15 jaar Mellows.md": {
	id: "10-Lustrum Rit 15 jaar Mellows.md";
  slug: "10-lustrum-rit-15-jaar-mellows";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"11-Gele Anemoon.md": {
	id: "11-Gele Anemoon.md";
  slug: "11-gele-anemoon";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"12-bkss.md": {
	id: "12-bkss.md";
  slug: "12-bkss";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"13-Sweet Surprise Ride.md": {
	id: "13-Sweet Surprise Ride.md";
  slug: "13-sweet-surprise-ride";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
"xx-enduro-saalbach.md": {
	id: "xx-enduro-saalbach.md";
  slug: "xx-enduro-saalbach";
  body: string;
  collection: "agenda-items";
  data: InferEntrySchema<"agenda-items">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"agenda-settings": {
"settings": {
	id: "settings";
  collection: "agenda-settings";
  data: InferEntrySchema<"agenda-settings">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
