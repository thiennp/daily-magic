import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  readActiveProfileEmailFromFile,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";

export interface SpawnAgentWitchClientResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export const spawnAgentWitchClient = (
  installDir: string = resolveAgentWitchInstallDir(),
): SpawnAgentWitchClientResult => {
  const scriptPath = path.join(installDir, "agent-witch.ts");
  const tsxPath = path.join(
    installDir,
    "node_modules",
    "tsx",
    "dist",
    "cli.mjs",
  );

  if (!fs.existsSync(scriptPath) || !fs.existsSync(tsxPath)) {
    return {
      ok: false,
      errorMessage: "Agent Witch install not found.",
    };
  }

  const activeProfileEmail = readActiveProfileEmailFromFile(installDir);
  const env = { ...process.env };
  if (activeProfileEmail !== null) {
    env.AGENT_WITCH_PROFILE = activeProfileEmail;
  }

  const child = spawn(process.execPath, [tsxPath, scriptPath], {
    cwd: installDir,
    detached: true,
    stdio: "ignore",
    env,
  });
  child.unref();

  return { ok: true };
};
