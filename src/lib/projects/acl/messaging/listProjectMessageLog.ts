import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { countArchivedProjectMessages } from "@/lib/projects/acl/messaging/countArchivedProjectMessages";
import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import type { ListProjectMessageLogResult } from "@/lib/projects/acl/messaging/projectMessageLog.types";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";
import { selectProjectMessageLogRows } from "@/lib/projects/acl/messaging/selectProjectMessageLogRows";

export type {
  ListProjectMessageLogResult,
  ProjectMessageLogEntry,
} from "@/lib/projects/acl/messaging/projectMessageLog.types";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

const clampLimit = (limit: number | undefined): number => {
  if (limit === undefined || !Number.isFinite(limit)) return DEFAULT_LIMIT;
  const whole = Math.floor(limit);
  if (whole < 1) return 1;
  return whole > MAX_LIMIT ? MAX_LIMIT : whole;
};

/**
 * Full project message log (peer↔peer + Owner-addressed).
 * Owner, or active human member|viewer (read-only seats still may read).
 * Reverse-chrono with optional since + cursor pagination.
 * Inbox (default) hides archived rows; archived=true lists only archived rows
 * (Archived filter). Same read access either way; Restore is owner-only.
 */
export const listProjectMessageLog = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly since?: string | null;
  readonly cursor?: string | null;
  readonly limit?: number;
  readonly archived?: boolean;
}): Promise<ListProjectMessageLogResult> => {
  const access = await resolveOwnerOrActiveHumanSeat({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return { ok: false, code: access.code };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const limit = clampLimit(input.limit);
  const archived = input.archived === true;
  const since =
    typeof input.since === "string" && input.since.trim().length > 0
      ? input.since.trim()
      : null;
  const cursor =
    typeof input.cursor === "string" && input.cursor.trim().length > 0
      ? input.cursor.trim()
      : null;

  const rows = await selectProjectMessageLogRows({
    projectId: input.projectId,
    viewerUserId: input.actorUserId,
    viewerIsOwner: access.kind === "owner",
    archived,
    since,
    cursor,
    limit,
  });

  const page = rows.slice(0, limit).map(mapProjectMessageLogRow);
  const nextCursor =
    rows.length > limit && page.length > 0
      ? page[page.length - 1].messageId
      : null;

  return {
    ok: true,
    messages: page,
    nextCursor,
    scope: "project",
    archived,
    archivedCount: await countArchivedProjectMessages(input.projectId),
    canRestore: access.kind === "owner",
  };
};
