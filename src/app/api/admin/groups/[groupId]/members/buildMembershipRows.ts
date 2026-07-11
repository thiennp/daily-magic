import type GroupMembershipContext from "@/lib/auth/types/GroupMembershipContext.type";
import {
  getMembershipForUserInGroup,
  listGroupMemberships,
} from "@/lib/auth/groupMembershipQueries";
import { getUserById } from "@/lib/auth/userRepository";

interface MembershipResponseRow {
  readonly membership: Awaited<ReturnType<typeof listGroupMemberships>>[number];
  readonly user: Awaited<ReturnType<typeof getUserById>>;
}

export async function buildMembershipRows(
  groupId: string,
): Promise<readonly MembershipResponseRow[]> {
  const memberships = await listGroupMemberships(groupId);
  const rows = await Promise.all(
    memberships.map(async (membership) => ({
      membership,
      user: await getUserById(membership.userId),
    })),
  );

  return rows;
}

export async function getActorMembershipContext(
  groupId: string,
  actorId: string,
): Promise<GroupMembershipContext | null> {
  const actorMembership = await getMembershipForUserInGroup(groupId, actorId);

  if (!actorMembership) {
    return null;
  }

  return {
    groupId: actorMembership.groupId,
    userId: actorMembership.userId,
    role: actorMembership.role,
  };
}
