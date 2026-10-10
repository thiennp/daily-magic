import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { readCrossAccountFolderClaims } from "@agent-witch/live-projects";

import { buildTaskIntakeHookContext } from "./buildTaskIntakeHookContext";
import { createCheckContextRunner } from "./createCheckContextRunner";
import { runCheckContextHook } from "./runCheckContextHook";

/** Claude hook timeout is 3s; never wait on an open TTY / stuck pipe longer. */
const STDIN_TIMEOUT_MS = 1500;

const readStdinText = (
  stdin: NodeJS.ReadableStream & { destroy?: () => void },
  timeoutMs: number,
): Promise<string> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let settled = false;
    const finish = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      stdin.removeAllListeners("data");
      stdin.removeAllListeners("end");
      stdin.removeAllListeners("error");
      stdin.pause();
      resolve(Buffer.concat(chunks).toString("utf8"));
    };
    const timer = setTimeout(finish, timeoutMs);
    stdin.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, "utf8"));
    });
    stdin.on("end", finish);
    stdin.on("error", finish);
  });

/** Process wiring for `agent-witch mcp-hook check_context` (always exit 0). */
export const runCheckContextHookCli = async (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
}): Promise<0> => {
  const writeStderr = (text: string): void => {
    process.stderr.write(text);
  };
  return runCheckContextHook({
    readStdin: () => readStdinText(process.stdin, STDIN_TIMEOUT_MS),
    writeStdout: (text) => {
      process.stdout.write(text);
    },
    writeStderr,
    getTaskIntakeContext: ({ projectId, cwd, prompt }) =>
      buildTaskIntakeHookContext({
        layout: input.layout,
        projectId,
        cwd,
        prompt,
        readClaims: () => readCrossAccountFolderClaims(input.layout.installDir),
      }),
    runCheckContext: createCheckContextRunner({
      layout: input.layout,
      logError: (error) => {
        const message = error instanceof Error ? error.message : String(error);
        writeStderr(`[agent-witch] mcp-hook check_context: ${message}\n`);
      },
    }),
  });
};
