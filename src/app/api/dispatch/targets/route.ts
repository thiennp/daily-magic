import { listGroupsForMember } from "@/lib/auth/listGroupsForMember";
import { listGroupMemberships } from "@/lib/auth/groupMembershipQueries";
import { getUserById } from "@/lib/auth/userRepository";
import { listActivePairedUserIds } from "@/lib/dispatch/listActivePairedUserIds";
import { listOnlineAgentUserIds } from "@/lib/dispatch/listOnlineAgentUserIds";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const groups = await listGroupsForMember(actor.id);
  const targets = await Promise.all(
    groups.map(async (group) => {
      const memberships = await listGroupMemberships(group.id);
      const memberUserIds = memberships
        .filter((membership) => membership.userId !== actor.id)
        .map((membership) => membership.userId);
      const [pairedUserIds, onlineUserIds] = await Promise.all([
        listActivePairedUserIds(memberUserIds),
        Promise.resolve(listOnlineAgentUserIds(memberUserIds)),
      ]);

      const members = await Promise.all(
        memberships
          .filter((membership) => membership.userId !== actor.id)
          .map(async (membership) => {
            const user = await getUserById(membership.userId);
            return {
              userId: membership.userId,
              email: user?.email ?? membership.userId,
              name: user?.name ?? null,
              role: membership.role,
              isPaired: pairedUserIds.has(membership.userId),
              isOnline: onlineUserIds.has(membership.userId),
            };
          }),
      );

      return {
        groupId: group.id,
        groupName: group.name,
        dispatchPolicy: group.dispatchPolicy,
        members,
      };
    }),
  );

  return Response.json({ ok: true, groups: targets });
}
