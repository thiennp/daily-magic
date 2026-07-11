import { listGroupsForMember } from "@/lib/auth/listGroupsForMember";
import { listGroupMemberships } from "@/lib/auth/groupMembershipQueries";
import { getUserById } from "@/lib/auth/userRepository";
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
