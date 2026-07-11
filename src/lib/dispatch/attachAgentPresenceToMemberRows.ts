import { listActivePairedUserIds } from "@/lib/dispatch/listActivePairedUserIds";
import { listOnlineAgentUserIds } from "@/lib/dispatch/listOnlineAgentUserIds";

export interface MemberAgentPresence {
  readonly isOnline: boolean;
  readonly isPaired: boolean;
}

export async function buildMemberAgentPresenceByUserId(
  userIds: readonly string[],
): Promise<ReadonlyMap<string, MemberAgentPresence>> {
  const [pairedUserIds, onlineUserIds] = await Promise.all([
    listActivePairedUserIds(userIds),
    Promise.resolve(listOnlineAgentUserIds(userIds)),
  ]);

  const presenceByUserId = new Map<string, MemberAgentPresence>();

  for (const userId of userIds) {
    presenceByUserId.set(userId, {
      isPaired: pairedUserIds.has(userId),
      isOnline: onlineUserIds.has(userId),
    });
  }

  return presenceByUserId;
}

export const attachAgentPresenceToMemberRows = async <
  T extends { readonly membership: { readonly userId: string } },
>(
  members: readonly T[],
): Promise<
  readonly (T & {
    readonly presence: MemberAgentPresence;
  })[]
> => {
  const userIds = members.map((member) => member.membership.userId);
  const presenceByUserId = await buildMemberAgentPresenceByUserId(userIds);

  return members.map((member) => ({
    ...member,
    presence: presenceByUserId.get(member.membership.userId) ?? {
      isPaired: false,
      isOnline: false,
    },
  }));
};
