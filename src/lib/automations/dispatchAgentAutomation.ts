import { AGENT_AUTOMATION_LAST_RUN_STATUSES } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { getAgentAutomationById } from "@/lib/automations/agentAutomationQueries";
import { readAutomationFieldValidationErrors } from "@/lib/automations/buildAutomationDispatchPrompt";
import { completeWebhookAutomationDispatch } from "@/lib/automations/completeWebhookAutomationDispatch.util";
import { failAgentAutomationDispatch } from "@/lib/automations/failAgentAutomationDispatch.util";
import type DispatchAgentAutomationResult from "@/lib/automations/types/DispatchAgentAutomationResult.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";

export type { DispatchAgentAutomationResult };

export const dispatchAgentAutomation = async (input: {
  readonly automationId: string;
  readonly runtime: AgentWitchHubRuntime;
  readonly fieldValueOverrides?: Readonly<Record<string, string>>;
}): Promise<DispatchAgentAutomationResult> => {
  const automation = await getAgentAutomationById(input.automationId);

  if (automation === null) {
    throw new Error("Automation not found.");
  }

  if (automation.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE) {
    return failAgentAutomationDispatch({
      automation,
      status: AGENT_AUTOMATION_LAST_RUN_STATUSES.FAILED,
      errorMessage:
        "Scheduled automations run on this Mac. Open Automations and run locally.",
    });
  }

  if (!automation.enabled) {
    return failAgentAutomationDispatch({
      automation,
      status: AGENT_AUTOMATION_LAST_RUN_STATUSES.SKIPPED,
      errorMessage: "Automation is disabled.",
    });
  }

  const capability = await getPublishedCapabilityById(automation.capabilityId);

  if (capability === null) {
    return failAgentAutomationDispatch({
      automation,
      status: AGENT_AUTOMATION_LAST_RUN_STATUSES.FAILED,
      errorMessage: "Workflow is no longer available.",
    });
  }

  const fieldValues = {
    ...automation.fieldValues,
    ...input.fieldValueOverrides,
  };
  const validationErrors = readAutomationFieldValidationErrors(
    capability,
    fieldValues,
  );

  if (validationErrors.length > 0) {
    return failAgentAutomationDispatch({
      automation,
      status: AGENT_AUTOMATION_LAST_RUN_STATUSES.FAILED,
      errorMessage: validationErrors.join(" "),
    });
  }

  return completeWebhookAutomationDispatch({
    automation,
    capability,
    runtime: input.runtime,
    fieldValues,
  });
};
