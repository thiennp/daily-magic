import { clearStickyOnMembershipLeave } from "@/lib/projects/acl/composer/clearStickyOnMembershipLeave";
import { ensureProjectComputerMembershipSchema } from "@/lib/projects/acl/ensureProjectComputerMembershipSchema";
import { asRowArray, getSql } from "@/lib/db";

/** Revoke active computer seats for a device (optionally scoped to one project). */
export const revokeProjectComputerMembershipsForDevice = async (input: {
  readonly deviceId: string;
  readonly projectId?: string;
}): Promise<readonly string[]> => {
  await ensureProjectComputerMembershipSchema();
  const sql = getSql();
  const rows =
    input.projectId !== undefined
      ? asRowArray(
          await sql`
            UPDATE project_memberships
            SET status = 'revoked', revoked_at = NOW()
            WHERE device_id = ${input.deviceId}
              AND project_id = ${input.projectId}
              AND member_kind = 'computer'
              AND status = 'active'
            RETURNING id, project_id, project_display_name
          `,
        )
      : asRowArray(
          await sql`
            UPDATE project_memberships
            SET status = 'revoked', revoked_at = NOW()
            WHERE device_id = ${input.deviceId}
              AND member_kind = 'computer'
              AND status = 'active'
            RETURNING id, project_id, project_display_name
          `,
        );
  const ids: string[] = [];
  for (const row of rows) {
    const id = typeof row.id === "string" ? row.id : null;
    const projectId = typeof row.project_id === "string" ? row.project_id : null;
    if (id === null || projectId === null) continue;
    ids.push(id);
    await clearStickyOnMembershipLeave({
      projectId,
      membershipId: id,
      displayName:
        typeof row.project_display_name === "string"
          ? row.project_display_name
          : null,
    });
  }
  return ids;
};
