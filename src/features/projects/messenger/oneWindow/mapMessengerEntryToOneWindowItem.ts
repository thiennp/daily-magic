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
import { classifyProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/classifyProjectMessageWindowKind";

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

/**
 * Fallback for rows without OW9 `windowKind` (pre-OW9 browser copy): the
 * server classifier (DESIGN §3.1, one source). AI session → task; DF-023
 * `peer` rows → bot_to_bot. `approval_*` comes only from the server.
 */
export const deriveOneWindowKind = (
  entry: AwcMessengerTimelineEntry,
): AwcMessengerWindowKind => {
  if (isMessengerAiSessionEntry(entry)) return "task";
  if (entry.peer !== undefined) return "bot_to_bot";
  return classifyProjectMessageWindowKind({
    kind: entry.kind,
    senderKind: entry.author.kind,
    recipientKind: "none",
  });
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
