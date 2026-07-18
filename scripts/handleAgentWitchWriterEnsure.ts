import { spawn } from "node:child_process";

import { ensureHarnessWriterCli } from "./ensureHarnessWriterCli";
import {
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "./buildWriterCliInvocation";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export type WriterEnsureStatus = {
  readonly writerAgent: string;
  readonly installed: boolean;
  readonly loggedIn: boolean;
  readonly errorMessage?: string;
};

const checkWriterLoggedIn = async (
  writerAgent: HarnessWriterAgentId,
  commands: {
    readonly claudeCommand: string;
    readonly codexCommand: string;
    readonly cursorCommand: string;
    readonly antigravityCommand: string;
  },
): Promise<boolean> => {
  const commandByAgent: Record<HarnessWriterAgentId, string> = {
    "claude-cli": commands.claudeCommand,
    codex: commands.codexCommand,
    cursor: commands.cursorCommand,
    antigravity: commands.antigravityCommand,
  };
  const bin = commandByAgent[writerAgent];
  // Presence of the binary is the login readiness signal for now;
  // product login flows open a browser via ensure-writer.sh.
  return await new Promise((resolve) => {
    const child = spawn(bin, ["--version"], {
      stdio: ["ignore", "ignore", "ignore"],
    });
    child.on("error", () => {
      resolve(false);
    });
    child.on("close", (code) => {
      resolve(code === 0);
    });
  });
};

export const runWriterEnsure = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly writerAgent: string;
  readonly commands: {
    readonly claudeCommand: string;
    readonly codexCommand: string;
    readonly cursorCommand: string;
    readonly antigravityCommand: string;
  };
}): Promise<WriterEnsureStatus> => {
  if (!isHarnessWriterAgentId(input.writerAgent)) {
    return {
      writerAgent: input.writerAgent,
      installed: false,
      loggedIn: false,
      errorMessage: `Unsupported writer: ${input.writerAgent}`,
    };
  }

  try {
    await ensureHarnessWriterCli(input.layout.installDir, input.writerAgent);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      writerAgent: input.writerAgent,
      installed: false,
      loggedIn: false,
      errorMessage: message,
    };
  }

  const loggedIn = await checkWriterLoggedIn(input.writerAgent, input.commands);
  return {
    writerAgent: input.writerAgent,
    installed: true,
    loggedIn,
    ...(loggedIn
      ? {}
      : {
          errorMessage:
            "Writer is installed but not logged in yet. Complete login in the browser if prompted.",
        }),
  };
};

export const listPreferredWritersForStatus = (): HarnessWriterAgentId[] => [
  "cursor",
  "claude-cli",
  "codex",
  "antigravity",
];

export const resolveWriterCommandMap = resolveWriterCliCommands;
