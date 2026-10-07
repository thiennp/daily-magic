import {
  subjectStateFromAgentRun,
  subjectStateFromDeliveries,
} from "@/features/projects/messenger/oneWindow/oneWindowSubjectState";
import { subjectStateFromWire } from "@/features/projects/messenger/oneWindow/oneWindowSubjectStateFromWire";
import type {
  OneWindowFeedItem,
  OneWindowSubjectState,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import type {
  AwcMessengerTimelineEntry,
  AwcMessengerWindowKind,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { isMessengerAiSessionEntry } from "@/features/projects/messenger/utils/isMessengerAiSessionEntry";
import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

// Stable import path: types, subject-state readers and filters live in siblings.
export type {
  OneWindowFeedItem,
  OneWindowStatusTone,
  OneWindowSubjectSource,
  OneWindowSubjectState,
  OneWindowViewer,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
export {
  subjectStateFromAgentRun,
  subjectStateFromDeliveries,
} from "@/features/projects/messenger/oneWindow/oneWindowSubjectState";
export {
  isOneWindowApprovalItem,
  isOneWindowNeedsYouForViewer,
  isOneWindowNeedsYouItem,
  isOneWindowRowForViewer,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedFilters";

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
 * Fallback for rows without OW9 `windowKind` (pre-OW9 browser copy): DESIGN
 * §3.1 rules on the fields those rows carry. `notice`, `bot_to_bot` and
 * `approval_*` come only from the server's windowKind.
 */
export const deriveOneWindowKind = (
  entry: AwcMessengerTimelineEntry,
): AwcMessengerWindowKind => {
  if (isMessengerAiSessionEntry(entry)) return "task";
  // DF-023: owner-view bot↔bot rows carry `peer`.
  if (entry.peer !== undefined) return "bot_to_bot";
  if (entry.author.kind === "bot") {
    return TASK_UPDATE_KINDS.has(entry.kind) ? "task_update" : "chat";
  }
  return entry.kind === TASK_ASSIGN_KIND ? "task" : "chat";
};

/**
 * P1-S5: OW9 rows carry `subjectState` (null = none) → used as is. Rows
 * without it (pre-OW9 browser copy) read live fields only: AR status on
 * sessions, delivery chips on tasks. Task updates get no pill there (the S3
 * reply-kind heuristic is gone; OW9's reply_kind state replaces it).
 */
const resolveSubjectState = (
  entry: AwcMessengerTimelineEntry,
  windowKind: AwcMessengerWindowKind,
): OneWindowSubjectState | null => {
  if (entry.subjectState !== undefined) {
    return entry.subjectState === null
      ? null
      : subjectStateFromWire(entry.subjectState, entry.states);
  }
  if (isMessengerAiSessionEntry(entry)) {
    return entry.session !== undefined
      ? subjectStateFromAgentRun(entry.session.status)
      : null;
  }
  return windowKind === "task"
    ? subjectStateFromDeliveries(entry.states)
    : null;
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
