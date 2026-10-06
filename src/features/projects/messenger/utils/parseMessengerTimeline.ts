import type {
  AwcMessengerMessageState,
  AwcMessengerOpenThread,
  AwcMessengerStateChip,
  AwcMessengerTimelineEntry,
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
  };
};

export const parseMessengerOpenThread = (
  payload: unknown,
): AwcMessengerOpenThread | null => {
  const body = asRecord(payload);
  if (body === null || body.ok !== true) return null;
  if (typeof body.threadKey !== "string") return null;
  const entriesRaw = Array.isArray(body.entries) ? body.entries : [];
  return {
    threadKey: body.threadKey,
    entries: entriesRaw
      .map(parseEntry)
      .filter((entry): entry is AwcMessengerTimelineEntry => entry !== null),
    canSend: body.canSend === true,
  };
};
