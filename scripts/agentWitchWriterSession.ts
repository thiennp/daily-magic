import { spawn } from "node:child_process";

import {
  buildWriterSessionStartInvocation,
  isHarnessWriterAgentId,
  type HarnessWriterAgentId,
  type WriterCliCommands,
} from "./buildWriterCliInvocation";
import { ensureHarnessWriterCli } from "./ensureHarnessWriterCli";

interface WriterSessionState {
  readonly warmed: boolean;
  readonly conversationStarted: boolean;
}

const writerSessions = new Map<HarnessWriterAgentId, WriterSessionState>();

export const supportsWriterSessionWarmup = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerAgent === "cursor" || writerAgent === "antigravity";

export const supportsWriterSessionContinuation = (
  writerAgent: HarnessWriterAgentId,
): boolean =>
  writerAgent === "claude-cli" ||
  writerAgent === "cursor" ||
  writerAgent === "antigravity";

export const isWriterSessionWarmed = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerSessions.get(writerAgent)?.warmed === true;

export const markWriterSessionWarmed = (
  writerAgent: HarnessWriterAgentId,
): void => {
  const current = writerSessions.get(writerAgent);
  writerSessions.set(writerAgent, {
    warmed: true,
    conversationStarted: current?.conversationStarted ?? false,
  });
};

export const isWriterConversationStarted = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerSessions.get(writerAgent)?.conversationStarted === true;

export const markWriterConversationStarted = (
  writerAgent: HarnessWriterAgentId,
): void => {
  const current = writerSessions.get(writerAgent);
  writerSessions.set(writerAgent, {
    warmed: current?.warmed ?? true,
    conversationStarted: true,
  });
};

export const clearWriterSession = (writerAgent: HarnessWriterAgentId): void => {
  writerSessions.delete(writerAgent);
};

export const resetWriterSessionsForTests = (): void => {
  writerSessions.clear();
};

export const buildWriterSessionWarmupMessage = (
  writerAgent: HarnessWriterAgentId,
): string => {
  if (writerAgent === "cursor") {
    return "Preparing Cursor for this session…\n";
  }

  if (writerAgent === "antigravity") {
    return "Preparing Antigravity for this session…\n";
  }

  return "";
};

const WRITER_SESSION_READY_LABELS: Record<HarnessWriterAgentId, string> = {
  "claude-cli": "Claude",
  codex: "Codex",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

export const buildWriterSessionReadyMessage = (
  writerAgent: HarnessWriterAgentId,
): string =>
  `${WRITER_SESSION_READY_LABELS[writerAgent]} is ready on your Mac.\nSend a task from the box below when you are ready.\n`;

export interface WriterSessionStartResult {
  readonly exitCode: number;
  readonly output: string;
}

const runWriterSessionStartInvocation = (
  workspace: string,
  writerAgent: HarnessWriterAgentId,
  commands: WriterCliCommands,
  onChunk?: (chunk: string) => void,
): Promise<{ readonly exitCode: number; readonly output: string }> =>
  new Promise((resolve) => {
    const invocation = buildWriterSessionStartInvocation(writerAgent, commands);
    const outputChunks: string[] = [];
    const child = spawn(invocation.command, [...invocation.args], {
      cwd: workspace,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    const emitChunk = (chunk: Buffer): void => {
      const text = chunk.toString("utf8");
      outputChunks.push(text);
      onChunk?.(text);
    };

    child.stdout?.on("data", emitChunk);

    child.stderr?.on("data", emitChunk);

    child.on("close", (exitCode) => {
      resolve({
        exitCode: exitCode ?? -1,
        output: outputChunks.join("").trim(),
      });
    });

    child.on("error", (error) => {
      resolve({
        exitCode: -1,
        output: error.message,
      });
    });
  });

const appendReadyMessage = (
  writerAgent: HarnessWriterAgentId,
  cliOutput: string,
): string => {
  const readyMessage = buildWriterSessionReadyMessage(writerAgent);
  if (cliOutput.length === 0) {
    return readyMessage;
  }

  const suffix = cliOutput.endsWith("\n") ? "" : "\n";
  return `${cliOutput}${suffix}${readyMessage}`;
};

export const runWriterSessionStart = async (input: {
  readonly installDir: string;
  readonly workspace: string;
  readonly writerAgent: string;
  readonly commands: WriterCliCommands;
  readonly onChunk?: (chunk: string) => void;
}): Promise<WriterSessionStartResult> => {
  if (!isHarnessWriterAgentId(input.writerAgent)) {
    return {
      exitCode: -1,
      output: `Unsupported writer agent: ${input.writerAgent}\n`,
    };
  }

  try {
    input.onChunk?.(`Preparing ${input.writerAgent} CLI on your Mac…\n`);
    await ensureHarnessWriterCli(input.installDir, input.writerAgent);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      exitCode: -1,
      output: `Failed to prepare ${input.writerAgent}: ${message}\n`,
    };
  }

  if (supportsWriterSessionWarmup(input.writerAgent)) {
    markWriterSessionWarmed(input.writerAgent);
  }

  const cliResult = await runWriterSessionStartInvocation(
    input.workspace,
    input.writerAgent,
    input.commands,
    input.onChunk,
  );

  if (cliResult.exitCode !== 0) {
    const cliOutput =
      cliResult.output.length > 0 ? `${cliResult.output}\n` : "";
    return {
      exitCode: cliResult.exitCode,
      output: `${cliOutput}Failed to start ${input.writerAgent} CLI.\n`,
    };
  }

  return {
    exitCode: 0,
    output:
      cliResult.output.length > 0
        ? appendReadyMessage(input.writerAgent, cliResult.output)
        : buildWriterSessionReadyMessage(input.writerAgent),
  };
};
