import { spawn, type ChildProcess } from "node:child_process";

import {
  removeRunCompositionOverlay,
  shouldEmitWriterApiMissingCliFallbackHonesty,
} from "@agent-witch/install-runtime-client";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  buildWriterCliInvocation,
  type BuildWriterCliInvocationOptions,
  type HarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";
import {
  hasPendingRunInputSession,
  listPendingRunInputSessions,
  removePendingRunInputSession,
  savePendingRunInputSession,
} from "./agentWitchPendingRunSessions";
import {
  recordAgentRunEstimateActual,
  readAgentRunEstimateComparison,
  recordAgentRunPromptExchange,
  recordAgentRunTokenEstimateActual,
} from "./agentRunEstimateHistory";
import { resolveTaskWriterEstimateLabel } from "./dispatch/resolveTaskWriterEstimateLabel";
import { readActualTaskTokenCount } from "./dispatch/readActualTaskTokenCount";
import { resolveClaudeCliPrintOutput } from "./dispatch/parseClaudeCliPrintResult";
import {
  enqueueAgentRunCompletionOutbox,
  flushAgentRunCompletionOutbox,
} from "./agentWitchRunCompletionOutbox";
import { reportAgentRunEstimateComparisonOnCloud } from "./agentWitchCloudApi";
import { startRunHeartbeat, stopRunHeartbeat } from "./agentWitchRunHeartbeat";
import { isProcessAlive } from "./isProcessAlive";
import { resolveWriterTaskCwd } from "./resolveWriterTaskCwd";
import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";
import {
  clearTerminalStreamState,
  isTerminalStreamAccepted,
  queueTerminalStreamChunk,
} from "./agentWitchTerminalStreamState";
import {
  closeShellPtySession,
  isAgentPtyRunAlive,
  killAgentPtyByRunId,
} from "./agentWitchShellSession";
import {
  buildContinuationPrompt,
  parseAwaitingInputFromOutput,
} from "./agentWitchRunSessionsAwaitingInput";
import { tryRunWriterTaskInPty } from "./agentWitchRunSessionsPty";
import {
  appendRunSessionLimitNotice,
  armRunSessionLimit,
  clearRunSessionLimit,
  killChildProcessTree,
} from "./agentWitchRunSessionLimit";
import { LOCAL_CLI_SESSION_LIMIT_EXIT_CODE } from "./localCliRunLimits.constant";
import { markWriterConversationStarted } from "./agentWitchWriterSession";
import { persistFinishedAgentRun } from "./agentWitchRunFinish";
import { appendWriterTranscriptTurn } from "./writerSessionTranscriptStore";
import { buildAgentRunWriterExecutionHonestyChunk } from "./dispatch/buildAgentRunWriterExecutionHonestyChunk";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { appendWriterLlmUsageFooter } from "@/lib/agentWitch/formatWriterLlmUsageFooter";
import type WriterLlmUsage from "@/lib/agentWitch/writerLlmUsage.type";

import {
  beginAgentWitchWriterWork,
  endAgentWitchWriterWork,
} from "./agentWitchWriterWorkGuard";

import { runWriterApiPrompt } from "./writerApi/runWriterApiPrompt";
import { shouldUseWriterApi } from "./writerApi/shouldUseWriterApi";
import {
  buildAgentRunReportHeartbeatPayload,
  readAgentRunReportFile,
  resolveAgentRunCompletionFromReport,
  seedAgentRunReportFile,
} from "./agentWitchRunReport";
import type { StartRunHeartbeatOptions } from "./agentWitchRunHeartbeat";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";

import type WebSocket from "ws";

export { parseAwaitingInputFromOutput } from "./agentWitchRunSessionsAwaitingInput";

interface ActiveRunSession {
  readonly originalPrompt: string;
  readonly userTranscriptPrompt: string;
  readonly writerAgent: HarnessWriterAgentId;
  readonly projectFolderPath?: string;
  readonly reportKey?: string;
  accumulatedOutput: string;
}

