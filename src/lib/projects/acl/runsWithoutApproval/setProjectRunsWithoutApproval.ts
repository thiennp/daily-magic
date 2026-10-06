import { asRowArray, getSql } from "@/lib/db";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { ensureProjectRunsWithoutApprovalSchema } from "@/lib/projects/acl/runsWithoutApproval/ensureProjectRunsWithoutApprovalSchema";

export type SetProjectRunsWithoutApprovalResult =
  | {
      readonly ok: true;
      readonly allowRunsWithoutApproval: boolean;
      readonly changed: boolean;
    }
  | {
      readonly ok: false;
      readonly code: "invalid_value" | "not_found" | "forbidden";
    };

/**
 * S0-2: owner-only switch for "Allow runs without approval" (per project).
 * The UPDATE itself is scoped to owner_user_id, so a non-owner can never
 * change it even if a caller forgets the route check. Every real change
 * writes one Access log row; a no-op write logs nothing.
 */
export const setProjectRunsWithoutApproval = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly allowRunsWithoutApproval: unknown;
}): Promise<SetProjectRunsWithoutApprovalResult> => {
  if (typeof input.allowRunsWithoutApproval !== "boolean") {
    return { ok: false, code: "invalid_value" };
  }
  const next = input.allowRunsWithoutApproval;
  await ensureProjectRunsWithoutApprovalSchema();
  const sql = getSql();
  const updated = asRowArray(
    await sql`
      UPDATE user_projects
      SET allow_runs_without_approval = ${next}::boolean
      WHERE id = ${input.projectId}::text
        AND owner_user_id = ${input.actorUserId}::text
        AND allow_runs_without_approval IS DISTINCT FROM ${next}::boolean
      RETURNING id
    `,
  );
  if (updated.length > 0) {
    await writeProjectActivityEvent({
      projectId: input.projectId,
      type: next
        ? "project.runs_without_approval_enabled"
        : "project.runs_without_approval_disabled",
      actor: { kind: "owner", userId: input.actorUserId },
      detail: {},
    });
    return { ok: true, allowRunsWithoutApproval: next, changed: true };
  }
  const rows = asRowArray(
    await sql`
      SELECT owner_user_id, allow_runs_without_approval
      FROM user_projects
      WHERE id = ${input.projectId}::text
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return { ok: false, code: "not_found" };
  }
  if (String(row.owner_user_id) !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }
  return {
    ok: true,
    allowRunsWithoutApproval: row.allow_runs_without_approval === true,
    changed: false,
  };
};
