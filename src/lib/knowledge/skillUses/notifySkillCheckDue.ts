import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/** Ask the project owner's online computers to judge the skill checks now due. Never throws. */
export const notifySkillCheckDue = async (projectId: string): Promise<void> => {
  try {
    const project = await getUserProjectById(projectId);
    if (project === null) return;
    for (const client of getAgentWitchHub().listAgentClients()) {
      if (client.userId === project.ownerUserId) {
        client.send({
          type: AGENT_WITCH_MESSAGE_TYPES.SKILLCHECK_REQUEST,
          payload: { projectId },
        });
      }
    }
  } catch {
    // the check stays due; the next scan or request picks it up
  }
};
