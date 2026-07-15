import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_WATCHDOG_REINSTALL_COOLDOWN_MS,
  AGENT_WITCH_WATCHDOG_REINSTALL_STATE_FILE_NAME,
} from "./agentWitchWatchdogReinstall.constants";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

export interface AgentWitchWatchdogReinstallState {
  readonly lastAttemptAt: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const resolveStatePath = (installDir: string): string =>
  path.join(installDir, AGENT_WITCH_WATCHDOG_REINSTALL_STATE_FILE_NAME);

export const readAgentWitchWatchdogReinstallState = (
  installDir: string = resolveAgentWitchInstallDir(),
): AgentWitchWatchdogReinstallState | null => {
  const statePath = resolveStatePath(installDir);
  if (!fs.existsSync(statePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (
      !isRecord(parsed) ||
      typeof parsed.lastAttemptAt !== "string" ||
      parsed.lastAttemptAt.length === 0
    ) {
      return null;
    }

    return { lastAttemptAt: parsed.lastAttemptAt };
  } catch {
    return null;
  }
};

export const canRunAgentWitchWatchdogReinstall = (
  installDir: string = resolveAgentWitchInstallDir(),
  nowMs: number = Date.now(),
): boolean => {
  const state = readAgentWitchWatchdogReinstallState(installDir);
  if (state === null) {
    return true;
  }

  const lastAttemptMs = Date.parse(state.lastAttemptAt);
  if (!Number.isFinite(lastAttemptMs)) {
    return true;
  }

  return nowMs - lastAttemptMs >= AGENT_WITCH_WATCHDOG_REINSTALL_COOLDOWN_MS;
};

export const recordAgentWitchWatchdogReinstallAttempt = (
  installDir: string = resolveAgentWitchInstallDir(),
  recordedAt: string = new Date().toISOString(),
): AgentWitchWatchdogReinstallState => {
  const state = { lastAttemptAt: recordedAt };
  const statePath = resolveStatePath(installDir);
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  return state;
};
