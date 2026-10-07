/**
 * Opaque messenger page cursor: base64url(JSON({ t: createdAt, id: messageId })).
 * Stable keyset for load-older; decode never looks the row up.
 */
export type ProjectMessengerCursor = {
  readonly t: string;
  readonly id: string;
};

const AT_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/;

export const encodeProjectMessengerCursor = (
  cursor: ProjectMessengerCursor,
): string =>
  Buffer.from(JSON.stringify({ t: cursor.t, id: cursor.id }), "utf8").toString(
    "base64url",
  );

/** null when absent; "invalid" when present but malformed. */
export const decodeProjectMessengerCursor = (
  raw: string | null | undefined,
): ProjectMessengerCursor | null | "invalid" => {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(raw.trim(), "base64url").toString("utf8"),
    );
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return "invalid";
    }
    const record = parsed as Record<string, unknown>;
    const t = record.t;
    const id = record.id;
    if (typeof t !== "string" || typeof id !== "string") {
      return "invalid";
    }
    if (!AT_PATTERN.test(t) || id.length === 0 || id.length > 200) {
      return "invalid";
    }
    return { t, id };
  } catch {
    return "invalid";
  }
};
