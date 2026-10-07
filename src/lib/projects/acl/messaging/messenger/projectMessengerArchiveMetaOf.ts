import type {
  ProjectMessengerArchiveMeta,
  ProjectMessengerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Row archive columns → wire meta; null when not archived (or not selected). */
export const projectMessengerArchiveMetaOf = (
  row: ProjectMessengerRow,
): ProjectMessengerArchiveMeta | null =>
  row.archivedAt === undefined || row.archivedAt === null
    ? null
    : {
        at: row.archivedAt,
        byUserId: row.archivedBy ?? null,
        byDisplayName: row.archivedByDisplayName ?? null,
      };
