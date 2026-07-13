import { spawn, type ChildProcess } from "node:child_process";

import {
  AGENT_RUN_INPUT_GUARDRAILS,
  AGENT_RUN_INPUT_MARKER,
} from "@/lib/dispatch/agentRunInputGuardrails.constant";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  buildWriterCliInvocation,
  type HarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";
import {
  listPendingRunInputSessions,
  removePendingRunInputSession,
  savePendingRunInputSession,
} from "./agentWitchPendingRunSessions";
import { persistFinishedAgentRun } from "./agentWitchRunFinish";
import {
  clearTerminalStreamState,
  isTerminalStreamAccepted,
} from "./agentWitchTerminalStreamState";

import type WebSocket from "ws";

interface AgentWitchRunConfig {
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
  readonly workspace: string;
  readonly layout: AgentWitchLocalLayout;
}

interface ActiveRunSession {
  readonly originalPrompt: string;
  readonly writerAgent: HarnessWriterAgentId;
  accumulatedOutput: string;
}

const activeChildren = new Map<string, ChildProcess>();
const runSessions = new Map<string, ActiveRunSession>();

const resolveWriterCommands = (config: AgentWitchRunConfig) =>
  resolveWriterCliCommands({
    claudeCommand: config.claudeCommand,
    codexCommand: config.codexCommand,
    cursorCommand: config.cursorCommand,
    antigravityCommand: config.antigravityCommand,
  });

const sendMessage = (
  socket: WebSocket,
  message: Record<string, unknown>,
): void => {
  if (socket.readyState === 1) {
    socket.send(JSON.stringify(message));
  }
};

export const parseAwaitingInputFromOutput = (
  output: string,
): { readonly question: string; readonly partialOutput: string } | null => {
  const markerIndex = output.indexOf(AGENT_RUN_INPUT_MARKER);

  if (markerIndex < 0) {
    return null;
  }

  const afterMarker = output
    .slice(markerIndex + AGENT_RUN_INPUT_MARKER.length)
    .trim();
  const question = afterMarker.split("\n")[0]?.trim() ?? "";

  if (question.length === 0) {
    return null;
  }

  return {
    question,
    partialOutput: output.slice(0, markerIndex).trim(),
  };
};

const buildContinuationPrompt = (input: {
  readonly originalPrompt: string;
  readonly partialOutput: string;
  readonly question: string;
  readonly response: string;
}): string =>
  [
    "Continue the task using the user's answer.",
    "",
    "Original task:",
    input.originalPrompt,
    "",
    "Output so far:",
    input.partialOutput,
    "",
    "You asked:",
    input.question,
    "",
    "User answer:",
    input.response,
    "",
    AGENT_RUN_INPUT_GUARDRAILS,
  ].join("\n");

const finishRun = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string | undefined,
  requestId: string | undefined,
  exitCode: number,
  output: string,
  originalPrompt: string,
): void => {
  if (agentRunId !== undefined) {
    if (isTerminalStreamAccepted(agentRunId)) {
      sendMessage(socket, {
        type: "terminal.stream.end",
        payload: { runId: agentRunId },
        requestId,
      });
      clearTerminalStreamState(agentRunId);
    }

    persistFinishedAgentRun(config.layout, {
      agentRunId,
      originalPrompt,
      exitCode,
      output,
      layout: config.layout,
    });

    runSessions.delete(agentRunId);
    activeChildren.delete(agentRunId);
    removePendingRunInputSession(config.layout, agentRunId);
  }

  sendMessage(socket, {
    type: "command.claude.result",
    payload: {
      exitCode,
      output,
      ...(agentRunId !== undefined ? { agentRunId } : {}),
    },
    requestId,
  });
};

const requestRunInput = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string,
  requestId: string | undefined,
  question: string,
  partialOutput: string,
  originalPrompt: string,
): void => {
  const session = runSessions.get(agentRunId);
  const accumulatedOutput = session?.accumulatedOutput ?? partialOutput;

  savePendingRunInputSession(config.layout, {
    agentRunId,
    originalPrompt,
    partialOutput,
    question,
    accumulatedOutput,
  });

  sendMessage(socket, {
    type: "command.claude.input_required",
    payload: {
      agentRunId,
      question,
      partialOutput: accumulatedOutput,
    },
    requestId,
  });
};

