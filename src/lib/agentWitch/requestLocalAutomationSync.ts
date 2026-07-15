import {
  AGENT_WITCH_WAKE_BASE_URL,
  canRequestLocalAgentWitchApi,
} from "@/lib/agentWitch/linkLocalAgentAccount";
import type LocalScheduledAutomationPayload from "@/lib/automations/types/LocalScheduledAutomationPayload.type";

export const requestLocalAutomationSync = async (input: {
  readonly appOrigin: string;
  readonly profileEmail?: string;
}): Promise<{
  readonly ok: boolean;
  readonly writtenCount?: number;
  readonly errorMessage?: string;
}> => {
  if (!canRequestLocalAgentWitchApi()) {
    return { ok: false, errorMessage: "Browser environment required." };
  }

  try {
    const syncResponse = await fetch("/api/automations/sync-payload", {
      signal: AbortSignal.timeout(15_000),
    });
    const syncData: unknown = await syncResponse.json().catch(() => null);

    if (!syncResponse.ok) {
      return {
        ok: false,
        errorMessage: "Could not load automations to sync.",
      };
    }

    const automations =
      typeof syncData === "object" &&
      syncData !== null &&
      Array.isArray((syncData as { automations?: unknown }).automations)
        ? (
            syncData as {
              automations: readonly LocalScheduledAutomationPayload[];
            }
          ).automations
        : [];

    const response = await fetch(
      `${AGENT_WITCH_WAKE_BASE_URL}/automations/sync`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appOrigin: input.appOrigin,
          profileEmail: input.profileEmail,
          automations,
        }),
        signal: AbortSignal.timeout(30_000),
      },
    );

    const data: unknown = await response.json();
    if (
      response.ok &&
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      (data as { ok: boolean }).ok === true
    ) {
      const record = data as { writtenCount?: unknown };
      const writtenCount =
        typeof record.writtenCount === "number"
          ? record.writtenCount
          : automations.length;
      return { ok: true, writtenCount };
    }

    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "errorMessage" in data &&
      typeof (data as { errorMessage: unknown }).errorMessage === "string"
        ? (data as { errorMessage: string }).errorMessage
        : "Could not sync automations on this Mac.";

    return { ok: false, errorMessage };
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return {
        ok: false,
        errorMessage: "Automation sync timed out on this Mac.",
      };
    }

    return {
      ok: false,
      errorMessage:
        "Agent Witch on this Mac is not running. Run install first.",
    };
  }
};
