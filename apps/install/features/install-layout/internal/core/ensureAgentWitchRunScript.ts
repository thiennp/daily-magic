import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  chmodSync,
  renameSync,
} from "node:fs";
import { join } from "node:path";

import { AWI_BUNDLED_COMMAND_DIR } from "../../public-api/types";

import { buildAgentWitchRunScript } from "./buildAgentWitchRunScript";

export const ensureAgentWitchRunScript = (
  installDir: string,
): {
  readonly runPath: string;
  readonly changed: boolean;
  /** True when run.sh on disk matches the profile-agnostic template. */
  readonly current: boolean;
} => {
  const commandDir = join(installDir, AWI_BUNDLED_COMMAND_DIR);
  const runPath = join(commandDir, "run.sh");
  const desiredContent = buildAgentWitchRunScript();

  if (!existsSync(commandDir)) {
    return { runPath, changed: false, current: false };
  }

  try {
    if (readFileSync(runPath, "utf8") === desiredContent) {
      return { runPath, changed: false, current: true };
    }
  } catch {
    // Missing or unreadable — write below.
  }

  mkdirSync(commandDir, { recursive: true });
  const tmpPath = join(
    commandDir,
    `run.sh.tmp.${String(Date.now())}.${Math.random().toString(36).slice(2)}`,
  );
  writeFileSync(tmpPath, desiredContent, "utf8");
  chmodSync(tmpPath, 0o755);
  renameSync(tmpPath, runPath);
  return { runPath, changed: true, current: true };
};
