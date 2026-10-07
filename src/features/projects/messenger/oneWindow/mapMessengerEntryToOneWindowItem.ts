import {
  subjectStateFromAgentRun,
  subjectStateFromDeliveries,
  subjectStateFromReplyKind,
} from "@/features/projects/messenger/oneWindow/oneWindowSubjectState";
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
  subjectStateFromReplyKind,
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
