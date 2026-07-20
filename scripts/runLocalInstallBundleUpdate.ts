import { appendAgentWitchLocalTraffic } from "./agentWitchLocalTrafficLog";
import { readAgentWitchInstallVersion } from "./agentWitchInstallVersion";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import { requestLocalAgentWitchSelfUpdate } from "./requestLocalAgentWitchSelfUpdate";
import { shouldTriggerAgentWitchHeartbeatSelfUpdate } from "./shouldTriggerAgentWitchHeartbeatSelfUpdate";

const logInstallBundleUpdateTraffic = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly summary: string;
    readonly action: string;
  },
): void => {
  appendAgentWitchLocalTraffic(layout, {
    direction: "local",
    type: "install.bundle.update",
    summary: input.summary,
    action: input.action,
  });
};

const runDirectInstallBundleUpdate = async (): Promise<{
  readonly ok: boolean;
  readonly message: string;
}> => {
  try {
    const { runAgentWitchSelfUpdate } = await import("./agentWitchSelfUpdate");
    const result = await runAgentWitchSelfUpdate({ force: true });
    return {
      ok: result.ok && (result.updated || result.ok),
      message: result.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      message,
    };
  }
};

export const runLocalInstallBundleUpdate = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly remoteBundleVersion: string;
  readonly trigger: "system.ack" | "install.bundle.update";
}): Promise<void> => {
  const localBundleVersion =
    readAgentWitchInstallVersion(input.layout.installDir)?.bundleVersion ?? null;

  if (
    !shouldTriggerAgentWitchHeartbeatSelfUpdate({
      localBundleVersion,
      remoteBundleVersion: input.remoteBundleVersion,
    })
  ) {
    return;
  }

  const mismatchMessage = `Install bundle mismatch (local=${localBundleVersion ?? "none"} remote=${input.remoteBundleVersion}); updating from ${input.trigger}…`;
  console.log(`[agent-witch] ${mismatchMessage}`);
  logInstallBundleUpdateTraffic(input.layout, {
    summary: mismatchMessage,
    action: "install-bundle-update-start",
  });

  const wakeResult = await requestLocalAgentWitchSelfUpdate({ force: true });
  if (wakeResult.ok) {
    console.log(
      `[agent-witch] Install bundle update finished (remote ${input.remoteBundleVersion}).`,
      wakeResult.payload,
    );
    logInstallBundleUpdateTraffic(input.layout, {
      summary: `Install bundle update ok → ${input.remoteBundleVersion}`,
      action: "install-bundle-update-ok",
    });
    return;
  }

  if (!wakeResult.reachable) {
    const directResult = await runDirectInstallBundleUpdate();
    if (directResult.ok) {
      console.log(
        `[agent-witch] Direct install bundle update finished (remote ${input.remoteBundleVersion}).`,
      );
      logInstallBundleUpdateTraffic(input.layout, {
        summary: `Direct install bundle update ok → ${input.remoteBundleVersion}`,
        action: "install-bundle-update-direct-ok",
      });
      return;
    }

    console.error(
      "[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",
      directResult.message,
    );
    logInstallBundleUpdateTraffic(input.layout, {
      summary: `Install bundle update failed: ${directResult.message}`,
      action: "install-bundle-update-error",
    });
    return;
  }

  console.error(
    "[agent-witch] Install bundle update failed.",
    wakeResult.payload,
  );
  logInstallBundleUpdateTraffic(input.layout, {
    summary: "Install bundle update failed",
    action: "install-bundle-update-error",
  });
};
