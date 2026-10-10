import type {
  ProjectMemberPermissionKey,
  ProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

export type ProjectPermissionActorRole = "owner" | "member" | "viewer" | "none";

/** The owner can always; a member only when the owner left it on; others never. */
export const decideProjectMemberPermission = (input: {
  readonly role: ProjectPermissionActorRole;
  readonly permissions: ProjectMemberPermissions;
  readonly key: ProjectMemberPermissionKey;
}): boolean =>
  input.role === "owner" ||
  (input.role === "member" && input.permissions[input.key]);
