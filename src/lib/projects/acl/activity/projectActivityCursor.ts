/**
 * Keyset cursor: base64url("<created_at with microseconds>|<id>").
 * Paging uses (created_at, id) < cursor and never looks the cursor row up,
 * so rows trimmed by retention cannot break or empty the next page.
 */
export type ProjectActivityCursor = {
  readonly at: string;
  readonly id: string;
};

const AT_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/;

export const encodeProjectActivityCursor = (
  cursor: ProjectActivityCursor,
): string =>
  Buffer.from(`${cursor.at}|${cursor.id}`, "utf8").toString("base64url");

/** null when absent; "invalid" when present but malformed. */
export const decodeProjectActivityCursor = (
  raw: string | null | undefined,
): ProjectActivityCursor | null | "invalid" => {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return null;
  }
  const decoded = Buffer.from(raw.trim(), "base64url").toString("utf8");
  const split = decoded.indexOf("|");
  if (split <= 0) {
    return "invalid";
  }
  const at = decoded.slice(0, split);
  const id = decoded.slice(split + 1);
  if (!AT_PATTERN.test(at) || id.length === 0 || id.length > 200) {
    return "invalid";
  }
  return { at, id };
};
