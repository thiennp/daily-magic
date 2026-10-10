import {
  decideProjectMemberPermission,
  type ProjectPermissionActorRole,
} from "@/lib/projects/acl/memberPermissions/decideProjectMemberPermission";
import type { ProjectMemberPermissionKey } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";
import { readProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/readProjectMemberPermissions";

/** One check for a configurable action: owner always, member when allowed. Reads permissions only for members. */
export const authorizeProjectMemberPermission = async (input: {
  readonly projectId: string;
  readonly role: ProjectPermissionActorRole;
  readonly key: ProjectMemberPermissionKey;
}): Promise<boolean> =>
  input.role === "owner"
    ? true
    : input.role !== "member"
      ? false
      : decideProjectMemberPermission({
          role: input.role,
          key: input.key,
          permissions: await readProjectMemberPermissions(input.projectId),
        });
