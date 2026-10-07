/**
 * Cursor v1 — opaque base64url(JSON({ t, id })).
 * Same schema as History projectHistoryTimelineCursor / Messenger cursor.
 * Module re-exports this codec so sync callers do not need a new schema.
 */

import type { ProjectSyncCursor } from "@/features/projects/sync/projectSync.types";

export const encodeProjectSyncCursor = (cursor: ProjectSyncCursor): string =>
  Buffer.from(JSON.stringify({ t: cursor.t, id: cursor.id }), "utf8").toString(
    "base64url",
  );

/**
 * null when absent/blank; "invalid" when present but malformed.
 * Mirrors History decode rules (ISO-ish t, non-empty id ≤200).
 */
export const decodeProjectSyncCursor = (
  raw: string | null | undefined,
): ProjectSyncCursor | null | "invalid" => {
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
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return "invalid";
  }
  const record = parsed as Record<string, unknown>;
  const t = record.t;
  const id = record.id;
  if (typeof t !== "string" || typeof id !== "string") {
    return "invalid";
  }
  if (id.length === 0 || id.length > 200) {
    return "invalid";
  }
  return { t, id };
};
