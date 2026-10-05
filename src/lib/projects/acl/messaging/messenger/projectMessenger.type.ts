/** "whole" or a bot membership id. People are not threads in v1. */
export type ProjectMessengerThreadKey = string;

/** Per-message bot state codes; copy lives in the UI (spec.md States table). */
export type ProjectMessengerMessageState =
  | "received"
  | "got_it"
  | "working"
  | "done"
  | "blocked"
  | "waiting"
  | "no_answer";

export type ProjectMessengerBotStatus = "working" | "idle" | "silent";

export type ProjectMessengerPartyKind = "owner" | "member" | "bot" | "system";

export type ProjectMessengerBot = {
  readonly membershipId: string;
  readonly displayName: string | null;
};

/** One live project_messages row, classified for the messenger. */
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

/** Row placed in a thread. inReplyTo/text are read from bot reply summaries. */
export type ProjectMessengerKeyedRow = {
  readonly threadKey: ProjectMessengerThreadKey;
  readonly row: ProjectMessengerRow;
  readonly inReplyTo: string | null;
  readonly text: string;
  /** False for state-only kinds (task.received / task.processing). */
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
  /** Set only for blocked (bot's task.blocked reply text when linked). */
  readonly reason: string | null;
};

export type ProjectMessengerTimelineEntry = {
  readonly messageId: string;
  readonly createdAt: string;
  readonly author: {
    readonly kind: Exclude<ProjectMessengerPartyKind, "system">;
    readonly membershipId: string | null;
    readonly displayName: string | null;
  };
  readonly kind: string;
  readonly text: string;
  readonly needsReply: boolean;
  readonly inReplyTo: string | null;
  /** Under owner/member messages: one chip per bot delivery. Empty for bot replies. */
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
