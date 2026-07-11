import type { GroupRoleValue } from "@/lib/auth/roles";

export default interface GroupMembershipRecord {
  readonly id: string;
  readonly groupId: string;
  readonly userId: string;
  readonly role: GroupRoleValue;
  readonly createdAt: string;
}
