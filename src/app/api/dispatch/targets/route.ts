import { listGroupsForMember } from "@/lib/auth/listGroupsForMember";
import { listGroupMemberships } from "@/lib/auth/groupMembershipQueries";
import { getUserById } from "@/lib/auth/userRepository";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { listPublishedSummariesForOwners } from "@/lib/capabilities/capabilityQueries";
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
      const [pairedUserIds, onlineUserIds, capabilitySummaries] =
        await Promise.all([
          listActivePairedUserIds(memberUserIds),
          Promise.resolve(listOnlineAgentUserIds(memberUserIds)),
          listPublishedSummariesForOwners(memberUserIds, group.id),
        ]);

      const members = await Promise.all(
        memberships
          .filter((membership) => membership.userId !== actor.id)
          .map(async (membership) => {
            const user = await getUserById(membership.userId);
            const capabilities = (
              await Promise.all(
                capabilitySummaries
                  .filter(
                    (capability) =>
                      capability.ownerUserId === membership.userId,
                  )
                  .map(async (capability) => {
                    const visible = await canViewPublishedCapability(
                      actor.id,
                      capability.ownerUserId,
                      capability.visibility,
                      group.id,
                    );
                    return visible ? capability : null;
                  }),
              )
            ).filter((capability) => capability !== null);

            return {
              userId: membership.userId,
              email: user?.email ?? membership.userId,
              name: user?.name ?? null,
              role: membership.role,
              isPaired: pairedUserIds.has(membership.userId),
              isOnline: onlineUserIds.has(membership.userId),
              capabilities,
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
