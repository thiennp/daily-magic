import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { isInviteStillUsable } from "@/features/projects/access/invites/inviteListStatus";

export const partitionInvitesByStatus = (
  invites: readonly AwcProjectAccessInvite[],
  nowMs: number,
): {
  readonly active: readonly AwcProjectAccessInvite[];
  readonly inactive: readonly AwcProjectAccessInvite[];
} => {
  const active: AwcProjectAccessInvite[] = [];
  const inactive: AwcProjectAccessInvite[] = [];
  for (const invite of invites) {
    if (isInviteStillUsable(invite, nowMs)) {
      active.push(invite);
    } else {
      inactive.push(invite);
    }
  }
  return { active, inactive };
};