const activeChildren = new Map<string, ChildProcess>();
const runSessions = new Map<string, ActiveRunSession>();
const runsStoppedByUser = new Set<string>();
/** S0-6: runs stopped by the wall-clock session limit (not by the user). */
const runsStoppedBySessionLimit = new Set<string>();
const taskStartedAtMsByRunId = new Map<string, number>();

const noteTaskStarted = (agentRunId: string | undefined): void => {
  if (agentRunId !== undefined && !taskStartedAtMsByRunId.has(agentRunId)) {
    taskStartedAtMsByRunId.set(agentRunId, Date.now());
  }
};

const publishTerminalStreamChunk = (
  socket: WebSocket,
  agentRunId: string,
  requestId: string | undefined,
  chunk: string,
): void => {
  const text = chunk.endsWith("\n") ? chunk : `${chunk}\n`;
  if (isTerminalStreamAccepted(agentRunId)) {
    sendMessage(socket, {
      type: "terminal.stream.chunk",
      payload: { runId: agentRunId, chunk: text },
      requestId,
    });
    return;
  }
  queueTerminalStreamChunk(agentRunId, text);
};

const seedWriterApiMissingCliFallbackHonesty = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string,
  requestId: string | undefined,
  writerAgent: HarnessWriterAgentId,
): void => {
  if (!shouldEmitWriterApiMissingCliFallbackHonesty(config, writerAgent)) {
    return;
  }
  const chunk = `${buildAgentRunWriterExecutionHonestyChunk()}\n`;
  publishTerminalStreamChunk(socket, agentRunId, requestId, chunk);
  const session = runSessions.get(agentRunId);
  if (session !== undefined) {
    session.accumulatedOutput =
      session.accumulatedOutput.length > 0
        ? `${session.accumulatedOutput}\n\n${chunk}`.trim()
        : chunk;
  }
};

const STOPPED_EXIT_CODE = 130;
const STOPPED_OUTPUT_SUFFIX = "\n\nStopped by user.";

const resolveUserTranscriptPrompt = (
  wrappedPrompt: string,
  explicitPrompt: string | undefined,
): string => {
  const explicit = explicitPrompt?.trim() ?? "";
  if (explicit.length > 0) {
    return explicit;
  }

  return extractUserTaskFromWrappedPrompt(wrappedPrompt);
};

let cloudApiConfig: AgentWitchCloudApiConfig | null = null;

export const configureAgentWitchRunCloudApi = (
  config: AgentWitchCloudApiConfig | null,
): void => {
  cloudApiConfig = config;
};

export const publishAgentRunEstimateComparison = (
  reportsDir: string,
  agentRunId: string,
): void => {
  if (cloudApiConfig === null) {
    return;
  }

  const comparison = readAgentRunEstimateComparison(reportsDir, agentRunId);
  if (
    comparison === null ||
    (comparison.estimateSeconds === null && comparison.actualSeconds === null)
  ) {
    return;
  }

  void reportAgentRunEstimateComparisonOnCloud(
    cloudApiConfig,
    agentRunId,
    comparison,
  );
};

export const flushPendingAgentRunCompletions = async (
  layout: AgentWitchLocalLayout,
): Promise<void> => {
  await flushAgentRunCompletionOutbox({
    layout,
    cloudApi: cloudApiConfig,
  });
};

const isPipeChildAlive = (agentRunId: string): boolean => {
  const child = activeChildren.get(agentRunId);
  if (child === undefined || child.killed || child.exitCode !== null) {
    return false;
  }
  if (typeof child.pid !== "number") {
    return false;
  }
  return isProcessAlive(child.pid);
};

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

