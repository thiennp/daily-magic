import { classifyProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/classifyProjectMessageWindowKind";
import { deriveProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/deriveProjectMessengerSubjectState";
import type {
  ProjectMessengerTimelineEntryInput,
  ProjectMessengerWindowTimelineEntry,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

/**
 * OW9: add server `windowKind` + live `subjectState` to one timeline row
 * (Neon message, Neon AI session, or a local AWL page row).
 * A row that already carries windowKind keeps it.
 * recipientKind "none": timeline rows are never bot↔bot. That is enforced by
 * projectMessengerThreadKeyForRow, so bot_to_bot cannot appear here yet.
 */
export const withProjectMessengerWindowFields = (
  entry: ProjectMessengerTimelineEntryInput,
): ProjectMessengerWindowTimelineEntry => {
  const windowKind =
    entry.windowKind ??
    classifyProjectMessageWindowKind({
      kind: entry.kind,
      senderKind: entry.author.kind,
      recipientKind: "none",
    });
  return {
    ...entry,
    windowKind,
    subjectState: deriveProjectMessengerSubjectState(entry, windowKind),
  };
};
