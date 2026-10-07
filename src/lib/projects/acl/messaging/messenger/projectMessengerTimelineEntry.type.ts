import type {
  ProjectMessengerPartyKind,
  ProjectMessengerStateChip,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import type { ProjectMessengerPeerAddress } from "@/lib/projects/acl/messaging/messenger/projectMessengerPeerAddress.type";

/**
 * Archive meta (migration 098 archived_at / archived_by). Worked out when the
 * thread is read; null when the row is not archived or the source has no data.
 */
export type ProjectMessengerArchiveMeta = {
  /** ISO time the row was archived (Clear all). */
  readonly at: string;
  /** User id that archived it (archived_by). */
  readonly byUserId: string | null;
  /** That user's project seat name, "Owner" for the owner, else null. */
  readonly byDisplayName: string | null;
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
    /** "system" only on notice rows (server notices, no sender seat). */
    readonly kind: ProjectMessengerPartyKind;
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
  /**
   * Additive (DF-023): present on bot↔bot rows the owner sees in Whole
   * project. UI renders a compact "A → B · label · summary" line.
   */
  readonly peer?: ProjectMessengerPeerAddress;
  /** Additive (thread rows): archive meta; Neon rows only. */
  readonly archived?: ProjectMessengerArchiveMeta | null;
  /**
   * Additive (Whole project thread GET): set when the row was sent to
   * specific assistant(s) (kept recipient) rather than everyone. Same order;
   * labels = seat display names (fallback "Assistant"). Absent = everyone.
   */
  readonly toMembershipIds?: readonly string[];
  readonly toLabels?: readonly string[];
};
