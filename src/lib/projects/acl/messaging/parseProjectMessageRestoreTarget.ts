/** What a Restore call brings back from Archived. */
export type ProjectMessageRestoreTarget =
  | { readonly kind: "one"; readonly messageId: string }
  | { readonly kind: "batch"; readonly archiveBatch: string }
  | { readonly kind: "all" };

/** Postgres timestamptz text, e.g. "2026-10-06 11:48:12.123456+00". */
const ARCHIVE_BATCH_PATTERN =
  /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)?$/;

const nonEmpty = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

/**
 * Body → target. Exactly one of { messageId }, { archiveBatch }, { all: true }.
 * Anything else (or a mix) → null (400 invalid_target).
 */
export const parseProjectMessageRestoreTarget = (
  body: unknown,
): ProjectMessageRestoreTarget | null => {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }
  const record = body as Record<string, unknown>;
  const messageId = nonEmpty(record.messageId);
  const archiveBatch = nonEmpty(record.archiveBatch);
  const all = record.all === true;
  const chosen = [messageId !== null, archiveBatch !== null, all].filter(
    Boolean,
  );
  if (chosen.length !== 1) {
    return null;
  }
  if (messageId !== null) {
    return { kind: "one", messageId };
  }
  if (archiveBatch !== null) {
    return ARCHIVE_BATCH_PATTERN.test(archiveBatch)
      ? { kind: "batch", archiveBatch }
      : null;
  }
  return { kind: "all" };
};
