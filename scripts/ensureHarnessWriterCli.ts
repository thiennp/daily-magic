import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";

import {
  AGENT_WITCH_APP_DIR_NAME,
  AGENT_WITCH_COMMAND_DIR_NAME,
} from "./agentWitchInstallApp.constants";
import { resolveWriterSignInRequiredReason } from "./writerSignInRequired";

const ENSURE_WRITER_SCRIPT_TIMEOUT_MS = 120_000;

export const ensureHarnessWriterCli = (
  installDir: string,
  writerAgent: HarnessWriterAgentId,
): Promise<void> => {
  const scriptPath = path.join(
    installDir,
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_COMMAND_DIR_NAME,
    "ensure-writer.sh",
  );

  if (!fs.existsSync(scriptPath)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const child = spawn("bash", [scriptPath, writerAgent], {
      stdio: ["ignore", "pipe", "pipe"],
      detached: process.platform !== "win32",
    });

    const outcome = { settled: false };
    const settle = (finish: () => void): void => {
      if (!outcome.settled) {
        outcome.settled = true;
        finish();
      }
    };

    child.stdout?.resume();

    const killProcessGroup = (): void => {
      if (child.pid === undefined) {
        return;
      }
      if (process.platform === "win32") {
        child.kill("SIGTERM");
        return;
      }
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        child.kill("SIGTERM");
      }
    };

    const timeout = setTimeout(() => {
      killProcessGroup();
      settle(() =>
        reject(
          new Error(
            `ensure-writer.sh timed out after ${String(ENSURE_WRITER_SCRIPT_TIMEOUT_MS / 1000)}s`,
          ),
        ),
      );
    }, ENSURE_WRITER_SCRIPT_TIMEOUT_MS);

    // 5ca01f06: never wait on an interactive login with no terminal.
    child.stderr?.on("data", (chunk: Buffer | string) => {
      const reason = resolveWriterSignInRequiredReason(
        writerAgent,
        String(chunk),
      );
      if (reason !== null) {
        clearTimeout(timeout);
        killProcessGroup();
        settle(() => reject(new Error(reason)));
      }
    });

    child.on("error", (error) => {
      clearTimeout(timeout);
      settle(() => reject(error));
    });

    child.on("close", (exitCode) => {
      clearTimeout(timeout);
      if (exitCode === 0) {
        settle(resolve);
        return;
      }

      settle(() =>
        reject(
          new Error(
            `ensure-writer.sh exited with code ${String(exitCode ?? -1)}`,
          ),
        ),
      );
    });
  });
};
