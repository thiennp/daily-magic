import { GlobalRole } from "@/lib/auth/roles";
import type AuthActor from "@/lib/auth/types/AuthActor.type";
import type UserRecord from "@/lib/auth/types/UserRecord.type";

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

export function canDeleteUser(actor: AuthActor, target: UserRecord): boolean {
  if (!isGlobalAdmin(actor)) {
    return false;
  }

  return actor.id !== target.id;
}
