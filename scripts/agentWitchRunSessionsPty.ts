import type WebSocket from "ws";

import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";
import {
  isTerminalStreamAccepted,
  queueTerminalStreamChunk,
} from "./agentWitchTerminalStreamState";
import { spawnAgentCommandInPty } from "./agentWitchShellSession";
import { parseAwaitingInputFromOutput } from "./agentWitchRunSessionsAwaitingInput";

type SendMessage = (
  socket: WebSocket,
  message: Record<string, unknown>,
) => void;

export const tryRunWriterTaskInPty = async (input: {
  readonly socket: WebSocket;
  readonly sendMessage: SendMessage;
  readonly requestId: string | undefined;
  readonly agentRunId: string;
  readonly shellSessionId: string | undefined;
  readonly command: string;
  readonly args: readonly string[];
  readonly cwd: string;
  readonly originalPrompt: string;
  readonly writerAgent: HarnessWriterAgentId;
  readonly onInputRequired: (parsed: {
    readonly question: string;
    readonly partialOutput: string;
  }) => void;
  readonly onFinished: (exitCode: number, output: string) => void;
}): Promise<boolean> => {
  const outputChunks: string[] = [];
  let inputRequested = false;

  const emitTerminalStreamChunk = (text: string): void => {
    if (text.length === 0) {
      return;
    }
    if (isTerminalStreamAccepted(input.agentRunId)) {
      input.sendMessage(input.socket, {
        type: "terminal.stream.chunk",
        payload: { runId: input.agentRunId, chunk: text },
        requestId: input.requestId,
      });
      return;
    }
    queueTerminalStreamChunk(input.agentRunId, text);
  };

  input.sendMessage(input.socket, {
    type: "terminal.stream.start",
    payload: {
      runId: input.agentRunId,
      ...(input.shellSessionId !== undefined
        ? { shellSessionId: input.shellSessionId }
        : {}),
    },
    requestId: input.requestId,
  });

  const spawned = await spawnAgentCommandInPty({
    shellSessionId: input.shellSessionId,
    runId: input.agentRunId,
    command: input.command,
    args: input.args,
    cwd: input.cwd,
    send: (message) => {
      input.sendMessage(input.socket, message);
    },
    requestId: input.requestId,
    onData: (chunk) => {
      outputChunks.push(chunk);
      emitTerminalStreamChunk(chunk);
      if (inputRequested) {
        return;
      }
      const parsed = parseAwaitingInputFromOutput(outputChunks.join(""));
      if (parsed !== null) {
        inputRequested = true;
        input.onInputRequired(parsed);
      }
    },
    onExit: (exitCode) => {
      if (inputRequested) {
        return;
      }
      input.onFinished(exitCode, outputChunks.join("").trim());
    },
  });

  return spawned.usedPty;
};
