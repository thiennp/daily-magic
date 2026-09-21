import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { buildWorkflowFieldValidationErrors } from "@/lib/workflows/buildWorkflowPrompt";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";
import { continueOfficialWorkflowRun } from "@/lib/workflowOrchestration/continueOfficialWorkflowRun";
import { buildWorkflowRunStepResponse } from "@/lib/workflowOrchestration/buildWorkflowRunStepResponse";
import { resolveTemplateIdFromHarnessSetSlug } from "@/lib/workflowOrchestration/resolveTemplateIdFromHarnessSetSlug";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { createWorkflowRunRecord } from "@/lib/workflowOrchestration/createWorkflowRunRecord";

export const startOfficialWorkflowRun = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly capabilityId: string;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly dispatchBodyBase: Omit<
    AgentRunDispatchBody,
    "prompt" | "capabilityId"
  >;
}): Promise<WorkflowRunStepResponse> => {
  const capability = await getPublishedCapabilityById(input.capabilityId);
  if (
    capability === null ||
    capability.status !== CapabilityStatus.PUBLISHED ||
    capability.ownerUserId !== input.requesterUserId ||
    capability.type !== CapabilityType.WORKFLOW
  ) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "Workflow capability not found.",
    });
  }

  const templateId = resolveTemplateIdFromHarnessSetSlug(
    capability.harnessSetSlug,
  );
  if (templateId === null) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "This workflow is not an official orchestrated preset.",
    });
  }

  const definition = findOfficialWorkflowDefinitionByTemplateId(templateId);
  if (definition === null) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "Workflow definition missing.",
    });
  }

  const template = findCapabilityTemplateById(templateId);
  const workflowFields =
    template?.type === CapabilityType.WORKFLOW ? template.workflowFields : [];
  const fieldErrors = buildWorkflowFieldValidationErrors(
    workflowFields,
    input.fieldValues,
  );
  if (Object.keys(fieldErrors).length > 0) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: Object.values(fieldErrors).join(" "),
    });
  }

  const run = await createWorkflowRunRecord({
    requesterUserId: input.requesterUserId,
    executorUserId: input.requesterUserId,
    deviceId: input.dispatchBodyBase.targetDeviceId ?? null,
    capabilityId: capability.id,
    templateId,
    fieldValues: input.fieldValues,
    definitionSnapshot: definition as unknown as Record<string, unknown>,
    orchestrationVersion: definition.version,
  });

  return continueOfficialWorkflowRun({
    runtime: input.runtime,
    workflowRunId: run.id,
    requesterUserId: input.requesterUserId,
    requesterEmail: input.requesterEmail,
    dispatchBodyBase: {
      ...input.dispatchBodyBase,
      capabilityId: capability.id,
    },
  });
};

export default startOfficialWorkflowRun;
