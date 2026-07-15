import { AGENT_AUTOMATION_LAST_RUN_STATUSES } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import { buildAutomationDispatchPrompt } from "@/lib/automations/buildAutomationDispatchPrompt";
import {
  linkAgentRunToAutomation,
  recordAgentAutomationRun,
} from "@/lib/automations/recordAgentAutomationRun";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type DispatchAgentAutomationResult from "@/lib/automations/types/DispatchAgentAutomationResult.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchClaudeRunForDashboardUser";

const readDispatchErrorMessage = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string =>
  typeof payload?.errorMessage === "string" && payload.errorMessage.length > 0
    ? payload.errorMessage
    : "Automation dispatch failed.";

export const completeWebhookAutomationDispatch = async (input: {
  readonly automation: AgentAutomationRecord;
  readonly capability: PublishedCapabilityRecord;
  readonly runtime: AgentWitchHubRuntime;
  readonly fieldValues: Readonly<Record<string, string>>;
}): Promise<DispatchAgentAutomationResult> => {
  const prompt = buildAutomationDispatchPrompt(
    input.capability,
    input.fieldValues,
  );
  const dispatchResult = await dispatchClaudeRunForDashboardUser({
    runtime: input.runtime,
    requesterUserId: input.automation.ownerUserId,
    body: {
      prompt,
      capabilityId: input.automation.capabilityId,
      ...(input.automation.deviceId !== null
        ? { targetDeviceId: input.automation.deviceId }
        : {}),
      targetUserId: input.automation.executorUserId,
    },
  });

  if (!dispatchResult.ok) {
    const errorMessage = readDispatchErrorMessage(
      dispatchResult.message.payload,
    );
    const automation = await recordAgentAutomationRun({
      automationId: input.automation.id,
      automation: input.automation,
      status: AGENT_AUTOMATION_LAST_RUN_STATUSES.FAILED,
      errorMessage,
    });

    return {
      ok: false,
      automation,
      agentRunId: null,
      errorMessage,
    };
  }

  await linkAgentRunToAutomation(dispatchResult.run.id, input.automation.id);
  const automation = await recordAgentAutomationRun({
    automationId: input.automation.id,
    automation: input.automation,
    status: AGENT_AUTOMATION_LAST_RUN_STATUSES.OK,
    errorMessage: null,
  });

  return {
    ok: true,
    automation,
    agentRunId: dispatchResult.run.id,
    errorMessage: null,
  };
};
