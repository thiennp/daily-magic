import { decodeBase64UrlText, encodeBase64UrlText } from "./base64UrlText";

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
  encodeBase64UrlText(JSON.stringify({ t: cursor.t, id: cursor.id }));

const NOT_JSON = Symbol("not-json");

const readCursorJson = (raw: string): unknown => {
  try {
    return JSON.parse(decodeBase64UrlText(raw)) as unknown;
  } catch {
    return NOT_JSON;
  }
};

/**
 * null when absent/blank; "invalid" when present but malformed.
 */
export const decodeProjectHistoryTimelineCursor = (
  raw: string | null | undefined,
): ProjectHistoryTimelineCursor | null | "invalid" => {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return null;
  }
  const parsed = readCursorJson(raw.trim());
  if (parsed === NOT_JSON || !isRecord(parsed)) {
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
