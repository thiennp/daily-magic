import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { buildWorkflowRunStepResponse } from "@/lib/workflowOrchestration/buildWorkflowRunStepResponse";
import { parseOfficialWorkflowDefinitionSnapshot } from "@/lib/workflowOrchestration/parseOfficialWorkflowDefinitionSnapshot";
import { runOfficialWorkflowAgentStep } from "@/lib/workflowOrchestration/runOfficialWorkflowAgentStep";
import { runOfficialWorkflowHumanStep } from "@/lib/workflowOrchestration/runOfficialWorkflowHumanStep";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";
import {
  getWorkflowRunById,
  updateWorkflowRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const continueOfficialWorkflowRun = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly workflowRunId: string;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly dispatchBodyBase: Omit<AgentRunDispatchBody, "prompt">;
}): Promise<WorkflowRunStepResponse> => {
  const run = await getWorkflowRunById(input.workflowRunId);
  if (run === null || run.requesterUserId !== input.requesterUserId) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "Workflow run not found.",
    });
  }

  if (run.status === "completed" || run.status === "failed") {
    return buildWorkflowRunStepResponse({
      ok: true,
      workflowRunId: run.id,
      currentStep: run.currentStepIndex,
      message: `Workflow ${run.status}.`,
    });
  }

  const definition = parseOfficialWorkflowDefinitionSnapshot(
    run.definitionSnapshot,
  );
  if (definition === null) {
    await updateWorkflowRunRecord(run.id, {
      status: "failed",
      errorMessage: "Invalid workflow definition snapshot.",
    });
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "Invalid workflow definition.",
    });
  }

  const node = definition.nodes[run.currentStepIndex];
  if (node === undefined) {
    await updateWorkflowRunRecord(run.id, {
      status: "completed",
      completedAt: new Date().toISOString(),
    });
    return buildWorkflowRunStepResponse({
      ok: true,
      workflowRunId: run.id,
      currentStep: run.currentStepIndex,
    });
  }

  if (node.kind === "human") {
    return runOfficialWorkflowHumanStep({
      runtime: input.runtime,
      run,
      humanNode: node,
      requesterUserId: input.requesterUserId,
    });
  }

  return runOfficialWorkflowAgentStep({
    runtime: input.runtime,
    run,
    definition,
    agentNode: node,
    requesterUserId: input.requesterUserId,
    requesterEmail: input.requesterEmail,
    dispatchBodyBase: input.dispatchBodyBase,
  });
};

export default continueOfficialWorkflowRun;
