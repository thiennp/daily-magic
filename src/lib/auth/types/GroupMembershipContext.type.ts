import type { GroupRoleValue } from "@/lib/auth/roles";

export default interface GroupMembershipContext {
  readonly groupId: string;
  readonly userId: string;
  readonly role: GroupRoleValue;
}
