/**
 * Opaque messenger page cursor: base64url(JSON({ t: createdAt, id: messageId })).
 * Shared with AW History — re-exports History public-api codec so Neon and local
 * never drift formats.
 */
import {
  decodeProjectHistoryTimelineCursor,
  encodeProjectHistoryTimelineCursor,
} from "@agent-witch/live-project-history";
import type { ProjectHistoryTimelineCursor } from "@agent-witch/live-project-history/types";

export type ProjectMessengerCursor = ProjectHistoryTimelineCursor;

export const encodeProjectMessengerCursor = (
  cursor: ProjectMessengerCursor,
): string => encodeProjectHistoryTimelineCursor(cursor);

/** null when absent; "invalid" when present but malformed. */
export const decodeProjectMessengerCursor = (
  raw: string | null | undefined,
): ProjectMessengerCursor | null | "invalid" =>
  decodeProjectHistoryTimelineCursor(raw);
