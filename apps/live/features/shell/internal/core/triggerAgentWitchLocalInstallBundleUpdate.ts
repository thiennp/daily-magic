import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "@agent-witch/install-layout";
import { ensureAgentWitchLaunchAgentPlist } from "@agent-witch/install-macos-launch";

import { requestLocalAgentWitchSelfUpdate } from "./requestLocalAgentWitchSelfUpdate";

const repairLaunchAgentPlistBeforeUpdate = (): void => {
  ensureAgentWitchLaunchAgentPlist({
    launchAgentLabel: resolveAgentWitchLaunchAgentPrefix(),
    installDir: resolveAgentWitchInstallDir(),
  });
};

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
  repairLaunchAgentPlistBeforeUpdate();
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

  const { runAgentWitchSelfUpdate } =
    await import("@agent-witch/install-self-update");
  const directResult = await runAgentWitchSelfUpdate({ force: true });

  return {
    ok: directResult.ok && (directResult.updated || directResult.ok),
    message: directResult.message,
  };
};
