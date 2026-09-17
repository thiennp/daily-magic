import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type WorkflowHumanStepPayload from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";

export const broadcastWorkflowHumanStepRequired = (
  runtime: AgentWitchHubRuntime,
  userId: string,
  workflowRunId: string,
  humanStep: WorkflowHumanStepPayload,
): void => {
  runtime.broadcastToDashboardUser(userId, {
    type: AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_HUMAN_STEP_REQUIRED,
    payload: {
      workflowRunId,
      ...humanStep,
    },
  });
};

export default broadcastWorkflowHumanStepRequired;
