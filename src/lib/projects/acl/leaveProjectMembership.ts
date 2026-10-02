import { applyLeaveProjectMembershipSideEffects } from "@/lib/projects/acl/applyLeaveProjectMembershipSideEffects";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type LeaveProjectMembershipResult from "@/lib/projects/acl/types/LeaveProjectMembershipResult.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type { default as LeaveProjectMembershipResult } from "@/lib/projects/acl/types/LeaveProjectMembershipResult.type";

/**
 * Self-disconnect: an active (or naming_required) member leaves the project.
 * Actor must be the member themselves — not elevation, not owner revoke of others.
 * Owners have no membership row and cannot leave via this path.
 */
export const leaveProjectMembership = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<LeaveProjectMembershipResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId === input.actorUserId) {
    return { ok: false, code: "owner" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();

  const existingRows = asRowArray(
    await sql`
      SELECT *
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND user_id = ${input.actorUserId}
        AND role = 'member'
      ORDER BY created_at DESC
      LIMIT 1
    `,
  );
  if (existingRows.length === 0) {
    return { ok: false, code: "not_active" };
  }
  const existing = mapProjectMembershipRow(existingRows[0]);
  if (existing.status === "revoked") {
    return {
      ok: true,
      status: "revoked",
      membership: existing,
      alreadyLeft: true,
    };
  }
  if (
    existing.status !== "active" &&
    existing.status !== "naming_required"
  ) {
    return { ok: false, code: "not_active" };
  }

  const rows = asRowArray(
    await sql`
      UPDATE project_memberships
      SET status = 'revoked', revoked_at = NOW()
      WHERE id = ${existing.id}
        AND project_id = ${input.projectId}
        AND user_id = ${input.actorUserId}
        AND status IN ('active', 'naming_required')
        AND role = 'member'
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_active" };
  }
  const membership = mapProjectMembershipRow(rows[0]);
  // Membership is already revoked — side-effect failures must not turn success into HTTP 500.
  try {
    await applyLeaveProjectMembershipSideEffects({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      membership,
    });
  } catch (error) {
    console.error("leave_project side effects failed after revoke", {
      projectId: input.projectId,
      membershipId: membership.id,
      error,
    });
  }
  return { ok: true, status: "revoked", membership };
};
