import type { AgentAutomationTriggerTypeValue } from "@/lib/automations/AgentAutomationTriggerType.constant";

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
  _triggerType: AgentAutomationTriggerTypeValue,
  _appOrigin: string,
): Promise<
  | { readonly ok: true; readonly agentRunId: string | null }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  void _triggerType;
  void _appOrigin;

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
  _appOrigin: string,
): Promise<
  | { readonly ok: true; readonly writtenCount?: number }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  void _appOrigin;
  const response = await fetch("/api/automations/sync", { method: "POST" });
  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: boolean }).ok === true
  ) {
    const writtenCount = (data as { writtenCount?: number }).writtenCount;
    return { ok: true, writtenCount };
  }

  const errorMessage =
    typeof data === "object" &&
    data !== null &&
    typeof (data as { errorMessage?: string }).errorMessage === "string"
      ? (data as { errorMessage: string }).errorMessage
      : "Could not sync automations to this Mac.";

  return { ok: false, errorMessage };
};
