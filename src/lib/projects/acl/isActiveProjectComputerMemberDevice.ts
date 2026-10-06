import { ensureProjectComputerMembershipSchema } from "@/lib/projects/acl/ensureProjectComputerMembershipSchema";
import type { ProjectComputerMemberLookup } from "@/lib/projects/acl/types/ProjectComputerMemberLookup.type";
import { asRowArray, getSql } from "@/lib/db";

/** Default DB adapter for the computer-member port (mig 068 seats). */
export const isActiveProjectComputerMemberDevice: ProjectComputerMemberLookup =
  async (input) => {
    await ensureProjectComputerMembershipSchema();
    const rows = asRowArray(
      await getSql()`
        SELECT m.id
        FROM project_memberships AS m
        JOIN agent_witch_devices AS d ON d.id = m.device_id
        WHERE m.project_id = ${input.projectId}
          AND m.device_id = ${input.deviceId}
          AND m.member_kind = 'computer'
          AND m.status = 'active'
          AND d.revoked_at IS NULL
        LIMIT 1
      `,
    );
    return rows.length > 0;
  };
