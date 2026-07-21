import { resolveAgentWitchWakeBaseUrlForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

export interface LocalAgentWitchDeleteInstallWakeResult {
  readonly ok: boolean;
  readonly message: string;
}

const readWakeResultMessage = (payload: unknown): string => {
  if (typeof payload !== "object" || payload === null) {
    return "Local install removal finished.";
  }

  const message = (payload as { message?: unknown }).message;
  if (typeof message === "string" && message.trim().length > 0) {
    return message.trim();
  }

  const errorMessage = (payload as { errorMessage?: unknown }).errorMessage;
  if (typeof errorMessage === "string" && errorMessage.trim().length > 0) {
    return errorMessage.trim();
  }

  return "Local install removal finished.";
};

export const requestLocalAgentWitchDeleteInstallFromWakeServer =
  async (): Promise<LocalAgentWitchDeleteInstallWakeResult> => {
    if (typeof window === "undefined") {
      return {
        ok: false,
        message: "Local uninstall is only available in the browser.",
      };
    }

    try {
      const response = await fetch(
        `${resolveAgentWitchWakeBaseUrlForPage()}/install/delete`,
        {
          method: "POST",
          mode: "cors",
          signal: AbortSignal.timeout(15_000),
        },
      );

      const payload: unknown = await response.json().catch(() => null);
      const message = readWakeResultMessage(payload);

      return {
        ok: response.ok,
        message,
      };
    } catch {
      return {
        ok: false,
        message:
          "Could not reach the local Agent Witch wake server on this Mac.",
      };
    }
  };
