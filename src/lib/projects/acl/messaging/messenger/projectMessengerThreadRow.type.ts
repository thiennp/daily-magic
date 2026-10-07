import type { ProjectMessengerArchiveMeta } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import type { ProjectMessengerWindowTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

/**
 * GET …/messenger/threads/:threadKey row: OW9 window fields + grouping and
 * archive meta, all worked out at read time (no stored column, no bodies).
 */
export type ProjectMessengerThreadRowEntry =
  ProjectMessengerWindowTimelineEntry & {
    /**
     * Parent row id (DESIGN parent_message_id), read from the reply
     * convention (= inReplyTo). Null for top-level rows. The parent may sit
     * on an older page or be gone (ack / TTL).
     */
    readonly parentMessageId: string | null;
    /** Direct replies to this row in this response, oldest first. */
    readonly replyIds: readonly string[];
    /** Archive meta; null when not archived or unknown (local / AI session). */
    readonly archived: ProjectMessengerArchiveMeta | null;
  };
