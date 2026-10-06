import type { ProjectOwnerDeviceLookup } from "@/lib/projects/acl/types/ProjectOwnerDeviceLookup.type";
import { asRowArray, getSql } from "@/lib/db";

/** Default DB adapter for the owner-device port (user_projects.device_id). */
export const isLiveProjectOwnerDevice: ProjectOwnerDeviceLookup = async (
  input,
) => {
  const rows = asRowArray(
    await getSql()`
      SELECT p.id
      FROM user_projects AS p
      JOIN agent_witch_devices AS d ON d.id = p.device_id
      WHERE p.id = ${input.projectId}
        AND p.device_id = ${input.deviceId}
        AND d.user_id = p.owner_user_id
        AND d.revoked_at IS NULL
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
