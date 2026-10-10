import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { readCrossAccountFolderClaims } from "@agent-witch/live-projects";

import { buildTaskIntakeHookContext } from "./buildTaskIntakeHookContext";
import { readHookStdinText } from "./readHookStdinText";
import { createCheckContextRunner } from "./createCheckContextRunner";
import { runCheckContextHook } from "./runCheckContextHook";

/** Process wiring for `agent-witch mcp-hook check_context` (always exit 0). */
export const runCheckContextHookCli = async (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
}): Promise<0> => {
  const writeStderr = (text: string): void => {
    process.stderr.write(text);
  };
  return runCheckContextHook({
    readStdin: () => readHookStdinText(process.stdin),
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
