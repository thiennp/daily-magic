import { randomUUID } from "node:crypto";

import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { collectPriorHumanResponsesFromWorkflowRun } from "@/lib/workflowOrchestration/collectPriorHumanResponsesFromWorkflowRun";
import { buildWorkflowRunStepResponse } from "@/lib/workflowOrchestration/buildWorkflowRunStepResponse";
import { readDispatchErrorMessageFromAgentWitchMessage } from "@/lib/workflowOrchestration/readDispatchErrorMessageFromAgentWitchMessage";
import { renderOfficialWorkflowAgentPrompt } from "@/lib/workflowOrchestration/renderOfficialWorkflowAgentPrompt";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type { OfficialWorkflowAgentNode } from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";
import {
  completeWorkflowStepRun,
  updateWorkflowRunRecord,
  upsertWorkflowStepRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const runOfficialWorkflowAgentStep = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly run: WorkflowRunRecord;
  readonly definition: OfficialWorkflowDefinition;
  readonly agentNode: OfficialWorkflowAgentNode;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly dispatchBodyBase: Omit<AgentRunDispatchBody, "prompt">;
}): Promise<WorkflowRunStepResponse> => {
  const stepRunId = randomUUID();
  await upsertWorkflowStepRunRecord({
    id: stepRunId,
    workflowRunId: input.run.id,
    stepIndex: input.run.currentStepIndex,
    nodeId: input.agentNode.id,
    nodeKind: "agent",
    status: "running",
    title: input.agentNode.title,
    agentRunId: null,
    output: null,
  });

  const template = findCapabilityTemplateById(input.run.templateId);
  const workflowFields =
    template?.type === CapabilityType.WORKFLOW ? template.workflowFields : [];

  const prompt = renderOfficialWorkflowAgentPrompt({
    definition: input.definition,
    node: input.agentNode,
    stepIndex: input.run.currentStepIndex,
    totalSteps: input.definition.nodes.length,
    fields: workflowFields,
    fieldValues: input.run.fieldValues,
    priorHumanResponses: collectPriorHumanResponsesFromWorkflowRun(input.run),
  });

  const dispatchResult = await dispatchClaudeRunForDashboardUser({
    runtime: input.runtime,
    requesterUserId: input.requesterUserId,
    requesterEmail: input.requesterEmail,
    body: {
      ...input.dispatchBodyBase,
      prompt,
      capabilityId: input.run.capabilityId,
    },
  });

  if (!dispatchResult.ok) {
    const errorMessage = readDispatchErrorMessageFromAgentWitchMessage(
      dispatchResult.message,
    );
    await completeWorkflowStepRun(stepRunId, {
      status: "failed",
      output: { error: errorMessage },
    });
    await updateWorkflowRunRecord(input.run.id, {
      status: "failed",
      errorMessage,
    });
    return buildWorkflowRunStepResponse({
      ok: false,
      message: errorMessage,
    });
  }

  await upsertWorkflowStepRunRecord({
    id: stepRunId,
    workflowRunId: input.run.id,
    stepIndex: input.run.currentStepIndex,
    nodeId: input.agentNode.id,
    nodeKind: "agent",
    status: "running",
    title: input.agentNode.title,
    agentRunId: dispatchResult.run.id,
    output: null,
  });

  await updateWorkflowRunRecord(input.run.id, { status: "running" });

  return buildWorkflowRunStepResponse({
    ok: true,
    workflowRunId: input.run.id,
    currentStep: input.run.currentStepIndex,
    agentRunId: dispatchResult.run.id,
  });
};

export default runOfficialWorkflowAgentStep;
