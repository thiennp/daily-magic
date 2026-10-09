/**
 * Cursor v1 — opaque base64url(JSON({ t, id })).
 * Same schema as History projectHistoryTimelineCursor / Messenger cursor.
 * Module re-exports this codec so sync callers do not need a new schema.
 */

import {
  decodeBase64Url,
  encodeBase64Url,
} from "@/features/projects/sync/base64Url";
import type { ProjectSyncCursor } from "@/features/projects/sync/projectSync.types";

export const encodeProjectSyncCursor = (cursor: ProjectSyncCursor): string =>
  encodeBase64Url(JSON.stringify({ t: cursor.t, id: cursor.id }));

const NOT_JSON = Symbol("not-json");

const readCursorJson = (raw: string): unknown => {
  try {
    return JSON.parse(decodeBase64Url(raw)) as unknown;
  } catch {
    return NOT_JSON;
  }
};

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
  const parsed = readCursorJson(raw.trim());
  if (
    parsed === NOT_JSON ||
    typeof parsed !== "object" ||
    parsed === null ||
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
  if (id.length === 0 || id.length > 200) {
    return "invalid";
  }
  return { t, id };
};
