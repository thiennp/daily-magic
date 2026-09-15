import { requestLocalAgentWitchSelfUpdate } from "./requestLocalAgentWitchSelfUpdate";

const readUpdateMessageFromPayload = (payload: unknown): string | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const message = (payload as { message?: unknown }).message;
  return typeof message === "string" && message.length > 0 ? message : null;
};

export const triggerAgentWitchLocalInstallBundleUpdate = async (): Promise<{
  readonly ok: boolean;
  readonly message: string;
}> => {
  const wakeResult = await requestLocalAgentWitchSelfUpdate({ force: true });

  if (wakeResult.ok) {
    return {
      ok: true,
      message:
        readUpdateMessageFromPayload(wakeResult.payload) ??
        "Install bundle update finished.",
    };
  }

  if (wakeResult.reachable) {
    return {
      ok: false,
      message:
        readUpdateMessageFromPayload(wakeResult.payload) ??
        "Install bundle update failed.",
    };
  }

  const { runAgentWitchSelfUpdate } = await import("./agentWitchSelfUpdate");
  const directResult = await runAgentWitchSelfUpdate({ force: true });

  return {
    ok: directResult.ok && (directResult.updated || directResult.ok),
    message: directResult.message,
  };
};
