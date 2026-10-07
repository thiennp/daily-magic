/**
 * Opaque Messenger timeline keyset cursor shared with AW Dispatch (Neon + local).
 * Payload shape: `{ t, id }` = createdAt + messageId. Wire form: base64url(JSON).
 */
export type ProjectHistoryTimelineCursor = {
  readonly t: string;
  readonly id: string;
};

const AT_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const encodeProjectHistoryTimelineCursor = (
  cursor: ProjectHistoryTimelineCursor,
): string =>
  Buffer.from(JSON.stringify({ t: cursor.t, id: cursor.id }), "utf8").toString(
    "base64url",
  );

/**
 * null when absent/blank; "invalid" when present but malformed.
 */
export const decodeProjectHistoryTimelineCursor = (
  raw: string | null | undefined,
): ProjectHistoryTimelineCursor | null | "invalid" => {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return null;
  }
  let parsed: unknown;
  try {
    const decoded = Buffer.from(raw.trim(), "base64url").toString("utf8");
    parsed = JSON.parse(decoded) as unknown;
  } catch {
    return "invalid";
  }
  if (!isRecord(parsed)) {
    return "invalid";
  }
  const t = parsed.t;
  const id = parsed.id;
  if (typeof t !== "string" || typeof id !== "string") {
    return "invalid";
  }
  if (!AT_PATTERN.test(t) || id.length === 0 || id.length > 200) {
    return "invalid";
  }
  return { t, id };
};
