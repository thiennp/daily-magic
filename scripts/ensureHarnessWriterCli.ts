import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";

export const ensureHarnessWriterCli = (
  installDir: string,
  writerAgent: HarnessWriterAgentId,
): Promise<void> => {
  const scriptPath = path.join(installDir, "ensure-writer.sh");

  if (!fs.existsSync(scriptPath)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const child = spawn("bash", [scriptPath, writerAgent], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    child.stdout?.resume();
    child.stderr?.resume();

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (exitCode) => {
      if (exitCode === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `ensure-writer.sh exited with code ${String(exitCode ?? -1)}`,
        ),
      );
    });
  });
};
