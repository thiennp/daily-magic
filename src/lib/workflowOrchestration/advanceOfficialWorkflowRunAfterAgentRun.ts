import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { continueOfficialWorkflowRun } from "@/lib/workflowOrchestration/continueOfficialWorkflowRun";
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
    await completeWorkflowStepRun(step.id, {
      status: "failed",
      output: { exitCode, output },
    });
    await updateWorkflowRunRecord(run.id, {
      status: "failed",
      errorMessage: `Agent step failed with exit code ${exitCode}.`,
    });
    return;
  }

  await completeWorkflowStepRun(step.id, {
    status: "completed",
    output: { exitCode, outputPreview: output.slice(0, 4000) },
  });

  const nextIndex = run.currentStepIndex + 1;
  await updateWorkflowRunRecord(run.id, {
    currentStepIndex: nextIndex,
    status: "running",
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
