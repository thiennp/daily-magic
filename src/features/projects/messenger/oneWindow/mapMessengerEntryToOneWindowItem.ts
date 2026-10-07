import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type {
  AwcMessengerMessageState,
  AwcMessengerStateChip,
  AwcMessengerTimelineEntry,
  AwcMessengerWindowKind,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";
import { isMessengerAiSessionEntry } from "@/features/projects/messenger/utils/isMessengerAiSessionEntry";
import { messengerAiSessionStatusTone } from "@/features/projects/messenger/utils/messengerAiSessionStatusTone";
import { messengerStateChipTone } from "@/features/projects/messenger/utils/messengerStateChipTone";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

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

const TASK_UPDATE_KINDS: ReadonlySet<string> = new Set([
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
]);

/** Human task row kind (owner/member dispatch, "Needs a reply" on). */
const TASK_ASSIGN_KIND = "task.assign";

/**
 * DESIGN §3.1 classifier, limited to what today's feed rows carry. `notice`,
 * `bot_to_bot` and `approval_*` need fields the feed does not send yet
 * (system rows are dropped server-side; no recipient kind) → only via OW9.
 */
export const deriveOneWindowKind = (
  entry: AwcMessengerTimelineEntry,
): AwcMessengerWindowKind => {
  if (isMessengerAiSessionEntry(entry)) return "task";
  if (entry.author.kind === "bot") {
    return TASK_UPDATE_KINDS.has(entry.kind) ? "task_update" : "chat";
  }
  return entry.kind === TASK_ASSIGN_KIND ? "task" : "chat";
};

const toStatusTone = (
  tone: ReturnType<typeof messengerStateChipTone>,
): OneWindowStatusTone => {
  if (tone === "ok") return "ok";
  if (tone === "warn" || tone === "err") return "warn";
  return "info";
};

/** Lower = shown first when recipients disagree (attention before progress). */
const STATE_RANK: Record<AwcMessengerMessageState, number> = {
  blocked: 0,
  no_answer: 1,
  waiting: 2,
  checks_on_demand: 3,
  working: 4,
  got_it: 5,
  received: 6,
  done: 7,
};

const NEEDS_YOU_STATES: ReadonlySet<AwcMessengerMessageState> = new Set([
  "blocked",
  "no_answer",
]);

/** Live PD delivery chips → one task status (worst first; done/of when > 1). */
export const subjectStateFromDeliveries = (
  states: readonly AwcMessengerStateChip[],
): OneWindowSubjectState | null => {
  if (states.length === 0) return null;
  const lead = [...states].sort(
    (a, b) => STATE_RANK[a.state] - STATE_RANK[b.state],
  )[0];
  const done = states.filter((chip) => chip.state === "done").length;
  return {
    source: "deliveries",
    label: formatMessengerStateLabel(lead.state, lead.displayName),
    tone: toStatusTone(messengerStateChipTone(lead.state)),
    ...(states.length > 1 ? { done, of: states.length } : {}),
    needsYou: NEEDS_YOU_STATES.has(lead.state),
    awaitingApproval: false,
  };
};

const formatRunStatusLabel = (status: string): string => {
  const trimmed = status.trim();
  return trimmed.length === 0 ? "Unknown" : trimmed.replaceAll("_", " ");
};

/** Live AR status on a session row → subject state. */
export const subjectStateFromAgentRun = (
  status: string,
): OneWindowSubjectState => {
  const awaitingApproval =
    status.trim().toLowerCase() === AgentRunStatus.PENDING_APPROVAL;
  return {
    source: "agent_run",
    label: formatRunStatusLabel(status),
    tone: awaitingApproval
      ? "warn"
      : toStatusTone(messengerAiSessionStatusTone(status)),
    needsYou: awaitingApproval,
    awaitingApproval,
  };
};

/** Bot reply kind → terminal status only (plain `task.status` stays unlabeled). */
export const subjectStateFromReplyKind = (
  kind: string,
): OneWindowSubjectState | null => {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (kind === PROJECT_MESSAGE_KIND_TASK_DONE) {
    return {
      source: "reply_kind",
      label: copy.stateDone,
      tone: "ok",
      needsYou: false,
      awaitingApproval: false,
    };
  }
  if (kind === PROJECT_MESSAGE_KIND_TASK_BLOCKED) {
    return {
      source: "reply_kind",
      label: copy.stateBlocked,
      tone: "warn",
      needsYou: true,
      awaitingApproval: false,
    };
  }
  return null;
};

const resolveSubjectState = (
  entry: AwcMessengerTimelineEntry,
  windowKind: AwcMessengerWindowKind,
): OneWindowSubjectState | null => {
  if (isMessengerAiSessionEntry(entry)) {
    return entry.session !== undefined
      ? subjectStateFromAgentRun(entry.session.status)
      : null;
  }
  if (windowKind === "task") return subjectStateFromDeliveries(entry.states);
  if (windowKind === "task_update") return subjectStateFromReplyKind(entry.kind);
  return null;
};

/**
 * OW-H5 thin bind: one feed row → window kind + live subject state, read only
 * from fields the feed already returns (no new API / schema / store).
 */
export const mapMessengerEntryToOneWindowItem = (
  entry: AwcMessengerTimelineEntry,
): OneWindowFeedItem => {
  const fromFeed = entry.windowKind;
  const windowKind = fromFeed ?? deriveOneWindowKind(entry);
  return {
    windowKind,
    windowKindFrom: fromFeed !== undefined ? "feed" : "derived",
    subjectState: resolveSubjectState(entry, windowKind),
  };
};

/** Approvals chip: approval rows, or a run waiting for approval. */
export const isOneWindowApprovalItem = (item: OneWindowFeedItem): boolean =>
  item.windowKind === "approval_request" ||
  item.windowKind === "approval_result" ||
  item.subjectState?.awaitingApproval === true;

/** Needs you chip: pending approvals or a task that is blocked on a person. */
export const isOneWindowNeedsYouItem = (item: OneWindowFeedItem): boolean =>
  item.windowKind === "approval_request" || item.subjectState?.needsYou === true;
