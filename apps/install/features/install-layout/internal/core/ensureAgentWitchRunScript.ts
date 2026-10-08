import {
  existsSync,
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
): { readonly runPath: string; readonly changed: boolean } => {
  const commandDir = join(installDir, AWI_BUNDLED_COMMAND_DIR);
  const runPath = join(commandDir, "run.sh");

  if (!existsSync(commandDir)) {
    return { runPath, changed: false };
  }

  const desiredContent = buildAgentWitchRunScript();

  try {
    const existingContent = readFileSync(runPath, "utf8");
    if (existingContent === desiredContent) {
      return { runPath, changed: false };
    }
  } catch {
    // If it doesn't exist or can't be read, we will write it
  }

  const tmpPath = join(
    commandDir,
    "run.sh.tmp." + Date.now() + "." + Math.random().toString(36).slice(2),
  );
  writeFileSync(tmpPath, desiredContent, "utf8");
  chmodSync(tmpPath, 0o755);
  renameSync(tmpPath, runPath);

  return { runPath, changed: true };
};
