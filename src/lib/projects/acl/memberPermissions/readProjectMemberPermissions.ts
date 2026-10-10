import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectMemberPermissionsSchema } from "@/lib/projects/acl/memberPermissions/ensureProjectMemberPermissionsSchema";
import { parseProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/parseProjectMemberPermissions";
import {
  NO_MEMBER_PERMISSIONS,
  type ProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

/**
 * What members may do in this project. A project nobody changed allows
 * everything; a missing project or a read error denies (fail closed).
 */
export const readProjectMemberPermissions = async (
  projectId: string,
): Promise<ProjectMemberPermissions> => {
  try {
    await ensureProjectMemberPermissionsSchema();
    const rows = asRowArray(
      await getSql()`
        SELECT member_permissions
        FROM user_projects
        WHERE id = ${projectId}::text
        LIMIT 1
      `,
    );
    return rows[0] === undefined
      ? NO_MEMBER_PERMISSIONS
      : parseProjectMemberPermissions(rows[0].member_permissions);
  } catch {
    return NO_MEMBER_PERMISSIONS;
  }
};
