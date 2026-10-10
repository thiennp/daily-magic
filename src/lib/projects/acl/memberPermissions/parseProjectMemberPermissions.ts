import {
  ALL_MEMBER_PERMISSIONS_ALLOWED,
  PROJECT_MEMBER_PERMISSION_KEYS,
  type ProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

/** Stored JSON → full map. Only an explicit `false` denies; anything else allows. */
export const parseProjectMemberPermissions = (
  raw: unknown,
): ProjectMemberPermissions => {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return ALL_MEMBER_PERMISSIONS_ALLOWED;
  }
  const stored = raw as Record<string, unknown>;
  return PROJECT_MEMBER_PERMISSION_KEYS.reduce<ProjectMemberPermissions>(
    (acc, key) => ({ ...acc, [key]: stored[key] !== false }),
    ALL_MEMBER_PERMISSIONS_ALLOWED,
  );
};

/** Full map → what is stored: only the denied keys. */
export const serializeProjectMemberPermissions = (
  permissions: ProjectMemberPermissions,
): Readonly<Record<string, false>> =>
  Object.fromEntries(
    PROJECT_MEMBER_PERMISSION_KEYS.filter((key) => !permissions[key]).map(
      (key) => [key, false as const],
    ),
  );

/**
 * Request body → partial update, or null when it is not an object of known
 * keys with boolean values (an unknown key or a non-boolean is a bad request).
 */
export const parseProjectMemberPermissionsPatch = (
  raw: unknown,
): Partial<Record<keyof ProjectMemberPermissions, boolean>> | null => {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return null;
  }
  const entries = Object.entries(raw as Record<string, unknown>);
  const valid = entries.every(
    ([key, value]) =>
      (PROJECT_MEMBER_PERMISSION_KEYS as readonly string[]).includes(key) &&
      typeof value === "boolean",
  );
  return valid && entries.length > 0
    ? (Object.fromEntries(entries) as Partial<
        Record<keyof ProjectMemberPermissions, boolean>
      >)
    : null;
};
