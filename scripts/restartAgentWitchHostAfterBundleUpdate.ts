import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { restartAgentWitchLinuxSystemdUserService } from "@agent-witch/install-linux-launch";
import {
  bootoutAgentWitchAuxiliaryLaunchAgents,
  kickstartAgentWitchClientLaunchAgents,
} from "@agent-witch/install-macos-launch";
import { resolveAgentWitchAppBundlePath } from "@agent-witch/install-layout";
import { AWI_BUNDLED_COMMAND_DIR } from "@agent-witch/install-layout/types";

export const AGENT_WITCH_HOST_RESTART_LOG_PREFIX =
  "[agent-witch] Restarting into bundle";

export type AgentWitchHostBundleRestartMode =
  "launchd" | "systemd" | "detached-relaunch" | "skipped";

export type AgentWitchHostGracefulShutdown = () => void | Promise<void>;

let gracefulShutdown: AgentWitchHostGracefulShutdown | null = null;

export const registerAgentWitchHostGracefulShutdown = (
  handler: AgentWitchHostGracefulShutdown,
): void => {
  gracefulShutdown = handler;
};

export const clearAgentWitchHostGracefulShutdownForTests = (): void => {
  gracefulShutdown = null;
};

export const isAgentWitchProcessRunningUnderSystemdUserService = (): boolean =>
  process.platform === "linux" &&
  typeof process.env.INVOCATION_ID === "string" &&
  process.env.INVOCATION_ID.length > 0;

export const resolveAgentWitchHostRunScriptPath = (
  installDir: string,
): string => path.join(installDir, AWI_BUNDLED_COMMAND_DIR, "run.sh");

const spawnDetachedHostProcess = (
  installDir: string,
): { readonly ok: boolean; readonly errorMessage?: string } => {
  const runScript = resolveAgentWitchHostRunScriptPath(installDir);
  if (fs.existsSync(runScript)) {
    const command = process.platform === "linux" ? "setsid" : runScript;
    const args = process.platform === "linux" ? [runScript] : [];
    const child = spawn(command, args, {
      cwd: installDir,
      detached: true,
      stdio: "ignore",
      env: process.env,
    });
    child.unref();
    return { ok: true };
  }

  const bundlePath = resolveAgentWitchAppBundlePath(installDir);
  if (!fs.existsSync(bundlePath)) {
    return {
      ok: false,
      errorMessage: "AgentWitch install bundle entrypoint is missing.",
    };
  }

  const child = spawn(process.execPath, [bundlePath], {
    cwd: installDir,
    detached: true,
    stdio: "ignore",
    env: process.env,
  });
  child.unref();
  return { ok: true };
};

const runGracefulShutdown = async (): Promise<void> => {
  if (gracefulShutdown === null) {
    return;
  }
  await gracefulShutdown();
};

export const restartAgentWitchHostAfterBundleUpdate = async (input: {
  readonly installDir: string;
  readonly bundleVersion: string;
  readonly exitProcess?: (code: number) => void;
}): Promise<{
  readonly ok: boolean;
  readonly mode: AgentWitchHostBundleRestartMode;
  readonly message: string;
}> => {
  const exitProcess =
    input.exitProcess ?? ((code: number) => process.exit(code));
  console.log(`${AGENT_WITCH_HOST_RESTART_LOG_PREFIX} ${input.bundleVersion}`);

  await runGracefulShutdown();

  if (process.platform === "darwin") {
    bootoutAgentWitchAuxiliaryLaunchAgents();
    const kicked = await kickstartAgentWitchClientLaunchAgents(
      input.installDir,
    );
    if (kicked.length > 0) {
      exitProcess(0);
      return {
        ok: true,
        mode: "launchd",
        message: `Restarted LaunchAgent(s): ${kicked.join(", ")}.`,
      };
    }
  }

  if (
    process.platform === "linux" &&
    isAgentWitchProcessRunningUnderSystemdUserService()
  ) {
    try {
      await restartAgentWitchLinuxSystemdUserService();
      exitProcess(0);
      return {
        ok: true,
        mode: "systemd",
        message: "Restarted agent-witch.service systemd user unit.",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `[agent-witch] systemd restart after bundle update failed: ${message}`,
      );
    }
  }

  const spawned = spawnDetachedHostProcess(input.installDir);
  if (!spawned.ok) {
    return {
      ok: false,
      mode: "skipped",
      message:
        spawned.errorMessage ??
        "Could not relaunch AgentWitch after bundle update.",
    };
  }

  exitProcess(0);
  return {
    ok: true,
    mode: "detached-relaunch",
    message: "Relaunched AgentWitch host process.",
  };
};
