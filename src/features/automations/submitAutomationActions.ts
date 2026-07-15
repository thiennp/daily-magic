import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import type { AgentAutomationTriggerTypeValue } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { requestLocalAutomationRun } from "@/lib/agentWitch/requestLocalAutomationRun";
import { requestLocalAutomationSync } from "@/lib/agentWitch/requestLocalAutomationSync";

export const submitDeleteAutomation = async (
  automationId: string,
): Promise<
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string }
> => {
  const response = await fetch(`/api/automations/${automationId}`, {
    method: "DELETE",
  });
  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: boolean }).ok === true
  ) {
    return { ok: true };
  }

  return { ok: false, errorMessage: "Could not delete automation." };
};

export const submitRunAutomation = async (
  automationId: string,
  triggerType: AgentAutomationTriggerTypeValue,
  appOrigin: string,
): Promise<
  | { readonly ok: true; readonly agentRunId: string | null }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  if (triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE) {
    const localResult = await requestLocalAutomationRun({
      automationId,
      appOrigin,
    });

    if (!localResult.ok) {
      return {
        ok: false,
        errorMessage:
          localResult.errorMessage ??
          "Scheduled automation run failed on this Mac.",
      };
    }

    return { ok: true, agentRunId: null };
  }

  const response = await fetch(`/api/automations/${automationId}/run`, {
    method: "POST",
  });
  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: boolean }).ok === true
  ) {
    const agentRunId =
      (data as { agentRunId?: string | null }).agentRunId ?? null;
    return { ok: true, agentRunId };
  }

  const errorMessage =
    typeof data === "object" &&
    data !== null &&
    typeof (data as { errorMessage?: string }).errorMessage === "string"
      ? (data as { errorMessage: string }).errorMessage
      : "Automation run failed.";

  return { ok: false, errorMessage };
};

export const submitToggleAutomation = async (
  automationId: string,
  enabled: boolean,
): Promise<
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string }
> => {
  const response = await fetch(`/api/automations/${automationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled }),
  });
  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: boolean }).ok === true
  ) {
    return { ok: true };
  }

  return { ok: false, errorMessage: "Could not update automation." };
};

export const syncAutomationsToLocalMac = async (
  appOrigin: string,
): Promise<
  | { readonly ok: true; readonly writtenCount?: number }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const result = await requestLocalAutomationSync({ appOrigin });
  return result.ok
    ? { ok: true, writtenCount: result.writtenCount }
    : {
        ok: false,
        errorMessage: result.errorMessage ?? AUTOMATIONS_SYNC_FALLBACK_ERROR,
      };
};

const AUTOMATIONS_SYNC_FALLBACK_ERROR =
  "Could not sync automations to this Mac.";
