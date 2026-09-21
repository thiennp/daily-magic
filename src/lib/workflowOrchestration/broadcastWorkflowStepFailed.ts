import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type WorkflowStepFailurePayload from "@/lib/workflowOrchestration/types/WorkflowStepFailurePayload.type";

export const broadcastWorkflowStepFailed = (
  runtime: AgentWitchHubRuntime,
  userId: string,
  workflowRunId: string,
  failure: WorkflowStepFailurePayload,
): void => {
  runtime.broadcastToDashboardUser(userId, {
    type: AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_STEP_FAILED,
    payload: {
      workflowRunId,
      ...failure,
    },
  });
};

export default broadcastWorkflowStepFailed;
