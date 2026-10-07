import type { AwcMessengerPeerAddress } from "@/features/projects/messenger/types/awcMessengerPeerAddress.type";
import type { AwcMessengerSubjectStateWire } from "@/features/projects/messenger/types/awcMessengerSubjectStateWire.type";

export type AwcMessengerBotStatus =
  "working" | "idle" | "silent" | "checks_on_demand";

export type AwcMessengerMessageState =
  | "received"
  | "got_it"
  | "working"
  | "done"
  | "blocked"
  | "waiting"
  | "no_answer"
  | "checks_on_demand";

export type AwcMessengerThreadSummary = {
  readonly lastMessageAt: string | null;
  readonly lastPreview: string | null;
  readonly unreadCount: number;
};

export type AwcMessengerBotThread = AwcMessengerThreadSummary & {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly status: AwcMessengerBotStatus;
};

export type AwcMessengerThreadList = {
  readonly wholeProject: AwcMessengerThreadSummary;
  readonly bots: readonly AwcMessengerBotThread[];
  readonly canSend: boolean;
};

export type AwcMessengerStateChip = {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly state: AwcMessengerMessageState;
  readonly reason: string | null;
};

/** Discriminator for timeline rows. Omit / "message" = chat/task bubble. */
export type AwcMessengerEntryKind = "message" | "session";

/** Optional AI-session metadata from History/Dispatch (additive). */
export type AwcMessengerAiSessionMeta = {
  readonly status: string;
  readonly writerAgent: string | null;
  readonly agentRunId: string | null;
};

/**
 * One-window row kind — DESIGN §3.1 `window_kind` enum (OW1 CHECK), sent as
 * `windowKind` on the feed by OW9. Absent on today's main → client derives it
 * from existing fields (see mapMessengerEntryToOneWindowItem). Never shown in UI.
 */
export const AWC_MESSENGER_WINDOW_KINDS = [
  "chat",
  "task",
  "task_update",
  "approval_request",
  "approval_result",
  "notice",
  "bot_to_bot",
] as const;

export type AwcMessengerWindowKind =
  (typeof AWC_MESSENGER_WINDOW_KINDS)[number];

export type AwcMessengerTimelineEntry = {
  readonly messageId: string;
  readonly createdAt: string;
  readonly author: {
    readonly kind: "owner" | "member" | "bot";
    readonly membershipId: string | null;
    readonly displayName: string | null;
  };
  /** Message subtype (chat.note, task.assign, ai.session, …). */
  readonly kind: string;
  readonly text: string;
  readonly needsReply: boolean;
  readonly inReplyTo: string | null;
  readonly states: readonly AwcMessengerStateChip[];
  /** Additive: omit or "message" = bubble; "session" = compact AI-session row. */
  readonly entryKind?: AwcMessengerEntryKind;
  readonly session?: AwcMessengerAiSessionMeta;
  /** Additive (OW9): server window kind when the feed sends it; else omitted. */
  readonly windowKind?: AwcMessengerWindowKind;
  /** Additive (OW9): server live subject state (codes); null = none. */
  readonly subjectState?: AwcMessengerSubjectStateWire | null;
  readonly peer?: AwcMessengerPeerAddress;
};

/** Dispatch load-older page meta (fd7764c0). Absent on today's main. */
export type AwcMessengerPageSource = "local" | "neon" | "mixed" | "exhausted";

export type AwcMessengerThreadPage = {
  readonly beforeCursor: string | null;
  readonly hasMore: boolean;
  readonly source: AwcMessengerPageSource;
  readonly localLive: boolean;
};

/** Dispatch offline error when Neon is exhausted and the project computer is offline. */
export type AwcMessengerThreadError = {
  readonly code: "project_computer_offline";
  readonly message: string;
};

export type AwcMessengerOpenThread = {
  readonly threadKey: string;
  /** Display order: oldest first, newest last (composer sits under the latest). */
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly canSend: boolean;
  readonly page?: AwcMessengerThreadPage;
  readonly error?: AwcMessengerThreadError;
};
