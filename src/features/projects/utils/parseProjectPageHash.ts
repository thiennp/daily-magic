export interface ParsedProjectPageHash {
  /** Tab id: the hash segment before `?` (may not be a known tab). */
  readonly tab: string;
  /** Deep-link params after `?` (e.g. `item`, `report`, `mode`). */
  readonly query: URLSearchParams;
}

/**
 * `#library?item=c1` → `{ tab: "library", query: item=c1 }`.
 * The query never takes part in tab identity.
 */
export const parseProjectPageHash = (hash: string): ParsedProjectPageHash => {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const queryStart = raw.indexOf("?");
  if (queryStart === -1) {
    return { tab: raw, query: new URLSearchParams() };
  }
  return {
    tab: raw.slice(0, queryStart),
    query: new URLSearchParams(raw.slice(queryStart + 1)),
  };
};

/** One hash deep-link param, only while the hash points at `tab`. */
export const readProjectPageHashParam = (
  hash: string,
  tab: string,
  key: string,
): string | null => {
  const parsed = parseProjectPageHash(hash);
  if (parsed.tab !== tab) {
    return null;
  }
  const value = parsed.query.get(key)?.trim() ?? "";
  return value.length > 0 ? value : null;
};
