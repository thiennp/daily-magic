import { useSession } from "next-auth/react";

import type { MemberItem } from "@/features/admin/types/groupManagement.types";
import { GroupRole, isPrivilegedGlobalRole } from "@/lib/auth/roles";

export function useGroupActorAccess(members: readonly MemberItem[]) {
  const { data: session } = useSession();
  const actorUserId =
    session?.user && "id" in session.user && typeof session.user.id === "string"
      ? session.user.id
      : null;
  const actorMembership = members.find(
    (member) => member.membership.userId === actorUserId,
  )?.membership;
  const isGlobalAdmin = Boolean(
    session?.user?.globalRole &&
    isPrivilegedGlobalRole(session.user.globalRole),
  );
  const canDeleteTeam =
    isGlobalAdmin || actorMembership?.role === GroupRole.GROUP_SUPER_ADMIN;
  const canConfigureDispatchPolicy =
    canDeleteTeam || actorMembership?.role === GroupRole.GROUP_ADMIN;

  return {
    actorUserId,
    actorMembership,
    canDeleteTeam,
    canConfigureDispatchPolicy,
  };
}
