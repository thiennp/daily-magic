import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectAccessAuditRow from "@/lib/projects/acl/mapProjectAccessAuditRow";
import {
  isProjectActivityAllowlistedAction,
  PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS,
} from "@/lib/projects/acl/projectActivityAllowlist.constant";
import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";
import { sanitizeProjectActivityDetail } from "@/lib/projects/acl/sanitizeProjectActivityDetail";
import type ProjectActivityEvent from "@/lib/projects/acl/types/ProjectActivityEvent.type";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export type ListProjectActivityResult =
  | {
      readonly ok: true;
      readonly events: readonly ProjectActivityEvent[];
      readonly nextCursor: string | null;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

const clampLimit = (limit: number | undefined): number => {
  if (limit === undefined || !Number.isFinite(limit)) {
    return DEFAULT_LIMIT;
  }
  const whole = Math.floor(limit);
  if (whole < 1) {
    return 1;
  }
  return whole > MAX_LIMIT ? MAX_LIMIT : whole;
};

/**
 * Reverse-chrono project activity. Auth matches Access visibility
 * (owner or active member with project:meta). Allowlisted audit actions only.
 */
export const listProjectActivity = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly since?: string | null;
  readonly cursor?: string | null;
  readonly limit?: number;
}): Promise<ListProjectActivityResult> => {
  const access = await resolveProjectAclAccess({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    requiredScopes: ["project:meta"],
  });
  if (!access.ok) {
    return {
      ok: false,
      code: access.reason === "not_found" ? "not_found" : "forbidden",
    };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const limit = clampLimit(input.limit);
  const since =
    typeof input.since === "string" && input.since.trim().length > 0
      ? input.since.trim()
      : null;
  const cursor =
    typeof input.cursor === "string" && input.cursor.trim().length > 0
      ? input.cursor.trim()
      : null;
  const actions = [...PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS];

  const rows = asRowArray(
    await sql`
      SELECT a.*
      FROM project_access_audit a
      WHERE a.project_id = ${input.projectId}
        AND a.action = ANY(${actions}::text[])
        AND (${since}::timestamptz IS NULL OR a.at >= ${since}::timestamptz)
        AND (
          ${cursor}::text IS NULL
          OR a.at < (SELECT c.at FROM project_access_audit c WHERE c.id = ${cursor} AND c.project_id = ${input.projectId})
          OR (
            a.at = (SELECT c.at FROM project_access_audit c WHERE c.id = ${cursor} AND c.project_id = ${input.projectId})
            AND a.id < ${cursor}
          )
        )
      ORDER BY a.at DESC, a.id DESC
      LIMIT ${limit + 1}
    `,
  );

  const mapped: ProjectActivityEvent[] = [];
  for (const row of rows) {
    const record = mapProjectAccessAuditRow(row);
    if (record === null) {
      continue;
    }
    if (!isProjectActivityAllowlistedAction(record.action)) {
      continue;
    }
    mapped.push({
      id: record.id,
      projectId: record.projectId,
      action: record.action,
      actorUserId: record.actorUserId,
      targetUserId: record.targetUserId,
      at: record.at,
      detail: sanitizeProjectActivityDetail(record.detail),
    });
  }

  const hasMore = mapped.length > limit;
  const events = hasMore ? mapped.slice(0, limit) : mapped;
  const nextCursor =
    hasMore && events.length > 0 ? events[events.length - 1].id : null;

  return { ok: true, events, nextCursor };
};
