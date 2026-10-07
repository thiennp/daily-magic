import type { ProjectMessengerPeerAddress } from "@/lib/projects/acl/messaging/messenger/projectMessengerPeerAddress.type";
import type {
  ProjectMessengerAiSessionMeta,
  ProjectMessengerEntryKind,
  ProjectMessengerTimelineEntry,
  ProjectMessengerTimelineEntryKind,
  ProjectMessengerTimelineSession,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerTimelineEntry.type";

export type { ProjectMessengerPeerAddress };
// Timeline entry types live in projectMessengerTimelineEntry.type (size cap).
export type {
  ProjectMessengerAiSessionMeta,
  ProjectMessengerEntryKind,
  ProjectMessengerTimelineEntry,
  ProjectMessengerTimelineEntryKind,
  ProjectMessengerTimelineSession,
};

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
  "working" | "idle" | "silent" | "checks_on_demand";

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
  /** Recipient seat name (bot↔bot rows; optional for older callers). */
  readonly toDisplayName?: string | null;
};

/** Thread row; inReplyTo/text from bot reply summaries. */
export type ProjectMessengerKeyedRow = {
  readonly threadKey: ProjectMessengerThreadKey;
  readonly row: ProjectMessengerRow;
  readonly inReplyTo: string | null;
  readonly text: string;
  /** False for state-only kinds. */
  readonly visible: boolean;
  /** DF-023: set only on owner-view bot↔bot rows (compact feed line). */
  readonly peer?: ProjectMessengerPeerAddress;
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
