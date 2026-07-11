import type { GlobalRoleValue, GroupRoleValue } from "@/lib/auth/roles";
import { GlobalRole, GroupRole } from "@/lib/auth/roles";
import type UserRecord from "@/lib/auth/types/UserRecord.type";

export interface AuthActor {
  readonly id: string;
  readonly email: string;
  readonly globalRole: GlobalRoleValue;
}

export interface GroupMembershipContext {
  readonly groupId: string;
  readonly userId: string;
  readonly role: GroupRoleValue;
}

export function isSuperAdmin(actor: AuthActor): boolean {
  return actor.globalRole === GlobalRole.SUPER_ADMIN;
}

export function isGlobalAdmin(actor: AuthActor): boolean {
  return (
    actor.globalRole === GlobalRole.SUPER_ADMIN ||
    actor.globalRole === GlobalRole.ADMIN
  );
}

export function canManageAllGroups(actor: AuthActor): boolean {
  return isGlobalAdmin(actor);
}

export function canManageAllUsers(actor: AuthActor): boolean {
  return isGlobalAdmin(actor);
}

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

export function canDeleteUser(actor: AuthActor, target: UserRecord): boolean {
  if (!isGlobalAdmin(actor)) {
    return false;
  }

  return actor.id !== target.id;
}
