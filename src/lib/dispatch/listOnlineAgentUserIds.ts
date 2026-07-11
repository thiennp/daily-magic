import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";

export const listOnlineAgentUserIds = (
  userIds: readonly string[],
): ReadonlySet<string> => {
  const hub = getAgentWitchHub();
  const onlineIds = new Set<string>();

  for (const userId of userIds) {
    if (hub.findAgentClientForUser(userId) !== undefined) {
      onlineIds.add(userId);
    }
  }

  return onlineIds;
};
