/**
 * Minimale frontmatter-parser voor de markdown-bestanden uit de
 * Astro-content. Bewust klein gehouden: de bestanden gebruiken alleen
 * key/value, quotes en eenvoudige lijsten met src/alt-paren.
 */
export type Frontmatter = Record<string, unknown>

export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw.trim() }

  const [, head, body] = match
  const data: Frontmatter = {}
  let listKey: string | null = null
  let listItems: Record<string, string>[] = []

  const flush = () => {
    if (listKey) data[listKey] = listItems
    listKey = null
    listItems = []
  }

  const unquote = (value: string) => value.trim().replace(/^["'](.*)["']$/s, '$1')

  for (const line of head.split(/\r?\n/)) {
    if (!line.trim()) continue

    const listStart = line.match(/^([a-zA-Z0-9_]+):\s*$/)
    if (listStart) {
      flush()
      listKey = listStart[1]
      continue
    }

    if (listKey) {
      const itemStart = line.match(/^\s*-\s*([a-zA-Z0-9_]+):\s*(.*)$/)
      if (itemStart) {
        listItems.push({ [itemStart[1]]: unquote(itemStart[2]) })
        continue
      }
      const itemProp = line.match(/^\s+([a-zA-Z0-9_]+):\s*(.*)$/)
      if (itemProp && listItems.length > 0) {
        listItems[listItems.length - 1][itemProp[1]] = unquote(itemProp[2])
        continue
      }
    }

    const pair = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/)
    if (pair) {
      flush()
      const value = unquote(pair[2])
      data[pair[1]] =
        value === 'true' ? true : value === 'false' ? false : /^\d+$/.test(value) ? Number(value) : value
    }
  }

  flush()
  return { data, body: body.trim() }
}