const attachChildHandlers = (
  config: AgentWitchRunConfig,
  child: ChildProcess,
  socket: WebSocket,
  requestId: string | undefined,
  agentRunId: string | undefined,
  originalPrompt: string,
  writerAgent: HarnessWriterAgentId,
): void => {
  const outputChunks: string[] = [];
  let inputRequested = false;

  if (agentRunId !== undefined) {
    activeChildren.set(agentRunId, child);
    runSessions.set(agentRunId, {
      originalPrompt,
      writerAgent,
      accumulatedOutput: runSessions.get(agentRunId)?.accumulatedOutput ?? "",
    });
    sendMessage(socket, {
      type: "terminal.stream.start",
      payload: { runId: agentRunId },
      requestId,
    });
  }

  child.stdout?.on("data", (chunk: Buffer) => {
    const text = chunk.toString("utf8");
    outputChunks.push(text);

    if (
      agentRunId !== undefined &&
      isTerminalStreamAccepted(agentRunId) &&
      text.length > 0
    ) {
      sendMessage(socket, {
        type: "terminal.stream.chunk",
        payload: { runId: agentRunId, chunk: text },
        requestId,
      });
    }

    if (inputRequested || agentRunId === undefined) {
      return;
    }

    const parsed = parseAwaitingInputFromOutput(outputChunks.join(""));

    if (parsed !== null) {
      inputRequested = true;
      child.kill("SIGTERM");
      const session = runSessions.get(agentRunId);
      const mergedOutput = [
        session?.accumulatedOutput ?? "",
        parsed.partialOutput,
      ]
        .filter((value) => value.length > 0)
        .join("\n\n");

      if (session !== undefined) {
        session.accumulatedOutput = mergedOutput;
      }

      activeChildren.delete(agentRunId);
      requestRunInput(
        config,
        socket,
        agentRunId,
        requestId,
        parsed.question,
        mergedOutput,
        originalPrompt,
      );
    }
  });

  child.stderr?.on("data", (chunk: Buffer) => {
    outputChunks.push(chunk.toString("utf8"));
  });

  child.on("close", (exitCode) => {
    if (inputRequested) {
      return;
    }

    const session =
      agentRunId !== undefined ? runSessions.get(agentRunId) : undefined;
    const chunkOutput = outputChunks.join("").trim();
    const mergedOutput =
      session !== undefined && session.accumulatedOutput.length > 0
        ? `${session.accumulatedOutput}\n\n${chunkOutput}`.trim()
        : chunkOutput;

    finishRun(
      config,
      socket,
      agentRunId,
      requestId,
      exitCode ?? -1,
      mergedOutput,
      originalPrompt,
    );
  });

  child.on("error", (error) => {
    if (inputRequested) {
      return;
    }

    finishRun(
      config,
      socket,
      agentRunId,
      requestId,
      -1,
      error.message,
      originalPrompt,
    );
  });
};

export const runWriterTask = (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
  requestId: string | undefined,
  socket: WebSocket,
  agentRunId?: string,
): void => {
  const invocation = buildWriterCliInvocation(
    writerAgent,
    prompt,
    resolveWriterCommands(config),
  );

  if (invocation === null) {
    finishRun(
      config,
      socket,
      agentRunId,
      requestId,
      -1,
      "Writer instruction must be a non-empty string.",
      prompt,
    );
    return;
  }

  const child = spawn(invocation.command, [...invocation.args], {
    cwd: config.workspace,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });

  attachChildHandlers(
    config,
    child,
    socket,
    requestId,
    agentRunId,
    prompt,
    writerAgent,
  );
};

export const runClaudeTask = (
  config: AgentWitchRunConfig,
  prompt: string,
  requestId: string | undefined,
  socket: WebSocket,
  agentRunId?: string,
): void => {
  runWriterTask(
    config,
    "claude-cli",
    prompt,
    requestId,
    socket,
    agentRunId,
  );
};

export const continueClaudeTaskAfterInput = (
  config: AgentWitchRunConfig,
  input: {
    readonly agentRunId: string;
    readonly originalPrompt: string;
    readonly partialOutput: string;
    readonly question: string;
    readonly response: string;
  },
  requestId: string | undefined,
  socket: WebSocket,
): void => {
  removePendingRunInputSession(config.layout, input.agentRunId);
  const continuationPrompt = buildContinuationPrompt(input);
  const writerAgent =
    runSessions.get(input.agentRunId)?.writerAgent ?? "claude-cli";
  runWriterTask(
    config,
    writerAgent,
    continuationPrompt,
    requestId,
    socket,
    input.agentRunId,
  );
};

export const replayPendingRunInputRequests = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
): void => {
  for (const session of listPendingRunInputSessions(config.layout)) {
    runSessions.set(session.agentRunId, {
      originalPrompt: session.originalPrompt,
      writerAgent: "claude-cli",
      accumulatedOutput: session.accumulatedOutput,
    });
    sendMessage(socket, {
      type: "command.claude.input_required",
      payload: {
        agentRunId: session.agentRunId,
        question: session.question,
        partialOutput: session.accumulatedOutput,
      },
    });
  }
};
