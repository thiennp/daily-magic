import { spawn } from "node:child_process";
import fs from "node:fs";

import { isActiveMacOsConsoleUser } from "./isActiveMacOsConsoleUser";
import {
  readActiveProfileEmailFromFile,
  resolveAgentWitchAppBundlePath,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";

export interface SpawnAgentWitchClientResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export const spawnAgentWitchClient = (
  installDir: string = resolveAgentWitchInstallDir(),
): SpawnAgentWitchClientResult => {
  const bundlePath = resolveAgentWitchAppBundlePath(installDir);

  if (!fs.existsSync(bundlePath)) {
    return {
      ok: false,
      errorMessage: "Agent Witch install not found.",
    };
  }

  if (!isActiveMacOsConsoleUser()) {
    return {
      ok: false,
      errorMessage:
        "Skipping spawn — this macOS account is not the active console user.",
    };
  }

  const activeProfileEmail = readActiveProfileEmailFromFile(installDir);
  const env = { ...process.env };
  if (activeProfileEmail !== null) {
    env.AGENT_WITCH_PROFILE = activeProfileEmail;
  }

  const child = spawn(process.execPath, [bundlePath], {
    cwd: installDir,
    detached: true,
    stdio: "ignore",
    env,
  });
  child.unref();

  return { ok: true };
};
