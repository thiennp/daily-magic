import {
  mapProjectActivityEventRow,
  readProjectActivityAt,
} from "@/lib/projects/acl/activity/mapProjectActivityEventRow";
import {
  parseProjectActivityQuery,
  type ProjectActivityQueryInput,
} from "@/lib/projects/acl/activity/parseProjectActivityQuery";
import { encodeProjectActivityCursor } from "@/lib/projects/acl/activity/projectActivityCursor";
import { PROJECT_ACTIVITY_RETENTION } from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import { ensureProjectActivityEventsSchema } from "@/lib/projects/acl/activity/ensureProjectActivityEventsSchema";
import { queryProjectActivityEventRows } from "@/lib/projects/acl/activity/queryProjectActivityEventRows";
import type {
  ProjectActivityLogErrorCode,
  ProjectActivityLogResponse,
} from "@/lib/projects/acl/activity/types/ProjectActivityLog.type";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";

export type ListProjectActivityEventsResult =
  | ProjectActivityLogResponse
  | {
      readonly ok: false;
      readonly code: Exclude<ProjectActivityLogErrorCode, "unauthorized">;
    };

/** Owner-only Access log page. Any non-owner (member or not) → owner_only. */
export const listProjectActivityEvents = async (
  input: ProjectActivityQueryInput & {
    readonly projectId: string;
    readonly actorUserId: string;
  },
): Promise<ListProjectActivityEventsResult> => {
  const access = await authorizeProjectOwner({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.allow) {
    return {
      ok: false,
      code: access.reason === "not_found" ? "not_found" : "owner_only",
    };
  }
  const parsed = parseProjectActivityQuery(input);
  if (!parsed.ok) {
    return { ok: false, code: parsed.code };
  }
  await ensureProjectActivityEventsSchema();
  const rows = await queryProjectActivityEventRows({
    projectId: input.projectId,
    query: parsed.query,
  });
  const page = rows.slice(0, parsed.query.limit);
  const events = page.flatMap((row) => {
    const event = mapProjectActivityEventRow(row);
    return event === null ? [] : [event];
  });
  // Cursor from the last raw row, so dropped (unknown) rows never stall paging.
  const last = page.at(-1);
  return {
    ok: true,
    projectId: input.projectId,
    events,
    nextCursor:
      rows.length > parsed.query.limit && last !== undefined
        ? encodeProjectActivityCursor({
            at:
              typeof last.cursor_at === "string"
                ? last.cursor_at
                : readProjectActivityAt(last.created_at),
            id: String(last.id),
          })
        : null,
    retention: {
      maxEvents: PROJECT_ACTIVITY_RETENTION.maxEvents,
      maxAgeDays: PROJECT_ACTIVITY_RETENTION.maxAgeDays,
    },
  };
};
