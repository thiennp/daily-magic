import type { CreateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

export const submitCreateAutomation = async (
  payload: CreateAgentAutomationInput,
): Promise<
  | {
      readonly ok: true;
      readonly automation: AgentAutomationRecord;
      readonly webhookSecret: string | null;
      readonly webhookUrl: string | null;
    }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const response = await fetch("/api/automations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: boolean }).ok === true
  ) {
    const record = data as {
      automation: AgentAutomationRecord;
      webhookSecret: string | null;
      webhookUrl: string | null;
    };

    return {
      ok: true,
      automation: record.automation,
      webhookSecret: record.webhookSecret,
      webhookUrl: record.webhookUrl,
    };
  }

  const errorMessage =
    typeof data === "object" &&
    data !== null &&
    typeof (data as { errorMessage?: string }).errorMessage === "string"
      ? (data as { errorMessage: string }).errorMessage
      : "Could not create automation.";

  return { ok: false, errorMessage };
};
