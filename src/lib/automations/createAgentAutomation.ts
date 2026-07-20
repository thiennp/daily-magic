import { randomUUID } from "node:crypto";

import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { buildAutomationDispatchPrompt } from "@/lib/automations/buildAutomationDispatchPrompt";
import { insertAgentAutomationRecord } from "@/lib/automations/insertAgentAutomationRecord";
import type { CreateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import { prepareAutomationFieldValues } from "@/lib/automations/prepareAutomationFieldValues";
import { resolveAutomationNextRunAt } from "@/lib/automations/resolveAutomationNextRunAt";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import { generateAutomationWebhookSecret } from "@/lib/automations/automationWebhookSecret";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";

export interface CreateAgentAutomationResult {
  readonly automation: AgentAutomationRecord;
  readonly webhookSecret: string | null;
}

export type CreateAgentAutomationOutcome =
  | { readonly kind: "created"; readonly result: CreateAgentAutomationResult }
  | { readonly kind: "not_found" }
  | { readonly kind: "validation_error"; readonly errorMessage: string };

export const createAgentAutomation = async (
  ownerUserId: string,
  input: CreateAgentAutomationInput,
): Promise<CreateAgentAutomationOutcome> => {
  const capability = await getPublishedCapabilityById(input.capabilityId);

  if (capability === null || capability.ownerUserId !== ownerUserId) {
    return { kind: "not_found" };
  }

  const prepared = await prepareAutomationFieldValues({
    ownerUserId,
    capability,
    fieldValues: input.fieldValues ?? {},
    projectId: input.projectId ?? null,
  });

  if (!prepared.ok) {
    return { kind: "validation_error", errorMessage: prepared.errorMessage };
  }

  const webhookSecret =
    input.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK
      ? generateAutomationWebhookSecret()
      : null;
  const automation = await insertAgentAutomationRecord({
    automationId: randomUUID(),
    ownerUserId,
    createInput: input,
    fieldValuesJson: JSON.stringify(prepared.fieldValues),
    projectId: prepared.projectId,
    localPrompt: buildAutomationDispatchPrompt(
      capability,
      prepared.fieldValues,
    ),
    webhookSecret,
    nextRunAt: resolveAutomationNextRunAt(input),
  });

  return {
    kind: "created",
    result: { automation, webhookSecret },
  };
};
