import { asRowArray, getSql } from "@/lib/db";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { ensureProjectMemberPermissionsSchema } from "@/lib/projects/acl/memberPermissions/ensureProjectMemberPermissionsSchema";
import {
  parseProjectMemberPermissions,
  parseProjectMemberPermissionsPatch,
  serializeProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/parseProjectMemberPermissions";
import type { ProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";
import { PROJECT_MEMBER_PERMISSION_KEYS } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

export type SetProjectMemberPermissionsResult =
  | {
      readonly ok: true;
      readonly permissions: ProjectMemberPermissions;
      readonly changed: boolean;
    }
  | {
      readonly ok: false;
      readonly code: "invalid_value" | "not_found" | "forbidden";
    };

/**
 * Owner-only: merge a partial change into the project's member permissions.
 * The UPDATE is scoped to owner_user_id, so a non-owner can never change it
 * even if a caller forgets the route check. A real change writes one Access
 * log row; a no-op write logs nothing.
 */
export const setProjectMemberPermissions = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly patch: unknown;
}): Promise<SetProjectMemberPermissionsResult> => {
  const patch = parseProjectMemberPermissionsPatch(input.patch);
  if (patch === null) return { ok: false, code: "invalid_value" };
  await ensureProjectMemberPermissionsSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT owner_user_id, member_permissions
      FROM user_projects
      WHERE id = ${input.projectId}::text
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) return { ok: false, code: "not_found" };
  if (String(row.owner_user_id) !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }
  const current = parseProjectMemberPermissions(row.member_permissions);
  const next = { ...current, ...patch };
  const changed = PROJECT_MEMBER_PERMISSION_KEYS.some(
    (key) => next[key] !== current[key],
  );
  if (!changed) return { ok: true, permissions: current, changed: false };
  const stored = JSON.stringify(serializeProjectMemberPermissions(next));
  const updated = asRowArray(
    await sql`
      UPDATE user_projects
      SET member_permissions = ${stored}::jsonb
      WHERE id = ${input.projectId}::text
        AND owner_user_id = ${input.actorUserId}::text
      RETURNING id
    `,
  );
  if (updated.length === 0) return { ok: false, code: "forbidden" };
  await writeProjectActivityEvent({
    projectId: input.projectId,
    type: "project.member_permissions_changed",
    actor: { kind: "owner", userId: input.actorUserId },
    detail: {},
  });
  return { ok: true, permissions: next, changed: true };
};
