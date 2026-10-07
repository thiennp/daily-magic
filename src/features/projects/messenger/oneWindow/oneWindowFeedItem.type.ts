import type { AwcMessengerWindowKind } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type OneWindowStatusTone = "ok" | "warn" | "info";

/** Which existing live field the subject state was read from (never copied). */
export type OneWindowSubjectSource =
  /** PD per-recipient delivery state chips (assistant task state, DESIGN §3.2). */
  | "deliveries"
  /** `session.status` = AR `agent_runs.status` read at query time. */
  | "agent_run"
  /** Bot reply row's own kind (`task.done` / `task.blocked`). */
  | "reply_kind";

export type OneWindowSubjectState = {
  readonly source: OneWindowSubjectSource;
  readonly label: string;
  readonly tone: OneWindowStatusTone;
  /** Recipients done / total — only for multi-recipient task rows. */
  readonly done?: number;
  readonly of?: number;
  /** Human action wanted (blocked / no answer / run waiting for approval). */
  readonly needsYou: boolean;
  /** AR row is `pending_approval` (live run approval). */
  readonly awaitingApproval: boolean;
};

export type OneWindowFeedItem = {
  readonly windowKind: AwcMessengerWindowKind;
  /** `feed` = OW9 `windowKind` on the row; `derived` = DESIGN §3.1 rules here. */
  readonly windowKindFrom: "feed" | "derived";
  readonly subjectState: OneWindowSubjectState | null;
};

/**
 * Who is looking at the feed. `isOwner` comes from the pane; `membershipId` is
 * the viewer's own membership when known (the messenger client has none today).
 */
export type OneWindowViewer = {
  readonly isOwner: boolean;
  readonly membershipId?: string | null;
};
