import { GroupRole } from "@/lib/auth/roles";

export interface GroupItem {
  readonly id: string;
  readonly name: string;
}

export interface MemberItem {
  readonly membership: {
    readonly id: string;
    readonly role: string;
    readonly userId: string;
  };
  readonly user: {
    readonly id: string;
    readonly email: string;
    readonly name: string | null;
  } | null;
}

export const GROUP_ROLE_OPTIONS = [
  GroupRole.USER,
  GroupRole.GROUP_ADMIN,
  GroupRole.GROUP_SUPER_ADMIN,
] as const;
