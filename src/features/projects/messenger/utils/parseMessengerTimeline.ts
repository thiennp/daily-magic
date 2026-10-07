import {
  AWC_MESSENGER_WINDOW_KINDS,
  type AwcMessengerAiSessionMeta,
  type AwcMessengerEntryKind,
  type AwcMessengerMessageState,
  type AwcMessengerOpenThread,
  type AwcMessengerPageSource,
  type AwcMessengerStateChip,
  type AwcMessengerThreadError,
  type AwcMessengerThreadPage,
  type AwcMessengerTimelineEntry,
  type AwcMessengerWindowKind,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
};

const STATES: ReadonlySet<string> = new Set([
  "received",
  "got_it",
  "working",
  "done",
  "blocked",
  "waiting",
  "no_answer",
  "checks_on_demand",
]);

const PAGE_SOURCES: ReadonlySet<string> = new Set([
  "local",
  "neon",
  "mixed",
  "exhausted",
]);

const parseChip = (value: unknown): AwcMessengerStateChip | null => {
  const row = asRecord(value);
  if (row === null || typeof row.membershipId !== "string") return null;
  if (typeof row.state !== "string" || !STATES.has(row.state)) return null;
  return {
    membershipId: row.membershipId,
    displayName: typeof row.displayName === "string" ? row.displayName : null,
    state: row.state as AwcMessengerMessageState,
    reason: typeof row.reason === "string" ? row.reason : null,
  };
};

const ENTRY_KINDS: ReadonlySet<string> = new Set(["message", "session"]);

const parseEntryKind = (value: unknown): AwcMessengerEntryKind | undefined => {
  if (typeof value !== "string" || !ENTRY_KINDS.has(value)) return undefined;
  return value as AwcMessengerEntryKind;
};

const isWindowKind = (value: unknown): value is AwcMessengerWindowKind =>
  typeof value === "string" &&
  (AWC_MESSENGER_WINDOW_KINDS as readonly string[]).includes(value);

/** OW9 `windowKind` (DESIGN §3.1 enum) — feature-detected; unknown → omitted. */
const parseWindowKind = (
  value: unknown,
): AwcMessengerWindowKind | undefined =>
  isWindowKind(value) ? value : undefined;

const parseSession = (value: unknown): AwcMessengerAiSessionMeta | undefined => {
  const row = asRecord(value);
  if (row === null || typeof row.status !== "string") return undefined;
  return {
    status: row.status,
    writerAgent: typeof row.writerAgent === "string" ? row.writerAgent : null,
    agentRunId: typeof row.agentRunId === "string" ? row.agentRunId : null,
  };
};

const parseEntry = (value: unknown): AwcMessengerTimelineEntry | null => {
  const row = asRecord(value);
  if (row === null || typeof row.messageId !== "string") return null;
  const author = asRecord(row.author);
  if (author === null) return null;
  const kind =
    author.kind === "owner" || author.kind === "member" || author.kind === "bot"
      ? author.kind
      : null;
  if (kind === null) return null;
  const statesRaw = Array.isArray(row.states) ? row.states : [];
  const entryKind = parseEntryKind(row.entryKind);
  const session = parseSession(row.session);
  const windowKind = parseWindowKind(row.windowKind);
  return {
    messageId: row.messageId,
    createdAt: typeof row.createdAt === "string" ? row.createdAt : "",
    author: {
      kind,
      membershipId:
        typeof author.membershipId === "string" ? author.membershipId : null,
      displayName:
        typeof author.displayName === "string" ? author.displayName : null,
    },
    kind: typeof row.kind === "string" ? row.kind : "",
    text: typeof row.text === "string" ? row.text : "",
    needsReply: row.needsReply === true,
    inReplyTo: typeof row.inReplyTo === "string" ? row.inReplyTo : null,
    states: statesRaw
      .map(parseChip)
      .filter((chip): chip is AwcMessengerStateChip => chip !== null),
    ...(entryKind !== undefined ? { entryKind } : {}),
    ...(session !== undefined ? { session } : {}),
    ...(windowKind !== undefined ? { windowKind } : {}),
  };
};

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
    .map(parseEntry)
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
