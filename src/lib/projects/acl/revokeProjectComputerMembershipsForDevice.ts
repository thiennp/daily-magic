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
            RETURNING id
          `,
        )
      : asRowArray(
          await sql`
            UPDATE project_memberships
            SET status = 'revoked', revoked_at = NOW()
            WHERE device_id = ${input.deviceId}
              AND member_kind = 'computer'
              AND status = 'active'
            RETURNING id
          `,
        );
  return rows
    .map((row) => row.id)
    .filter((id): id is string => typeof id === "string" && id.length > 0);
};
