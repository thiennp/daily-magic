import type {
  OneWindowFeedItem,
  OneWindowViewer,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** Approvals chip: approval rows, or a run waiting for approval. */
export const isOneWindowApprovalItem = (item: OneWindowFeedItem): boolean =>
  item.windowKind === "approval_request" ||
  item.windowKind === "approval_result" ||
  item.subjectState?.awaitingApproval === true;

/** Needs you chip: pending approvals or a task that is blocked on a person. */
export const isOneWindowNeedsYouItem = (item: OneWindowFeedItem): boolean =>
  item.windowKind === "approval_request" || item.subjectState?.needsYou === true;

const createdByOwnerViewer = (
  entry: AwcMessengerTimelineEntry,
  viewer: OneWindowViewer,
): boolean => viewer.isOwner && entry.author.kind === "owner";

const assignedToViewer = (
  entry: AwcMessengerTimelineEntry,
  viewer: OneWindowViewer,
): boolean => {
  const self = viewer.membershipId ?? null;
  return self !== null && entry.states.some((chip) => chip.membershipId === self);
};

const isViewerTask = (
  entry: AwcMessengerTimelineEntry,
  viewer: OneWindowViewer,
): boolean =>
  createdByOwnerViewer(entry, viewer) || assignedToViewer(entry, viewer);

/**
 * Product/Lead scope for Needs you: a row counts only when it is assigned to the
 * viewer, or created by the viewer as project owner. Approvals (run / join) are
 * decided by the project owner in v1, so they are the owner's. A task update
 * counts through its parent task row (`inReplyTo`); unknown parent → not counted.
 */
export const isOneWindowRowForViewer = (input: {
  readonly entry: AwcMessengerTimelineEntry;
  readonly item: OneWindowFeedItem;
  readonly viewer: OneWindowViewer;
  readonly entriesById: ReadonlyMap<string, AwcMessengerTimelineEntry>;
}): boolean => {
  const { entry, item, viewer, entriesById } = input;
  if (isOneWindowApprovalItem(item)) return viewer.isOwner;
  if (item.windowKind === "task_update") {
    const parent =
      entry.inReplyTo !== null ? entriesById.get(entry.inReplyTo) : undefined;
    return parent !== undefined && isViewerTask(parent, viewer);
  }
  return isViewerTask(entry, viewer);
};

/** Needs you chip/count: needs a person AND is the viewer's row (scope above). */
export const isOneWindowNeedsYouForViewer = (input: {
  readonly entry: AwcMessengerTimelineEntry;
  readonly item: OneWindowFeedItem;
  readonly viewer: OneWindowViewer;
  readonly entriesById: ReadonlyMap<string, AwcMessengerTimelineEntry>;
}): boolean => isOneWindowNeedsYouItem(input.item) && isOneWindowRowForViewer(input);
