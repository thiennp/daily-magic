import crypto from "node:crypto";
import { spawn, type ChildProcess } from "node:child_process";

import {
  createBoundedRunIdLedger,
  isCodingToolsPaused,
  removeRunCompositionOverlay,
  scrubOutboundRunFrame,
  shouldEmitWriterApiMissingCliFallbackHonesty,
} from "@agent-witch/install-runtime-client";
import {
  formatLocalCodingToolRefusal,
  LocalCodingToolRefusalCode,
  scrubOutboundSecrets,
  type LocalCodingToolRefusalCodeValue,
} from "@agent-witch/shared/dispatch";
import {
  acquireFolderWriteLock,
  releaseFolderWriteLocksForRun,
} from "@agent-witch/live-projects";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  buildWriterCliInvocation,
  type BuildWriterCliInvocationOptions,
  type HarnessWriterAgentId,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";
import { AGENT_RUN_REPORT_STATUSES } from "./dispatch/agentRunReport.constant";
import { ensureAntigravityCliHeadlessPermissionsBeforeRun } from "./ensureAntigravityCliHeadlessPermissions";
import {
  hasPendingRunInputSession,
  listPendingRunInputSessions,
  loadPendingRunInputSession,
  removePendingRunInputSession,
  savePendingRunInputSession,
  type PendingRunInputSession,
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
import { persistPendingRunResultDelivery } from "./agentWitchPendingRunResultDelivery";
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
import { isInstructionTemplateText } from "./agentWitchAwaitingInputEcho";
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
  registerAgentWitchWriterWorkPid,
  endAgentWitchWriterWork,
} from "./agentWitchWriterWorkGuard";

