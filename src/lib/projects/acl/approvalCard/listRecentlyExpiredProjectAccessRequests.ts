import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";

/** How long an expired join request stays visible on the owner card. */
export const EXPIRED_ACCESS_REQUEST_VISIBLE_MS = 24 * 60 * 60 * 1000;

/** Undecided requests whose TTL ran out in the last 24h (expired card only). */
export const listRecentlyExpiredProjectAccessRequests = async (
  projectId: string,
  nowMs: number = Date.now(),
): Promise<readonly ProjectAccessRequestRecord[]> => {
  await ensureProjectAclSchema();
  const since = new Date(
    nowMs - EXPIRED_ACCESS_REQUEST_VISIBLE_MS,
  ).toISOString();
  const now = new Date(nowMs).toISOString();
  const rows = asRowArray(
    await getSql()`
      SELECT *
      FROM project_access_requests
      WHERE project_id = ${projectId}
        AND status IN ('pending', 'expired')
        AND expires_at <= ${now}
        AND expires_at > ${since}
      ORDER BY expires_at DESC
      LIMIT 20
    `,
  );
  return rows.map((row) => mapProjectAccessRequestRow(row));
};
