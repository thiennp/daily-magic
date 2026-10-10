/**
 * What the owner lets project members do. Members may do everything the owner
 * can unless the owner turned it off, so a missing key means "allowed" and
 * only the denied keys are stored (user_projects.member_permissions).
 * Owner-only actions (delete project, rename, approve access, manage members,
 * change these permissions) are not configurable and never listed here.
 */
export const PROJECT_MEMBER_PERMISSION_KEYS = [
  "skill.publish",
  "skill.delete",
  "autoSkill.manage",
] as const;

export type ProjectMemberPermissionKey =
  (typeof PROJECT_MEMBER_PERMISSION_KEYS)[number];

export type ProjectMemberPermissions = Readonly<
  Record<ProjectMemberPermissionKey, boolean>
>;

export const ALL_MEMBER_PERMISSIONS_ALLOWED: ProjectMemberPermissions = {
  "skill.publish": true,
  "skill.delete": true,
  "autoSkill.manage": true,
};

export const NO_MEMBER_PERMISSIONS: ProjectMemberPermissions = {
  "skill.publish": false,
  "skill.delete": false,
  "autoSkill.manage": false,
};

export const isProjectMemberPermissionKey = (
  value: unknown,
): value is ProjectMemberPermissionKey =>
  typeof value === "string" &&
  (PROJECT_MEMBER_PERMISSION_KEYS as readonly string[]).includes(value);
