import type {
  AwcMessengerOpenThread,
  AwcMessengerPageSource,
  AwcMessengerThreadError,
  AwcMessengerThreadPage,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import {
  asRecord,
  parseMessengerTimelineEntry,
} from "@/features/projects/messenger/utils/parseMessengerTimelineEntry";

const PAGE_SOURCES: ReadonlySet<string> = new Set([
  "local",
  "neon",
  "mixed",
  "exhausted",
]);

const parsePage = (value: unknown): AwcMessengerThreadPage | null => {
  const row = asRecord(value);
  if (row === null) return null;
  if (typeof row.hasMore !== "boolean") return null;
  if (typeof row.localLive !== "boolean") return null;
  if (typeof row.source !== "string" || !PAGE_SOURCES.has(row.source)) {
    return null;
  }
  const beforeCursor =
    row.beforeCursor === null
      ? null
      : typeof row.beforeCursor === "string"
        ? row.beforeCursor
        : null;
  if (row.beforeCursor !== null && beforeCursor === null) return null;
  return {
    beforeCursor,
    hasMore: row.hasMore,
    source: row.source as AwcMessengerPageSource,
    localLive: row.localLive,
  };
};

const parseError = (value: unknown): AwcMessengerThreadError | undefined => {
  const row = asRecord(value);
  if (row === null) return undefined;
  // Dispatch contract (fd7764c0): project_computer_offline only.
  if (row.code !== "project_computer_offline") return undefined;
  return {
    code: "project_computer_offline",
    message:
      typeof row.message === "string"
        ? row.message
        : "Connection to the project computer was lost.",
  };
};

/**
 * Parse GET thread. Feature-detects Dispatch `page` (newest-first entries) vs
 * today's main (oldest-first, no page). Display entries are always oldest-first.
 */
export const parseMessengerOpenThread = (
  payload: unknown,
): AwcMessengerOpenThread | null => {
  const body = asRecord(payload);
  if (body === null || body.ok !== true) return null;
  if (typeof body.threadKey !== "string") return null;
  const entriesRaw = Array.isArray(body.entries) ? body.entries : [];
  const parsedEntries = entriesRaw
    .map(parseMessengerTimelineEntry)
    .filter((entry): entry is AwcMessengerTimelineEntry => entry !== null);
  const page = parsePage(body.page);
  const entries =
    page !== null ? [...parsedEntries].reverse() : parsedEntries;
  const error = parseError(body.error);
  return {
    threadKey: body.threadKey,
    entries,
    canSend: body.canSend === true,
    ...(page !== null ? { page } : {}),
    ...(error !== undefined ? { error } : {}),
  };
};
