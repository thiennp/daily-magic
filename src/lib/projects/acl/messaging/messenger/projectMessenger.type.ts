/** "whole" or a bot membership id. People are not threads in v1. */
export type ProjectMessengerThreadKey = string;

/** Per-message bot state codes; UI owns copy. */
export type ProjectMessengerMessageState =
  | "received"
  | "got_it"
  | "working"
  | "done"
  | "blocked"
  | "waiting"
  | "no_answer"
  | "checks_on_demand";

export type ProjectMessengerBotStatus =
  | "working"
  | "idle"
  | "silent"
  | "checks_on_demand";

export type ProjectMessengerPartyKind = "owner" | "member" | "bot" | "system";

export type ProjectMessengerBot = {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly deliveryMode: "webhook" | "poll";
};

/** One live project_messages row for the messenger. */
export type ProjectMessengerRow = {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly createdAt: string;
  readonly senderKind: ProjectMessengerPartyKind;
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
  readonly senderDisplayName: string | null;
  readonly recipientKind: ProjectMessengerPartyKind | "none";
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
};

/** Thread row; inReplyTo/text from bot reply summaries. */
export type ProjectMessengerKeyedRow = {
  readonly threadKey: ProjectMessengerThreadKey;
  readonly row: ProjectMessengerRow;
  readonly inReplyTo: string | null;
  readonly text: string;
  /** False for state-only kinds. */
  readonly visible: boolean;
};

export type ProjectMessengerDelivery = {
  readonly messageId: string;
  readonly membershipId: string;
  readonly b2bState: string | null;
};

export type ProjectMessengerLinkedReply = {
  readonly kind: string;
  readonly text: string;
};

export type ProjectMessengerStateChip = {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly state: ProjectMessengerMessageState;
  /** Set only for blocked (linked task.blocked text). */
  readonly reason: string | null;
};

/** Discriminator for timeline rows. Omit / "message" = chat/task bubble. */
export type ProjectMessengerTimelineEntryKind = "message" | "session";

/** Nested AI session fields (local tasks/ + Neon agent_runs parity). */
export type ProjectMessengerTimelineSession = {
  readonly status: string;
  readonly writerAgent: string | null;
  readonly agentRunId: string;
};

/** @deprecated Alias — prefer ProjectMessengerTimelineEntryKind (C1 / UI lock). */
export type ProjectMessengerEntryKind = ProjectMessengerTimelineEntryKind;

/** @deprecated Alias — prefer ProjectMessengerTimelineSession (C1 / UI lock). */
export type ProjectMessengerAiSessionMeta = ProjectMessengerTimelineSession;

export type ProjectMessengerTimelineEntry = {
  readonly messageId: string;
  readonly createdAt: string;
  readonly author: {
    readonly kind: Exclude<ProjectMessengerPartyKind, "system">;
    readonly membershipId: string | null;
    readonly displayName: string | null;
  };
  /** Message subtype (chat.note, task.assign, ai.session, …). Not the entry discriminator. */
  readonly kind: string;
  /**
   * Additive row discriminator. Omit or `"message"` = chat/history message.
   * `"session"` = C1 AI session row (local tasks/ or Neon agent_runs).
   */
  readonly entryKind?: ProjectMessengerTimelineEntryKind;
  /** Present when entryKind is `"session"`. */
  readonly session?: ProjectMessengerTimelineSession;
  readonly text: string;
  readonly needsReply: boolean;
  readonly inReplyTo: string | null;
  /** Owner/member messages: one chip per bot delivery. */
  readonly states: readonly ProjectMessengerStateChip[];
};

export type ProjectMessengerThreadSummary = {
  readonly lastMessageAt: string | null;
  readonly lastPreview: string | null;
  readonly unreadCount: number;
};

export type ProjectMessengerBotThread = ProjectMessengerThreadSummary & {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly status: ProjectMessengerBotStatus;
};

export type ProjectMessengerThreadList = {
  readonly wholeProject: ProjectMessengerThreadSummary;
  readonly bots: readonly ProjectMessengerBotThread[];
  readonly canSend: boolean;
};