const buildRunReportHeartbeatOptions = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string,
  requestId: string | undefined,
  projectFolderPath: string | undefined,
  reportKey: string | undefined,
  awaitingInput = false,
): StartRunHeartbeatOptions => ({
  awaitingInput,
  onTick: () => {
    if (
      projectFolderPath === undefined ||
      projectFolderPath.trim().length === 0 ||
      reportKey === undefined ||
      reportKey.trim().length === 0
    ) {
      return {};
    }

    const report = readAgentRunReportFile(reportKey);
    const session = runSessions.get(agentRunId);
    if (report !== null && session !== undefined) {
      const completion = resolveAgentRunCompletionFromReport(report);
      const childAlive =
        isPipeChildAlive(agentRunId) || isAgentPtyRunAlive(agentRunId);
      if (completion !== null && !childAlive) {
        finishRun(
          config,
          socket,
          agentRunId,
          requestId,
          completion.exitCode,
          completion.output,
          session.originalPrompt,
        );
      }
    }

    return buildAgentRunReportHeartbeatPayload(report);
  },
});

const finishRun = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string | undefined,
  requestId: string | undefined,
  exitCode: number,
  output: string,
  originalPrompt: string,
  llmUsage?: WriterLlmUsage,
): void => {
  const printed = resolveClaudeCliPrintOutput(output, llmUsage);
  let resolvedExitCode = exitCode;
  let resolvedOutput = appendWriterLlmUsageFooter(
    printed.output,
    printed.llmUsage,
  );

  if (agentRunId !== undefined) {
    const startedAtMs = taskStartedAtMsByRunId.get(agentRunId);
    taskStartedAtMsByRunId.delete(agentRunId);
    if (startedAtMs !== undefined) {
      recordAgentRunEstimateActual({
        reportsDir: config.layout.reportsDir,
        agentRunId,
        actualSeconds: Math.max(
          1,
          Math.round((Date.now() - startedAtMs) / 1000),
        ),
      });
    }

    const actualTokens = readActualTaskTokenCount(
      printed.llmUsage,
      resolvedOutput,
    );
    if (actualTokens !== null) {
      recordAgentRunTokenEstimateActual({
        reportsDir: config.layout.reportsDir,
        agentRunId,
        actualTokens,
      });
    }
  }

  if (agentRunId !== undefined) {
    clearRunSessionLimit(agentRunId);
  }

  if (agentRunId !== undefined && runsStoppedBySessionLimit.has(agentRunId)) {
    runsStoppedBySessionLimit.delete(agentRunId);
    runsStoppedByUser.delete(agentRunId);
    resolvedExitCode = LOCAL_CLI_SESSION_LIMIT_EXIT_CODE;
    resolvedOutput = appendRunSessionLimitNotice(
      resolvedOutput.replace(/\n*Stopped by user\.$/, ""),
    );
  } else if (agentRunId !== undefined && runsStoppedByUser.has(agentRunId)) {
    runsStoppedByUser.delete(agentRunId);
    resolvedExitCode = STOPPED_EXIT_CODE;
    resolvedOutput =
      resolvedOutput.trim().length > 0 &&
      !resolvedOutput.includes("Stopped by user.")
        ? `${resolvedOutput.trim()}${STOPPED_OUTPUT_SUFFIX}`
        : "Stopped by user.";
  }

  const comparison =
    agentRunId !== undefined
      ? readAgentRunEstimateComparison(config.layout.reportsDir, agentRunId)
      : null;

  if (agentRunId !== undefined) {
    stopRunHeartbeat(agentRunId);
    removeRunCompositionOverlay(config.layout, agentRunId);

    if (isTerminalStreamAccepted(agentRunId)) {
      sendMessage(socket, {
        type: "terminal.stream.end",
        payload: { runId: agentRunId },
        requestId,
      });
      clearTerminalStreamState(agentRunId);
    }

    const session = runSessions.get(agentRunId);
    recordAgentRunPromptExchange({
      reportsDir: config.layout.reportsDir,
      agentRunId,
      input: extractUserTaskFromWrappedPrompt(originalPrompt),
      output: resolvedOutput,
      ...(session !== undefined
        ? {
            writerLabel: resolveTaskWriterEstimateLabel({
              writerAgent: session.writerAgent,
              writerExecutionBackend: config.writerExecutionBackend,
              configPath: config.layout.configPath,
            }),
          }
        : {}),
    });
    if (session !== undefined) {
      appendWriterTranscriptTurn({
        layout: config.layout,
        writerAgent: session.writerAgent,
        projectFolderPath: session.projectFolderPath,
        userPrompt: session.userTranscriptPrompt,
        assistantOutput: resolvedOutput,
        agentRunId,
      });
    }

    persistFinishedAgentRun(config.layout, {
      agentRunId,
      originalPrompt,
      exitCode: resolvedExitCode,
      output: resolvedOutput,
      layout: config.layout,
    });

    enqueueAgentRunCompletionOutbox(config.layout, {
      runId: agentRunId,
      exitCode: resolvedExitCode,
      output: resolvedOutput,
      createdAt: new Date().toISOString(),
      ...(typeof comparison?.estimateSeconds === "number"
        ? { estimateSeconds: comparison.estimateSeconds }
        : {}),
      ...(typeof comparison?.actualSeconds === "number"
        ? { actualSeconds: comparison.actualSeconds }
        : {}),
    });
    void flushAgentRunCompletionOutbox({
      layout: config.layout,
      cloudApi: cloudApiConfig,
    });

    runSessions.delete(agentRunId);
    activeChildren.delete(agentRunId);
    removePendingRunInputSession(config.layout, agentRunId);
  }

  sendMessage(socket, {
    type: "command.claude.result",
    payload: {
      exitCode: resolvedExitCode,
      output: resolvedOutput,
      ...(agentRunId !== undefined ? { agentRunId } : {}),
      ...(typeof comparison?.estimateSeconds === "number"
        ? { estimateSeconds: comparison.estimateSeconds }
        : {}),
      ...(typeof comparison?.actualSeconds === "number"
        ? { actualSeconds: comparison.actualSeconds }
        : {}),
      ...(llmUsage !== undefined ? { llmUsage } : {}),
    },
    requestId,
  });

  endAgentWitchWriterWork(config.layout);
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
  // The CLI has exited while we wait for a human answer; the continuation
  // turn re-arms the session limit when it starts a new process.
  clearRunSessionLimit(agentRunId);

  savePendingRunInputSession(config.layout, {
    agentRunId,
    originalPrompt,
    partialOutput,
    question,
    accumulatedOutput,
  });

  // Keep run.heartbeat alive while waiting so cloud does not stale-fail the job.
  startRunHeartbeat(
    socket,
    agentRunId,
    () => hasPendingRunInputSession(config.layout, agentRunId),
    buildRunReportHeartbeatOptions(
      config,
      socket,
      agentRunId,
      requestId,
      session?.projectFolderPath,
      session?.reportKey,
      true,
    ),
  );

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
  userTranscriptPrompt: string,
  writerAgent: HarnessWriterAgentId,
): void => {
  const outputChunks: string[] = [];
  let inputRequested = false;

  const emitTerminalStreamChunk = (text: string): void => {
    if (agentRunId === undefined || text.length === 0) {
      return;
    }

    if (isTerminalStreamAccepted(agentRunId)) {
      sendMessage(socket, {
        type: "terminal.stream.chunk",
        payload: { runId: agentRunId, chunk: text },
        requestId,
      });
      return;
    }

    queueTerminalStreamChunk(agentRunId, text);
  };

  if (agentRunId !== undefined) {
    const existingSession = runSessions.get(agentRunId);
    activeChildren.set(agentRunId, child);
    runSessions.set(agentRunId, {
      originalPrompt,
      userTranscriptPrompt:
        existingSession?.userTranscriptPrompt ?? userTranscriptPrompt,
      writerAgent,
      projectFolderPath: existingSession?.projectFolderPath,
      reportKey: existingSession?.reportKey,
      accumulatedOutput: existingSession?.accumulatedOutput ?? "",
    });
    sendMessage(socket, {
      type: "terminal.stream.start",
      payload: { runId: agentRunId },
      requestId,
    });
    startRunHeartbeat(
      socket,
      agentRunId,
      () => isPipeChildAlive(agentRunId),
      buildRunReportHeartbeatOptions(
        config,
        socket,
        agentRunId,
        requestId,
        existingSession?.projectFolderPath,
        existingSession?.reportKey,
      ),
    );
  }

  const bufferClaudeJson = writerAgent === "claude-cli";
  const stdoutChunks: string[] = [];

  child.stdout?.on("data", (chunk: Buffer) => {
    const text = chunk.toString("utf8");
    if (bufferClaudeJson) {
      stdoutChunks.push(text);
    } else {
      outputChunks.push(text);
      emitTerminalStreamChunk(text);
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
    const text = chunk.toString("utf8");
    outputChunks.push(text);
    emitTerminalStreamChunk(text);
  });

  child.on("close", (exitCode) => {
    if (inputRequested) {
      return;
    }

    markWriterConversationStarted(writerAgent);

    const session =
      agentRunId !== undefined ? runSessions.get(agentRunId) : undefined;
    const printed = bufferClaudeJson
      ? resolveClaudeCliPrintOutput(stdoutChunks.join(""))
      : {
          output: outputChunks.join("").trim(),
          llmUsage: undefined,
        };
    const stderrText = bufferClaudeJson ? outputChunks.join("").trim() : "";
    const visibleOutput = [printed.output.trim(), stderrText]
      .filter((part) => part.length > 0)
      .join("\n");
    if (bufferClaudeJson && printed.output.trim().length > 0) {
      emitTerminalStreamChunk(printed.output);
    }
    const mergedOutput =
      session !== undefined && session.accumulatedOutput.length > 0
        ? `${session.accumulatedOutput}\n\n${visibleOutput}`.trim()
        : visibleOutput;

    finishRun(
      config,
      socket,
      agentRunId,
      requestId,
      exitCode ?? -1,
      mergedOutput,
      originalPrompt,
      printed.llmUsage,
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

const runWriterApiTask = (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
  requestId: string | undefined,
  socket: WebSocket,
  agentRunId?: string,
  projectFolderPath?: string,
  reportKey?: string,
  userTranscriptPrompt?: string,
): void => {
  const resolvedTranscriptPrompt = resolveUserTranscriptPrompt(
    prompt,
    userTranscriptPrompt,
  );

  if (agentRunId !== undefined) {
    runSessions.set(agentRunId, {
      originalPrompt: prompt,
      userTranscriptPrompt: resolvedTranscriptPrompt,
      writerAgent,
      projectFolderPath,
      reportKey,
      accumulatedOutput: "",
    });
    sendMessage(socket, {
      type: "terminal.stream.start",
      payload: { runId: agentRunId },
      requestId,
    });
    startRunHeartbeat(
      socket,
      agentRunId,
      () => runSessions.has(agentRunId),
      buildRunReportHeartbeatOptions(
        config,
        socket,
        agentRunId,
        requestId,
        projectFolderPath,
        reportKey,
      ),
    );
  }

  const emitTerminalStreamChunk = (text: string): void => {
    if (agentRunId === undefined || text.length === 0) {
      return;
    }
    if (isTerminalStreamAccepted(agentRunId)) {
      sendMessage(socket, {
        type: "terminal.stream.chunk",
        payload: { runId: agentRunId, chunk: text },
        requestId,
      });
      return;
    }
    queueTerminalStreamChunk(agentRunId, text);
  };

  void runWriterApiPrompt(config, writerAgent, prompt, emitTerminalStreamChunk)
    .then((result) => {
      markWriterConversationStarted(writerAgent);
      finishRun(
        config,
        socket,
        agentRunId,
        requestId,
        result.exitCode,
        result.output,
        prompt,
        result.llmUsage,
      );
    })
    .catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      finishRun(config, socket, agentRunId, requestId, -1, message, prompt);
    });
};

export const runWriterTask = (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
  requestId: string | undefined,
  socket: WebSocket,
  agentRunId?: string,
  invocationOptions?: BuildWriterCliInvocationOptions,
  shellSessionId?: string,
  projectFolderPath?: string,
  reportKey?: string,
  userTranscriptPrompt?: string,
  processEnv?: NodeJS.ProcessEnv,
): void => {
  const resolvedTranscriptPrompt = resolveUserTranscriptPrompt(
    prompt,
    userTranscriptPrompt,
  );

  beginAgentWitchWriterWork(config.layout);

  if (shouldUseWriterApi(config, writerAgent)) {
    noteTaskStarted(agentRunId);
    runWriterApiTask(
      config,
      writerAgent,
      prompt,
      requestId,
      socket,
      agentRunId,
      projectFolderPath,
      reportKey,
      resolvedTranscriptPrompt,
    );
    return;
  }

  const invocation = buildWriterCliInvocation(
    writerAgent,
    prompt,
    resolveWriterCommands(config),
    invocationOptions,
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

  noteTaskStarted(agentRunId);

  const cwd = resolveWriterTaskCwd({
    workspace: config.workspace,
    projectFolderPath,
  });

  const startPipeChild = (): void => {
    const child = spawn(invocation.command, [...invocation.args], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: processEnv ?? process.env,
      // Own process group so a stop / session limit kills the whole tree.
      detached: process.platform !== "win32",
    });
    attachChildHandlers(
      config,
      child,
      socket,
      requestId,
      agentRunId,
      prompt,
      resolvedTranscriptPrompt,
      writerAgent,
    );
  };

  if (agentRunId === undefined) {
    startPipeChild();
    return;
  }

  // S0-6: hard wall-clock limit; expiry goes through the stop-run path.
  armRunSessionLimit(agentRunId, () => {
    stopAgentRunForSessionLimit(config, socket, agentRunId, requestId);
  });

  runSessions.set(agentRunId, {
    originalPrompt: prompt,
    userTranscriptPrompt: resolvedTranscriptPrompt,
    writerAgent,
    projectFolderPath,
    reportKey,
    accumulatedOutput: runSessions.get(agentRunId)?.accumulatedOutput ?? "",
  });

  seedWriterApiMissingCliFallbackHonesty(
    config,
    socket,
    agentRunId,
    requestId,
    writerAgent,
  );

  if (
    projectFolderPath !== undefined &&
    projectFolderPath.trim().length > 0 &&
    reportKey !== undefined &&
    reportKey.trim().length > 0
  ) {
    seedAgentRunReportFile({
      reportKey,
      agentRunId,
      userSummary: "Task started on your computer.",
    });
  }

  // Cover the pre-spawn / hung-spawn window before PTY or pipe attaches.
  startRunHeartbeat(
    socket,
    agentRunId,
    () => runSessions.has(agentRunId),
    buildRunReportHeartbeatOptions(
      config,
      socket,
      agentRunId,
      requestId,
      projectFolderPath,
      reportKey,
    ),
  );

  void tryRunWriterTaskInPty({
    socket,
    sendMessage,
    requestId,
    agentRunId,
    shellSessionId,
    command: invocation.command,
    args: invocation.args,
    cwd,
    processEnv,
    originalPrompt: prompt,
    writerAgent,
    onInputRequired: (parsed) => {
      if (shellSessionId !== undefined) {
        closeShellPtySession(
          shellSessionId,
          (message) => {
            sendMessage(socket, message);
          },
          requestId,
        );
      }
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
      requestRunInput(
        config,
        socket,
        agentRunId,
        requestId,
        parsed.question,
        mergedOutput,
        prompt,
      );
    },
    onFinished: (exitCode, output) => {
      markWriterConversationStarted(writerAgent);
      const printed = resolveClaudeCliPrintOutput(output);
      const session = runSessions.get(agentRunId);
      const mergedOutput =
        session !== undefined && session.accumulatedOutput.length > 0
          ? `${session.accumulatedOutput}\n\n${printed.output}`.trim()
          : printed.output;
      finishRun(
        config,
        socket,
        agentRunId,
        requestId,
        exitCode,
        mergedOutput,
        prompt,
        printed.llmUsage,
      );
    },
  })
    .then((usedPty) => {
      if (!usedPty) {
        startPipeChild();
        return;
      }
      startRunHeartbeat(
        socket,
        agentRunId,
        () => isAgentPtyRunAlive(agentRunId),
        buildRunReportHeartbeatOptions(
          config,
          socket,
          agentRunId,
          requestId,
          projectFolderPath,
          reportKey,
        ),
      );
    })
    .catch((error: unknown) => {
      console.error(
        "[agent-witch] Writer PTY path failed; falling back to pipe:",
        error instanceof Error ? error.message : error,
      );
      startPipeChild();
    });
};

export const runClaudeTask = (
  config: AgentWitchRunConfig,
  prompt: string,
  requestId: string | undefined,
  socket: WebSocket,
  agentRunId?: string,
): void => {
  runWriterTask(config, "claude-cli", prompt, requestId, socket, agentRunId);
};

export const continueClaudeTaskAfterInput = (
  config: AgentWitchRunConfig,
  input: {
    readonly agentRunId: string;
    readonly originalPrompt: string;
    readonly partialOutput: string;
    readonly question: string;
    readonly response: string;
    readonly shellSessionId?: string;
  },
  requestId: string | undefined,
  socket: WebSocket,
): void => {
  removePendingRunInputSession(config.layout, input.agentRunId);
  if (input.shellSessionId !== undefined) {
    sendMessage(socket, {
      type: "shell.data",
      payload: {
        shellSessionId: input.shellSessionId,
        chunk: `\r\n[checkpoint answer] ${input.response}\r\n`,
      },
      requestId,
    });
  }
  const continuationPrompt = buildContinuationPrompt(input);
  const session = runSessions.get(input.agentRunId);
  const writerAgent = session?.writerAgent ?? "claude-cli";
  const projectFolderPath = session?.projectFolderPath;
  const reportKey = session?.reportKey;
  runWriterTask(
    config,
    writerAgent,
    continuationPrompt,
    requestId,
    socket,
    input.agentRunId,
    undefined,
    input.shellSessionId,
    projectFolderPath,
    reportKey,
    session?.userTranscriptPrompt,
  );
};

export const replayPendingRunInputRequests = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
): void => {
  for (const session of listPendingRunInputSessions(config.layout)) {
    runSessions.set(session.agentRunId, {
      originalPrompt: session.originalPrompt,
      userTranscriptPrompt: extractUserTaskFromWrappedPrompt(
        session.originalPrompt,
      ),
      writerAgent: "claude-cli",
      accumulatedOutput: session.accumulatedOutput,
    });
    startRunHeartbeat(
      socket,
      session.agentRunId,
      () => hasPendingRunInputSession(config.layout, session.agentRunId),
      { awaitingInput: true },
    );
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

export const stopAgentRun = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string,
  requestId?: string,
): boolean => {
  const session = runSessions.get(agentRunId);
  if (session === undefined) {
    return false;
  }

  runsStoppedByUser.add(agentRunId);
  stopRunHeartbeat(agentRunId);
  clearRunSessionLimit(agentRunId);

  const child = activeChildren.get(agentRunId);
  if (child !== undefined) {
    killChildProcessTree(child);
    return true;
  }

  if (killAgentPtyByRunId(agentRunId)) {
    return true;
  }

  removePendingRunInputSession(config.layout, agentRunId);
  const output =
    session.accumulatedOutput.trim().length > 0
      ? `${session.accumulatedOutput.trim()}${STOPPED_OUTPUT_SUFFIX}`
      : "Stopped by user.";

  finishRun(
    config,
    socket,
    agentRunId,
    requestId,
    STOPPED_EXIT_CODE,
    output,
    session.originalPrompt,
  );

  return true;
};

/**
 * S0-6: the session limit fired. Same kill path as a user stop (process tree
 * for pipe runs, PTY kill otherwise); finishRun reports it as a session limit.
 */
export const stopAgentRunForSessionLimit = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  agentRunId: string,
  requestId?: string,
): boolean => {
  if (!runSessions.has(agentRunId)) {
    return false;
  }
  runsStoppedBySessionLimit.add(agentRunId);
  return stopAgentRun(config, socket, agentRunId, requestId);
};
