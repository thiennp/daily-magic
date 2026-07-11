import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import { GroupRole } from "@/lib/auth/roles";
import type AuthActor from "@/lib/auth/types/AuthActor.type";
import type GroupMembershipRecord from "@/lib/auth/types/GroupMembershipRecord.type";

export const canConfigureGroupDispatchPolicy = (
  actor: AuthActor,
  membership: GroupMembershipRecord | null,
): boolean => {
  if (isGlobalAdmin(actor)) {
    return true;
  }

  if (membership === null) {
    return false;
  }

  return (
    membership.role === GroupRole.GROUP_SUPER_ADMIN ||
    membership.role === GroupRole.GROUP_ADMIN
  );
};
