import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { broadcastWorkflowStepFailed } from "@/lib/workflowOrchestration/broadcastWorkflowStepFailed";
import { continueOfficialWorkflowRun } from "@/lib/workflowOrchestration/continueOfficialWorkflowRun";
import { buildAgentStepOutputPreview } from "@/lib/workflowOrchestration/buildAgentStepOutputPreview";
import { readWorkflowLabelFromRun } from "@/lib/workflowOrchestration/readWorkflowLabelFromRun";
import {
  completeWorkflowStepRun,
  getWorkflowRunById,
  getWorkflowStepRunByAgentRunId,
  updateWorkflowRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const advanceOfficialWorkflowRunAfterAgentRun = async (
  runtime: AgentWitchHubRuntime,
  agentRunId: string,
  exitCode: number,
  output: string,
): Promise<void> => {
  const step = await getWorkflowStepRunByAgentRunId(agentRunId);
  if (step === null) {
    return;
  }

  const run = await getWorkflowRunById(step.workflowRunId);
  if (run === null) {
    return;
  }

  if (exitCode !== 0) {
    const errorMessage = `Agent step failed with exit code ${exitCode}.`;
    await completeWorkflowStepRun(step.id, {
      status: "failed",
      output: { exitCode, outputPreview: buildAgentStepOutputPreview(output) },
    });
    // Keep currentStepIndex so the operator can retry this same step.
    await updateWorkflowRunRecord(run.id, {
      status: "failed",
      errorMessage,
    });
    const workflowLabel = readWorkflowLabelFromRun(run);
    broadcastWorkflowStepFailed(runtime, run.requesterUserId, run.id, {
      stepRunId: step.id,
      stepIndex: step.stepIndex,
      title: step.title,
      errorMessage,
      ...(workflowLabel !== undefined ? { workflowLabel } : {}),
    });
    return;
  }

  const outputPreview = buildAgentStepOutputPreview(output);

  await completeWorkflowStepRun(step.id, {
    status: "completed",
    output: { exitCode, outputPreview },
  });

  const nextIndex = run.currentStepIndex + 1;
  await updateWorkflowRunRecord(run.id, {
    currentStepIndex: nextIndex,
    status: "running",
    stepOutputs: {
      ...run.stepOutputs,
      [step.nodeId]: { outputPreview },
    },
  });

  await continueOfficialWorkflowRun({
    runtime,
    workflowRunId: run.id,
    requesterUserId: run.requesterUserId,
    dispatchBodyBase: {
      writerAgent: "claude-cli",
      capabilityId: run.capabilityId,
      targetDeviceId: run.deviceId ?? undefined,
    },
  });
};

export default advanceOfficialWorkflowRunAfterAgentRun;
