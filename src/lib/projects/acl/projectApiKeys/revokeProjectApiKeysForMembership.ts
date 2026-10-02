import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getSql } from "@/lib/db";

/** Cascade revoke all project-scoped keys for a membership (A5). */
export const revokeProjectApiKeysForMembership = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
  readonly targetUserId: string;
}): Promise<number> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const result = await sql`
    UPDATE project_api_keys
    SET revoked_at = NOW()
    WHERE membership_id = ${input.membershipId}
      AND project_id = ${input.projectId}
      AND revoked_at IS NULL
  `;
  const count =
    typeof result === "object" &&
    result !== null &&
    "count" in result &&
    typeof (result as { count: unknown }).count === "number"
      ? (result as { count: number }).count
      : 0;
  if (count > 0) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      action: "key.revoke",
      targetUserId: input.targetUserId,
      detail: { membershipId: input.membershipId, count },
    });
  }
  return count;
};