import { runWriterApiPrompt } from "./writerApi/runWriterApiPrompt";
import { shouldUseWriterApi } from "./writerApi/shouldUseWriterApi";
import {
  buildAgentRunReportHeartbeatPayload,
  readAgentRunReportFile,
  resolveAgentRunCompletionFromReport,
  seedAgentRunReportFile,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";
import { finalizeAgentRunReportOnFinish } from "./agentWitchRunReportFinalize";
import type { StartRunHeartbeatOptions } from "./agentWitchRunHeartbeat";
import { resolveAgentWitchLiveRunSocket } from "./agentWitchLiveRunSocket";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";

import type WebSocket from "ws";

export { parseAwaitingInputFromOutput } from "./agentWitchRunSessionsAwaitingInput";

interface ActiveRunSession {
  readonly originalPrompt: string;
  readonly userTranscriptPrompt: string;
  readonly writerAgent: HarnessWriterAgentId;
  readonly projectFolderPath?: string;
  readonly reportKey?: string;
  /** Project id from dispatch payload when the run is project-scoped. */
  readonly projectId?: string;
  accumulatedOutput: string;
}

const activeChildren = new Map<string, ChildProcess>();
const runSessions = new Map<string, ActiveRunSession>();
const runsStoppedByUser = new Set<string>();
/** S0-6: runs stopped by the wall-clock session limit (not by the user). */
const runsStoppedBySessionLimit = new Set<string>();
const taskStartedAtMsByRunId = new Map<string, number>();
/** S0-7c: a run result is finished (and posted) at most once per process. */
const finishedRunIds = createBoundedRunIdLedger();

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

let runResultObserver: ((message: Record<string, unknown>) => void) | null =
  null;

/** Lets the client observe the final run result this module emits (e.g. project knowledge capture). */
export const setAgentWitchRunResultObserver = (
  observer: ((message: Record<string, unknown>) => void) | null,
): void => {
  runResultObserver = observer;
};

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
  const activeSocket = resolveAgentWitchLiveRunSocket(socket);
  if (activeSocket.readyState === 1) {
    // S0-8: scrub run output before it leaves the machine.
    activeSocket.send(JSON.stringify(scrubOutboundRunFrame(message)));
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
  errorCode?: LocalCodingToolRefusalCodeValue,
): void => {
  if (agentRunId !== undefined) {
    // Heartbeat tick and child close can both finish a run; only the first wins.
    if (finishedRunIds.has(agentRunId)) {
      return;
    }
    finishedRunIds.add(agentRunId);
  }
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

  // S0-8: redact secrets before the output is stored locally (transcript,
  // run history = the report). Outbound copies (outbox, result frame) are
  // scrubbed again and hidden entirely when a secret shape survives.
  resolvedOutput = scrubOutboundSecrets(resolvedOutput).scrubbed;

  if (agentRunId !== undefined) {
    const reportKey = runSessions.get(agentRunId)?.reportKey?.trim() ?? "";
    if (reportKey.length > 0) {
      try {
        finalizeAgentRunReportOnFinish({
          reportKey,
          agentRunId,
          exitCode: resolvedExitCode,
          output: resolvedOutput,
          stoppedExitCode: STOPPED_EXIT_CODE,
          sessionLimitExitCode: LOCAL_CLI_SESSION_LIMIT_EXIT_CODE,
        });
      } catch (error) {
        console.warn(
          "[agent-witch] Could not finalize the run report:",
          error instanceof Error ? error.message : error,
        );
      }
    }
  }

  const comparison =
    agentRunId !== undefined
      ? readAgentRunEstimateComparison(config.layout.reportsDir, agentRunId)
      : null;

  if (agentRunId !== undefined) {
    stopRunHeartbeat(agentRunId);
    removeRunCompositionOverlay(config.layout, agentRunId);

    const hadTerminalStream = isTerminalStreamAccepted(agentRunId);
    if (hadTerminalStream) {
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
      ...(session !== undefined &&
      session.projectId !== undefined &&
      session.projectId.trim().length > 0
        ? { projectId: session.projectId.trim() }
        : {}),
      ...(session !== undefined ? { writerAgent: session.writerAgent } : {}),
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

    const resultMessage = {
      type: "command.claude.result",
      payload: {
        exitCode: resolvedExitCode,
        output: resolvedOutput,
        agentRunId,
        ...(typeof comparison?.estimateSeconds === "number"
          ? { estimateSeconds: comparison.estimateSeconds }
          : {}),
        ...(typeof comparison?.actualSeconds === "number"
          ? { actualSeconds: comparison.actualSeconds }
          : {}),
        ...(llmUsage !== undefined ? { llmUsage } : {}),
        ...(errorCode !== undefined ? { errorCode } : {}),
      },
      ...(requestId !== undefined ? { requestId } : {}),
    };
    persistPendingRunResultDelivery(config.layout, {
      runId: agentRunId,
      resultMessage,
      ...(hadTerminalStream
        ? {
            terminalEndMessage: {
              type: "terminal.stream.end",
              payload: { runId: agentRunId },
              ...(requestId !== undefined ? { requestId } : {}),
            },
          }
        : {}),
      createdAt: new Date().toISOString(),
    });

    runSessions.delete(agentRunId);
    activeChildren.delete(agentRunId);
    removePendingRunInputSession(config.layout, agentRunId);
  }

  const resultMessageForSocket = {
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
      ...(errorCode !== undefined ? { errorCode } : {}),
    },
    requestId,
  };
  sendMessage(socket, resultMessageForSocket);
  runResultObserver?.(resultMessageForSocket);

  endAgentWitchWriterWork(config.layout, agentRunId);
  if (agentRunId !== undefined) {
    releaseFolderWriteLocksForRun({
      installDir: config.layout.installDir,
      runId: agentRunId,
    });
  }
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
  endAgentWitchWriterWork(config.layout, agentRunId);
  releaseFolderWriteLocksForRun({
    installDir: config.layout.installDir,
    runId: agentRunId,
  });
  const session = runSessions.get(agentRunId);
  const accumulatedOutput = session?.accumulatedOutput ?? partialOutput;
  // The CLI has exited while we wait for a human answer; the continuation
  // turn re-arms the session limit when it starts a new process.
  clearRunSessionLimit(agentRunId);

  const questionTruncated =
    question.length > 280 ? `${question.substring(0, 277)}...` : question;
  console.log(
    `[agent-witch] Run ${agentRunId.substring(0, 8)} paused for input: ${questionTruncated}`,
  );

  if (session?.projectFolderPath && session?.reportKey) {
    upsertAgentRunReportFile({
      reportKey: session.reportKey,
      agentRunId,
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: `Waiting for your answer: ${questionTruncated}`,
    });
  }

  savePendingRunInputSession(config.layout, {
    agentRunId,
    originalPrompt,
    partialOutput,
    question,
    accumulatedOutput,
    writerAgent: session?.writerAgent,
    projectFolderPath: session?.projectFolderPath,
    reportKey: session?.reportKey,
    projectId: session?.projectId,
    savedAt: new Date().toISOString(),
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
      projectId: existingSession?.projectId,
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

  const parkPipeRunForInput = (
    runId: string,
    parsed: NonNullable<ReturnType<typeof parseAwaitingInputFromOutput>>,
  ): void => {
    const session = runSessions.get(runId);
    const mergedOutput = [
      session?.accumulatedOutput ?? "",
      parsed.partialOutput,
    ]
      .filter((value) => value.length > 0)
      .join("\n\n");

    if (session !== undefined) {
      session.accumulatedOutput = mergedOutput;
    }

    activeChildren.delete(runId);
    requestRunInput(
      config,
      socket,
      runId,
      requestId,
      parsed.question,
      mergedOutput,
      originalPrompt,
    );
  };

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

    const parsed = parseAwaitingInputFromOutput(outputChunks.join(""), {
      requireCompleteQuestion: true,
      sentPrompt: originalPrompt,
    });

    if (parsed !== null) {
      inputRequested = true;
      child.kill("SIGTERM");
      parkPipeRunForInput(agentRunId, parsed);
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

    // The CLI may end its turn on the question line without a newline.
    const parsedAtExit =
      agentRunId !== undefined
        ? parseAwaitingInputFromOutput(outputChunks.join(""), {
            sentPrompt: originalPrompt,
          })
        : null;
    if (agentRunId !== undefined && parsedAtExit !== null) {
      inputRequested = true;
      parkPipeRunForInput(agentRunId, parsedAtExit);
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
  projectId?: string,
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
      projectId,
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
  projectId?: string,
): void => {
  const resolvedTranscriptPrompt = resolveUserTranscriptPrompt(
    prompt,
    userTranscriptPrompt,
  );

  const workId = agentRunId ?? crypto.randomUUID();
  const isApi = shouldUseWriterApi(config, writerAgent);
  beginAgentWitchWriterWork(config.layout, workId, isApi);

  const refuse = (code: LocalCodingToolRefusalCodeValue): void => {
    finishRun(
      config,
      socket,
      agentRunId,
      requestId,
      -1,
      formatLocalCodingToolRefusal(code),
      prompt,
      undefined,
      code,
    );
  };

  // S0-7a: last-line pause gate (also covers checkpoint continuations).
  if (isCodingToolsPaused(config.layout.configPath)) {
    refuse(LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED);
    return;
  }

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
      projectId,
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

  // S0-5: a local CLI never falls back to the AWL workspace; the handler
  // already checked the folder against the project's registered folders.
  if (
    projectFolderPath === undefined ||
    projectFolderPath.trim().length === 0
  ) {
    refuse(LocalCodingToolRefusalCode.FOLDER_REQUIRED);
    return;
  }

  const profileEmail = config.layout.profileEmail;
  if (
    agentRunId !== undefined &&
    profileEmail !== null &&
    profileEmail.trim().length > 0
  ) {
    const lock = acquireFolderWriteLock({
      installDir: config.layout.installDir,
      accountEmail: profileEmail,
      folderRealPath: projectFolderPath,
      runId: agentRunId,
    });
    if (!lock.ok) {
      refuse(LocalCodingToolRefusalCode.FOLDER_LOCKED_BY_OTHER_ACCOUNT);
      return;
    }
  }

  noteTaskStarted(agentRunId);

  const cwd = resolveWriterTaskCwd({
    workspace: config.workspace,
    projectFolderPath,
  });

  const startPipeChild = (): void => {
    ensureAntigravityCliHeadlessPermissionsBeforeRun(writerAgent);
    const child = spawn(invocation.command, [...invocation.args], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: processEnv ?? process.env,
      // Own process group so a stop / session limit kills the whole tree.
      detached: process.platform !== "win32",
    });
    if (child.pid !== undefined) {
      registerAgentWitchWriterWorkPid(config.layout, workId, child.pid);
    }
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
    projectId: projectId ?? runSessions.get(agentRunId)?.projectId,
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
    onSpawned: (pid) => {
      registerAgentWitchWriterWorkPid(config.layout, workId, pid);
    },
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
  console.log(
    `[agent-witch] Continuing ${writerAgent} task ${input.agentRunId.substring(0, 8)} after user input…`,
  );
  const projectFolderPath = session?.projectFolderPath;
  const reportKey = session?.reportKey;
  if (
    projectFolderPath !== undefined &&
    projectFolderPath.trim().length > 0 &&
    reportKey !== undefined &&
    reportKey.trim().length > 0
  ) {
    // The answer is in; the report must stop saying "Waiting for your answer".
    upsertAgentRunReportFile({
      reportKey,
      agentRunId: input.agentRunId,
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: "Continuing after your answer.",
    });
  }
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
    undefined,
    session?.projectId,
  );
};

/**
 * b2179f2b (Testi run 3 @292): the checkpoint was answered from job history
 * ("Continue conversation"), which starts a NEW run seeded from the paused
 * one. The paused run kept its awaiting-input heartbeat forever, so Tasks and
 * its host report stayed Running / in_progress after the new run finished.
 * Close the paused run as Done ("continued in a new run") before the new run
 * starts; its local record then seeds the new run's context.
 */
export const supersedePausedRunForContinuation = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  sourceRunId: string,
  continuationRunId: string | undefined,
): boolean => {
  const pending = loadPendingRunInputSession(config.layout, sourceRunId);
  if (pending === null) {
    return false;
  }

  const note =
    continuationRunId !== undefined && continuationRunId.length > 0
      ? `Continued in a new run (${continuationRunId.substring(0, 8)}) after your answer.`
      : "Continued in a new run after your answer.";
  const reportKey = pending.reportKey?.trim() ?? "";
  if (reportKey.length > 0) {
    upsertAgentRunReportFile({
      reportKey,
      agentRunId: sourceRunId,
      status: AGENT_RUN_REPORT_STATUSES.COMPLETED,
      userSummary: note,
    });
  }
  console.log(
    `[agent-witch] Run ${sourceRunId.substring(0, 8)} continues in a new run; closing the paused run.`,
  );
  finishRun(
    config,
    socket,
    sourceRunId,
    undefined,
    0,
    [pending.accumulatedOutput.trim(), note]
      .filter((part) => part.length > 0)
      .join("\n\n"),
    pending.originalPrompt,
  );
  return true;
};

/** Pending checkpoints older than this are dropped on replay instead of re-asked. */
export const PENDING_RUN_INPUT_REPLAY_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * A run paused on our own instruction text echoed by the CLI (codex) can
 * never be answered meaningfully; fail it so the operator can send it again.
 */
const closeFalselyPausedRun = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
  session: PendingRunInputSession,
): void => {
  const message =
    "This run stopped by mistake waiting for an answer. Send it again.";
  removePendingRunInputSession(config.layout, session.agentRunId);
  const reportKey = session.reportKey?.trim() ?? "";
  if (reportKey.length > 0) {
    upsertAgentRunReportFile({
      reportKey,
      agentRunId: session.agentRunId,
      status: AGENT_RUN_REPORT_STATUSES.FAILED,
      userSummary: message,
    });
  }
  console.log(
    `[agent-witch] Run ${session.agentRunId.substring(0, 8)} was paused on instruction text; closing as failed.`,
  );
  finishRun(
    config,
    socket,
    session.agentRunId,
    undefined,
    1,
    message,
    session.originalPrompt,
  );
};

export const replayPendingRunInputRequests = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
): void => {
  const now = Date.now();
  for (const session of listPendingRunInputSessions(config.layout)) {
    if (isInstructionTemplateText(session.question)) {
      closeFalselyPausedRun(config, socket, session);
      continue;
    }
    const parsedSavedAtMs =
      session.savedAt !== undefined ? Date.parse(session.savedAt) : Number.NaN;
    if (Number.isNaN(parsedSavedAtMs)) {
      // Legacy entry: start its expiry clock now.
      savePendingRunInputSession(config.layout, {
        ...session,
        savedAt: new Date(now).toISOString(),
      });
    }
    const savedAtMs = Number.isNaN(parsedSavedAtMs) ? now : parsedSavedAtMs;

    if (now - savedAtMs > PENDING_RUN_INPUT_REPLAY_MAX_AGE_MS) {
      removePendingRunInputSession(config.layout, session.agentRunId);
      // 378558e8: an expired checkpoint must not leave its report open.
      if ((session.reportKey?.trim() ?? "").length > 0 && session.reportKey) {
        upsertAgentRunReportFile({
          reportKey: session.reportKey,
          agentRunId: session.agentRunId,
          status: AGENT_RUN_REPORT_STATUSES.FAILED,
          userSummary: "Expired: no answer within 24 hours.",
        });
      }
      continue;
    }

    runSessions.set(session.agentRunId, {
      originalPrompt: session.originalPrompt,
      userTranscriptPrompt: extractUserTaskFromWrappedPrompt(
        session.originalPrompt,
      ),
      writerAgent:
        session.writerAgent !== undefined &&
        isHarnessWriterAgentId(session.writerAgent)
          ? session.writerAgent
          : "claude-cli",
      accumulatedOutput: session.accumulatedOutput,
      projectFolderPath: session.projectFolderPath,
      reportKey: session.reportKey,
      projectId: session.projectId,
    });
    startRunHeartbeat(
      socket,
      session.agentRunId,
      () => hasPendingRunInputSession(config.layout, session.agentRunId),
      buildRunReportHeartbeatOptions(
        config,
        socket,
        session.agentRunId,
        undefined,
        session.projectFolderPath,
        session.reportKey,
        true,
      ),
    );
    sendMessage(socket, {
      type: "command.claude.input_required",
      payload: {
        agentRunId: session.agentRunId,
        question: session.question,
        partialOutput: session.accumulatedOutput,
      },
      requestId: `replay-input:${session.agentRunId}`,
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

/**
 * S0-7a: stop every active run in this process (pause switch). Runs of other
 * profiles in the same process are included; see the S0 safety doc.
 */
export const stopAllAgentRuns = (
  config: AgentWitchRunConfig,
  socket: WebSocket,
): number =>
  [...runSessions.keys()].filter((agentRunId) =>
    stopAgentRun(config, socket, agentRunId),
  ).length;

export const dropPendingRunInputSession = (
  config: AgentWitchRunConfig,
  agentRunId: string,
): void => {
  removePendingRunInputSession(config.layout, agentRunId);
  stopRunHeartbeat(agentRunId);
  runSessions.delete(agentRunId);
};

export const getRunSessionForTests = (id: string) => runSessions.get(id);
export const clearRunSessionsForTests = () => runSessions.clear();
export const setRunSessionForTests = (id: string, session: ActiveRunSession) =>
  runSessions.set(id, session);
