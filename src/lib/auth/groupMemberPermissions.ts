import { GroupRole } from "@/lib/auth/roles";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import type AuthActor from "@/lib/auth/types/AuthActor.type";
import type GroupMembershipContext from "@/lib/auth/types/GroupMembershipContext.type";
import type { GroupRoleValue } from "@/lib/auth/roles";

export function canManageGroupMembers(
  actor: AuthActor,
  membership: GroupMembershipContext | null,
): boolean {
  if (isGlobalAdmin(actor)) {
    return true;
  }

  if (!membership) {
    return false;
  }

  return (
    membership.role === GroupRole.GROUP_SUPER_ADMIN ||
    membership.role === GroupRole.GROUP_ADMIN
  );
}

export function canChangeMemberRole(
  actor: AuthActor,
  actorMembership: GroupMembershipContext | null,
  targetMembership: GroupMembershipContext,
  nextRole: GroupRoleValue,
): boolean {
  if (isGlobalAdmin(actor)) {
    return true;
  }

  if (!actorMembership) {
    return false;
  }

  if (
    actorMembership.role !== GroupRole.GROUP_SUPER_ADMIN &&
    actorMembership.role !== GroupRole.GROUP_ADMIN
  ) {
    return false;
  }

  if (targetMembership.userId === actor.id) {
    return false;
  }

  if (targetMembership.role === GroupRole.GROUP_SUPER_ADMIN) {
    return false;
  }

  if (
    targetMembership.role === GroupRole.GROUP_ADMIN &&
    actorMembership.role === GroupRole.GROUP_ADMIN
  ) {
    return false;
  }

  if (nextRole === GroupRole.GROUP_SUPER_ADMIN) {
    return (
      actorMembership.role === GroupRole.GROUP_SUPER_ADMIN ||
      isGlobalAdmin(actor)
    );
  }

  return true;
}

export function canRemoveMember(
  actor: AuthActor,
  actorMembership: GroupMembershipContext | null,
  targetMembership: GroupMembershipContext,
): boolean {
  if (isGlobalAdmin(actor)) {
    return true;
  }

  if (!actorMembership) {
    return false;
  }

  if (
    actorMembership.role !== GroupRole.GROUP_SUPER_ADMIN &&
    actorMembership.role !== GroupRole.GROUP_ADMIN
  ) {
    return false;
  }

  if (targetMembership.userId === actor.id) {
    return false;
  }

  if (targetMembership.role === GroupRole.GROUP_SUPER_ADMIN) {
    return false;
  }

  if (
    targetMembership.role === GroupRole.GROUP_ADMIN &&
    actorMembership.role === GroupRole.GROUP_ADMIN
  ) {
    return false;
  }

  return true;
}
