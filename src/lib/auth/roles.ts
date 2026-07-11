export const GlobalRole = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
} as const;

export type GlobalRoleValue = (typeof GlobalRole)[keyof typeof GlobalRole];

export const GroupRole = {
  GROUP_SUPER_ADMIN: "group_super_admin",
  GROUP_ADMIN: "group_admin",
  USER: "user",
} as const;

export type GroupRoleValue = (typeof GroupRole)[keyof typeof GroupRole];

export const GROUP_ROLE_VALUES: readonly GroupRoleValue[] = [
  GroupRole.GROUP_SUPER_ADMIN,
  GroupRole.GROUP_ADMIN,
  GroupRole.USER,
];

export function isGlobalRole(value: string): value is GlobalRoleValue {
  return (
    value === GlobalRole.SUPER_ADMIN ||
    value === GlobalRole.ADMIN ||
    value === GlobalRole.USER
  );
}

export function isPrivilegedGlobalRole(value: GlobalRoleValue): boolean {
  return value === GlobalRole.SUPER_ADMIN || value === GlobalRole.ADMIN;
}

export function isGroupRole(value: string): value is GroupRoleValue {
  return GROUP_ROLE_VALUES.includes(value as GroupRoleValue);
}
