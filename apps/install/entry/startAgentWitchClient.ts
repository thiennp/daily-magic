import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";

import WebSocket from "ws";

import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "@agent-witch/install-layout";
import {
  bootoutAgentWitchAuxiliaryLaunchAgents,
  bootoutAgentWitchLaunchAgentsForCurrentUser,
  ensureAgentWitchLaunchAgentPlist,
  exitUnlessActiveMacOsConsoleUser,
  kickstartAgentWitchClientLaunchAgents,
  startActiveMacOsConsoleUserGuard,
} from "@agent-witch/install-macos-launch";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  AGENT_WITCH_CONNECTION_STALE_MS,
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
  writeAgentWitchConnectionHealth,
} from "@agent-witch/install-connection-health";
import {
  buildDeviceAuthHelloFields,
  verifyServerAttestationLocally,
} from "@agent-witch/install-device-identity";
import { resolveAgentWitchProcessHost } from "@agent-witch/install-process-host";
import {
  materializeRunScopedCompositionOverlay,
  parseProjectCompositionSnapshotWire,
  removeRunCompositionOverlay,
  resolveRunProjectFolderPath,
  readAgentWitchRunConfig,
  resolveWriterSpawnEnv,
  verifyProjectCompositionSnapshotBlobs,
  waitForAgentWitchClientConfigs as waitForConfigs,
} from "@agent-witch/install-runtime-client";
import type { AgentWitchClientConfig as AgentWitchConfig } from "@agent-witch/install-runtime-client/types";
import {
  ensureAgentWitchInstallVersionRecorded,
  resolveAgentWitchAppOriginFromWsUrl,
  resolveAgentWitchHeartbeatInstallBundleVersion,
} from "@agent-witch/install-self-update";
import {
  appendAgentWitchLocalTraffic,
  recordAgentWitchLocalTraceEvent,
  recordAgentWitchWsTraceFromObject,
} from "@agent-witch/live-diagnostics";
import {
  formatRagContextForPrompt,
  indexAgentWitchRagText,
  queryAgentWitchRag,
} from "@agent-witch/live-knowledge";
import {
  resolveLocalAppPublicKey,
  startAgentWitchLocalApp,
} from "@agent-witch/live-local-server";
import {
  appendAgentWitchMemoryEntry,
  buildWriterSessionColdContinuePrompt,
  endActiveWriterTranscriptSession,
  formatMemoryContextForPrompt,
  loadWriterSessionCanonical,
  readAgentWitchMemoryEntries,
  resolveActiveWriterSessionId,
  resolveWriterDispatchRoute,
  resolveWriterSessionTurn,
  startNewWriterTranscriptSession,
} from "@agent-witch/live-memory";
import {
  captureAgentWitchGitWorktreeSnapshot,
  distillProjectKnowledgeLesson,
  ensureAgentWitchProjectFolder,
  formatAgentWitchGitWorktreeVerdict,
  shouldCaptureRunOutputForProjectKnowledge,
  syncProjectKnowledgeCandidateToCloud,
} from "@agent-witch/live-projects";
import {
  applyHarnessInstallLocally,
  fetchHarnessInstallBundleArtifact,
  parseHarnessInstallBundle,
} from "@agent-witch/live-harness";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";

import {
  acceptTerminalStream,
  AGENT_RUN_WORKING_ESTIMATE_MARKER,
  applyAutomationsRunFromCloud,
  applyAutomationsSyncFromCloud,
  beginAgentWitchWriterWork,
  buildDefaultUserProjectFolderPath,
  deferAgentWitchInstallBundleUpdate,
  deferAgentWitchLocalRestart,
  endAgentWitchWriterWork,
  isAgentWitchWriterWorkInProgress,
  buildWriterCliInvocation,
  buildWriterSessionReadyMessage,
  buildWriterSessionWarmupMessage,
  claimAgentWitchMachineLease,
  clearWriterSession,
  closeShellPtySession,
  configureAgentWitchRunCloudApi,
  continueClaudeTaskAfterInput,
  ensureHarnessWriterCli,
  flushPendingAgentRunCompletions,
  generateAgentRunReportKey,
  appendAgentRunReportDetailsLine,
  isHarnessWriterAgentId,
  isTerminalStreamAccepted,
  isWriterConversationStarted,
  isWriterSessionWarmed,
  listAgentRunsLocal,
  loadAgentRunLocal,
  markWriterSessionWarmed,
  migrateLegacyAgentWitchInstallLogsForActiveProfiles,
  openInteractiveShellPty,
  queueTerminalStreamChunk,
  readInstallBundleVersionFromHeartbeatAck,
  registerAgentWitchProcessTraceHandlers,
  releaseAgentWitchMachineLease,
  replayPendingRunInputRequests,
  requestLocalAgentWitchRestart,
  resizeShellPty,
  resolveAgentWitchCloudApiConfig,
  resolveAgentWitchWakePort,
  resolveWriterCliCommands,
  runAgentRunPreEstimate,
  buildMarketplacePlanEstimateTerminalStreamPayload,
  runLocalInstallBundleUpdate,
  runWriterEnsure,
  runWriterSessionStart,
  runWriterTask,
  seedAgentRunReportFile,
  startAgentWitchInProcessServices,
  stopAgentRun,
  subscribeAgentWitchWriterWorkIdle,
  supportsWriterSessionContinuation,
  takeDeferredAgentWitchInstallBundleUpdate,
  takeDeferredAgentWitchLocalRestartReason,
  supportsWriterSessionWarmup,
  terminateOtherAgentWitchClientProcesses,
  wrapPromptWithAgentRunReportInstruction,
  wrapPromptWithPrerecordedAgentRunEstimate,
  writeShellPtyInput,
} from "./legacyScriptDeps";
const HEARTBEAT_INTERVAL_MS = 30_000;
const MAX_RECONNECT_DELAY_MS = 30_000;
const shellSessionIdByRunId = new Map<string, string>();
const projectFolderPathByRunId = new Map<string, string>();
const projectIdByRunId = new Map<string, string>();
const promptByRunId = new Map<string, string>();
const reportKeyByRunId = new Map<string, string>();
const gitSnapshotBeforeByRunId = new Map<
  string,
  Awaited<ReturnType<typeof captureAgentWitchGitWorktreeSnapshot>>
>();
const runScopedOverlayByRunId = new Map<string, boolean>();

interface AgentWitchOutboundSocket {
  readonly readyState: number;
  send(data: string): void;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const sendMessage = (
  socket: AgentWitchOutboundSocket,
  message: Record<string, unknown>,
  layout?: AgentWitchLocalLayout,
): void => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    if (layout !== undefined) {
      appendAgentWitchLocalTraffic(layout, {
        direction: "out",
        type: String(message.type ?? "unknown"),
        summary: "outbound WS frame",
      });
      recordAgentWitchWsTraceFromObject(layout, "out", message);
    }
  }
};

const asLegacyWebSocket = (socket: AgentWitchOutboundSocket): WebSocket =>
  socket as unknown as WebSocket;

const readHarnessManifest = (
  layout: AgentWitchLocalLayout,
): Record<string, unknown> | null => {
  if (!fs.existsSync(layout.harnessManifestPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.harnessManifestPath, "utf8"),
    );
    if (isRecord(parsed)) {
      return parsed;
    }
  } catch {
    console.error("[agent-witch] Could not parse harness manifest.");
  }

  return null;
};

const reportHarnessManifest = (
  socket: AgentWitchOutboundSocket,
  layout: AgentWitchLocalLayout,
): void => {
  const manifest = readHarnessManifest(layout);
  if (manifest === null) {
    return;
  }

  sendMessage(socket, {
    type: "harness.manifest.report",
    payload: {
      hostname: os.hostname(),
      manifest,
    },
  });
};

const dispatchWriterTask = async (
  config: AgentWitchConfig,
  writerAgent: string,
  prompt: string,
  requestId: string | undefined,
  socket: AgentWitchOutboundSocket,
  agentRunId?: string,
  sessionContinuation = false,
  shellSessionId?: string,
  sourceRunId?: string,
  projectFolderPath?: string,
  reportKey?: string,
  projectId?: string,
  marketplaceTemplateId?: string,
  capabilityId?: string,
): Promise<void> => {
  const resolvedProjectId = projectId?.trim() ?? "";
  if (!isHarnessWriterAgentId(writerAgent)) {
    sendMessage(socket, {
      type: "command.claude.result",
      payload: {
        exitCode: -1,
        output: `Unsupported writer agent: ${writerAgent}`,
        ...(agentRunId !== undefined ? { agentRunId } : {}),
      },
      requestId,
    });
    return;
  }

  const needsWarmup =
    supportsWriterSessionWarmup(writerAgent) &&
    !isWriterSessionWarmed(writerAgent);

  if (needsWarmup) {
    try {
      await ensureHarnessWriterCli(config.layout.installDir, writerAgent);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      sendMessage(socket, {
        type: "command.claude.result",
        payload: {
          exitCode: -1,
          output: `Failed to prepare ${writerAgent}: ${message}`,
          ...(agentRunId !== undefined ? { agentRunId } : {}),
        },
        requestId,
      });
      return;
    }

    markWriterSessionWarmed(writerAgent);
  } else if (!supportsWriterSessionWarmup(writerAgent)) {
    try {
      await ensureHarnessWriterCli(config.layout.installDir, writerAgent);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      sendMessage(socket, {
        type: "command.claude.result",
        payload: {
          exitCode: -1,
          output: `Failed to prepare ${writerAgent}: ${message}`,
          ...(agentRunId !== undefined ? { agentRunId } : {}),
        },
        requestId,
      });
      return;
    }
  }

  const resolvedProjectFolderPath = resolveRunProjectFolderPath(
    projectFolderPath,
    buildDefaultUserProjectFolderPath,
    projectId,
  );
  if (resolvedProjectFolderPath === null) {
    sendMessage(socket, {
      type: "command.claude.result",
      payload: {
        exitCode: -1,
        output:
          "This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",
        ...(agentRunId !== undefined ? { agentRunId } : {}),
      },
      requestId,
    });
    return;
  }
  ensureAgentWitchProjectFolder({
    projectFolderPath: resolvedProjectFolderPath,
    ...(resolvedProjectId.length > 0 ? { projectId: resolvedProjectId } : {}),
  });

  if (!sessionContinuation) {
    startNewWriterTranscriptSession(
      config.layout,
      writerAgent,
      resolvedProjectFolderPath,
    );
  }

  const sessionTurn = resolveWriterSessionTurn({
    sessionContinuation,
    supportsWriterSessionContinuation:
      supportsWriterSessionContinuation(writerAgent),
    isWriterConversationStarted: isWriterConversationStarted(writerAgent),
  });

  const activeSessionId =
    sessionContinuation && sessionTurn === "first"
      ? resolveActiveWriterSessionId(
          config.layout,
          writerAgent,
          resolvedProjectFolderPath,
        )
      : null;
  const canonicalForRoute =
    activeSessionId !== null
      ? loadWriterSessionCanonical(config.layout, activeSessionId)
      : null;
  const hasCanonicalTurns =
    canonicalForRoute !== null && canonicalForRoute.turns.length > 0;

  const dispatchRoute = resolveWriterDispatchRoute({
    sessionContinuation,
    supportsWriterSessionContinuation:
      supportsWriterSessionContinuation(writerAgent),
    isWriterConversationStarted: isWriterConversationStarted(writerAgent),
    hasSourceRunId:
      typeof sourceRunId === "string" && sourceRunId.trim().length > 0,
    hasCanonicalTurns,
    userPromptCharacterCount: prompt.length,
  });

  let resolvedPrompt = prompt;
  if (dispatchRoute.continuationStrategy === "source_run_seed") {
    const priorRun =
      typeof sourceRunId === "string" && sourceRunId.length > 0
        ? loadAgentRunLocal(config.layout, sourceRunId)
        : null;
    if (priorRun !== null) {
      const { buildContinuationPromptWithContext } =
        await import("../../../scripts/buildContinuationPromptWithContext");
      resolvedPrompt = buildContinuationPromptWithContext({
        priorPrompt: priorRun.prompt,
        priorOutput: priorRun.resultOutput ?? "",
        userMessage: prompt,
      });
    }
  } else if (dispatchRoute.continuationStrategy === "transcript_seed") {
    if (canonicalForRoute !== null && canonicalForRoute.turns.length > 0) {
      resolvedPrompt = buildWriterSessionColdContinuePrompt({
        priorTurns: canonicalForRoute.turns,
        userMessage: prompt,
      });
    }
  }

  const ragChunks =
    dispatchRoute.ragLimit > 0
      ? await queryAgentWitchRag({
          layout: config.layout,
          query: resolvedPrompt,
          limit: dispatchRoute.ragLimit,
          minScore: dispatchRoute.ragMinScore,
          projectFolderPath: resolvedProjectFolderPath,
          ...(resolvedProjectId.length > 0
            ? { projectId: resolvedProjectId }
            : {}),
        })
      : [];
  const memoryEntries = dispatchRoute.injectMemory
    ? readAgentWitchMemoryEntries(
        config.layout,
        resolvedProjectFolderPath,
        resolvedProjectId.length > 0 ? resolvedProjectId : undefined,
      )
    : [];
  let promptWithProjectContext = `${formatMemoryContextForPrompt(memoryEntries, dispatchRoute.memoryEntryLimit)}${formatRagContextForPrompt(ragChunks)}${resolvedPrompt}`;

  const resolvedReportKey =
    reportKey?.trim() ??
    (agentRunId !== undefined && resolvedProjectFolderPath.trim().length > 0
      ? generateAgentRunReportKey()
      : undefined);

  if (
    agentRunId !== undefined &&
    resolvedReportKey !== undefined &&
    resolvedReportKey.length > 0 &&
    resolvedProjectFolderPath.trim().length > 0
  ) {
    seedAgentRunReportFile({
      reportKey: resolvedReportKey,
      agentRunId,
      userSummary: "Estimating how long this will take…",
    });

    const preEstimate = await runAgentRunPreEstimate({
      config,
      writerAgent,
      wrappedPrompt: promptWithProjectContext,
      reportKey: resolvedReportKey,
      agentRunId,
      marketplaceTemplateId,
      capabilityId,
    });

    if (preEstimate.marketplacePlanEstimate !== null) {
      const planEstimateProgress =
        buildMarketplacePlanEstimateTerminalStreamPayload({
          runId: agentRunId,
          diagnostics: preEstimate.marketplacePlanEstimate,
        });
      if (isTerminalStreamAccepted(agentRunId)) {
        sendMessage(socket, {
          type: "terminal.stream.chunk",
          payload: planEstimateProgress,
          requestId,
        });
      } else {
        queueTerminalStreamChunk(agentRunId, planEstimateProgress.chunk);
      }
    }

    if (preEstimate.estimateSeconds !== null) {
      const estimateChunk = `${AGENT_RUN_WORKING_ESTIMATE_MARKER}\n${preEstimate.estimateSeconds}\n`;
      if (isTerminalStreamAccepted(agentRunId)) {
        sendMessage(socket, {
          type: "terminal.stream.chunk",
          payload: {
            runId: agentRunId,
            chunk: estimateChunk,
          },
          requestId,
        });
      } else {
        queueTerminalStreamChunk(agentRunId, estimateChunk);
      }
    }

    promptWithProjectContext = wrapPromptWithPrerecordedAgentRunEstimate(
      promptWithProjectContext,
      preEstimate,
    );

    promptWithProjectContext = wrapPromptWithAgentRunReportInstruction(
      promptWithProjectContext,
      {
        agentRunId,
        reportKey: resolvedReportKey,
        reportsDir: config.layout.reportsDir,
        installDir: config.layout.installDir,
      },
    );
  }

  const hasRunScopedOverlay =
    agentRunId !== undefined &&
    runScopedOverlayByRunId.get(agentRunId) === true;

  runWriterTask(
    config,
    writerAgent,
    promptWithProjectContext,
    requestId,
    asLegacyWebSocket(socket),
    agentRunId,
    {
      sessionTurn: dispatchRoute.sessionTurn,
    },
    shellSessionId,
    resolvedProjectFolderPath,
    resolvedReportKey,
    prompt,
    resolveWriterSpawnEnv(config.layout, agentRunId, hasRunScopedOverlay),
  );

  if (agentRunId !== undefined && resolvedProjectFolderPath.trim().length > 0) {
    const gitBefore = await captureAgentWitchGitWorktreeSnapshot(
      resolvedProjectFolderPath,
    );
    gitSnapshotBeforeByRunId.set(agentRunId, gitBefore);
    if (resolvedReportKey !== undefined && resolvedReportKey.length > 0) {
      reportKeyByRunId.set(agentRunId, resolvedReportKey);
    }
  }

  if (needsWarmup && agentRunId !== undefined) {
    sendMessage(socket, {
      type: "terminal.stream.chunk",
      payload: {
        runId: agentRunId,
        chunk: buildWriterSessionWarmupMessage(writerAgent),
      },
      requestId,
    });
  }

  // Conversation is marked started when the writer process finishes
  // (see attachChildHandlers), so the first turn stays a fresh thread.
};

const startWriterSession = async (
  config: AgentWitchConfig,
  writerAgent: string,
  writerSessionId: string,
  requestId: string | undefined,
  socket: AgentWitchOutboundSocket,
): Promise<void> => {
  const sendReady = (output: string, exitCode: number): void => {
    sendMessage(socket, {
      type: "command.writer.session.ready",
      payload: {
        writerAgent,
        writerSessionId,
        output,
        exitCode,
      },
      requestId,
    });
  };

  try {
    let streamedOutput = "";
    const result = await runWriterSessionStart({
      installDir: config.layout.installDir,
      workspace: config.workspace,
      writerAgent,
      runConfig: config,
      commands: resolveWriterCliCommands({
        claudeCommand: config.claudeCommand,
        codexCommand: config.codexCommand,
        cursorCommand: config.cursorCommand,
        antigravityCommand: config.antigravityCommand,
      }),
      onChunk: (chunk) => {
        streamedOutput += chunk;
        sendMessage(socket, {
          type: "command.writer.session.chunk",
          payload: {
            writerAgent,
            writerSessionId,
            chunk,
          },
          requestId,
        });
      },
    });

    const resolvedWriterAgent = isHarnessWriterAgentId(writerAgent)
      ? writerAgent
      : "claude-cli";
    const readyOutput =
      result.exitCode !== 0
        ? result.output
        : streamedOutput.length > 0
          ? buildWriterSessionReadyMessage(resolvedWriterAgent)
          : result.output;

    sendReady(readyOutput, result.exitCode);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[agent-witch] Writer session start failed:", message);
    sendReady(`Failed to start ${writerAgent} session: ${message}\n`, -1);
  }
};

const runWriterProcess = (
  config: AgentWitchConfig,
  writerAgent: string,
  instruction: string,
): Promise<{ readonly exitCode: number; readonly output: string }> =>
  new Promise((resolve) => {
    if (!isHarnessWriterAgentId(writerAgent)) {
      resolve({
        exitCode: -1,
        output: `Unsupported writer agent: ${writerAgent}`,
      });
      return;
    }

    const invocation = buildWriterCliInvocation(
      writerAgent,
      instruction,
      resolveWriterCliCommands({
        claudeCommand: config.claudeCommand,
        codexCommand: config.codexCommand,
        cursorCommand: config.cursorCommand,
        antigravityCommand: config.antigravityCommand,
      }),
    );

    if (invocation === null) {
      resolve({
        exitCode: -1,
        output: "Writer instruction must be a non-empty string.",
      });
      return;
    }

    const outputChunks: string[] = [];
    const child = spawn(invocation.command, [...invocation.args], {
      cwd: config.workspace,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    child.stdout?.on("data", (chunk: Buffer) => {
      outputChunks.push(chunk.toString("utf8"));
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      outputChunks.push(chunk.toString("utf8"));
    });

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

const runDeterministicHarnessInstall = async (
  config: AgentWitchConfig,
  payload: Readonly<Record<string, unknown>>,
  requestId: string | undefined,
  socket: AgentWitchOutboundSocket,
): Promise<boolean> => {
  if (payload.installMethod !== "deterministic-bundle") {
    return false;
  }

  sendMessage(socket, {
    type: "harness.request.ack",
    payload: {
      writerAgent: "deterministic",
      status: "dispatching",
    },
    requestId,
  });

  const inlineBundle = parseHarnessInstallBundle(payload.bundle);
  const bundleFetch = isRecord(payload.bundleFetch)
    ? payload.bundleFetch
    : null;

  const resolvedBundle = await (async () => {
    if (inlineBundle !== null) {
      return inlineBundle;
    }

    if (bundleFetch === null) {
      return null;
    }

    const artifactId =
      typeof bundleFetch.artifactId === "string"
        ? bundleFetch.artifactId.trim()
        : "";
    const contentSha256 =
      typeof bundleFetch.contentSha256 === "string"
        ? bundleFetch.contentSha256.trim()
        : "";

    if (artifactId.length === 0 || contentSha256.length === 0) {
      return null;
    }

    const appOrigin =
      resolveAgentWitchAppOriginFromWsUrl(config.wsUrl) ??
      AGENT_WITCH_DEFAULT_ORIGIN;
    const fetched = await fetchHarnessInstallBundleArtifact({
      appOrigin,
      pairingToken: config.pairingToken,
      artifactId,
      expectedContentSha256: contentSha256,
    });

    return fetched.ok ? fetched.bundle : null;
  })();

  if (resolvedBundle === null) {
    sendMessage(socket, {
      type: "harness.request.result",
      payload: {
        success: false,
        writerAgent: "deterministic",
        errorMessage:
          "deterministic-bundle requires inline bundle or valid bundleFetch.",
      },
      requestId,
    });
    return true;
  }

  const installResult = applyHarnessInstallLocally({
    bundle: resolvedBundle,
    layout: config.layout,
  });

  sendMessage(socket, {
    type: "harness.request.result",
    payload: {
      success: installResult.ok,
      writerAgent: "deterministic",
      exitCode: installResult.ok ? 0 : 1,
      output: installResult.ok
        ? `Installed harness set "${resolvedBundle.slug}" (${installResult.writtenItemCount ?? 0} files).`
        : (installResult.errorMessage ?? "Harness install failed."),
      ...(installResult.ok
        ? {}
        : {
            errorMessage:
              installResult.errorMessage ?? "Harness install failed.",
          }),
    },
    requestId,
  });

  if (installResult.ok) {
    reportHarnessManifest(socket, config.layout);
  }

  return true;
};

const runHarnessRequest = async (
  config: AgentWitchConfig,
  payload: Readonly<Record<string, unknown>>,
  requestId: string | undefined,
  socket: AgentWitchOutboundSocket,
): Promise<void> => {
  if (
    await runDeterministicHarnessInstall(config, payload, requestId, socket)
  ) {
    return;
  }

  const writerAgent =
    typeof payload.writerAgent === "string" ? payload.writerAgent : "";
  const instruction =
    typeof payload.instruction === "string" ? payload.instruction.trim() : "";

  sendMessage(socket, {
    type: "harness.request.ack",
    payload: {
      writerAgent,
      status: "dispatching",
    },
    requestId,
  });

  if (instruction.length === 0) {
    sendMessage(socket, {
      type: "harness.request.result",
      payload: {
        success: false,
        writerAgent,
        errorMessage: "harness.request requires a non-empty instruction.",
      },
      requestId,
    });
    return;
  }

  if (!isHarnessWriterAgentId(writerAgent)) {
    sendMessage(socket, {
      type: "harness.request.result",
      payload: {
        success: false,
        writerAgent,
        errorMessage: `Unsupported writer agent: ${writerAgent}`,
      },
      requestId,
    });
    return;
  }

  beginAgentWitchWriterWork(config.layout);
  const result = await (async () => {
    try {
      await ensureHarnessWriterCli(config.layout.installDir, writerAgent);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        exitCode: -1,
        output: `Failed to prepare ${writerAgent}: ${message}`,
      };
    }

    return runWriterProcess(config, writerAgent, instruction);
  })().finally(() => {
    endAgentWitchWriterWork(config.layout);
  });

  sendMessage(socket, {
    type: "harness.request.result",
    payload: {
      success: result.exitCode === 0,
      writerAgent,
      exitCode: result.exitCode,
      output: result.output,
    },
    requestId,
  });

  reportHarnessManifest(socket, config.layout);
};

const computeReconnectDelayMs = (attempt: number): number => {
  const delayMs = 1000 * 2 ** attempt;
  return Math.min(MAX_RECONNECT_DELAY_MS, delayMs);
};

const createAgentWitchClient = (config: AgentWitchConfig) => {
  const state: {
    socket?: WebSocket;
    heartbeatTimer?: NodeJS.Timeout;
    localHealthTimer?: NodeJS.Timeout;
    reconnectTimer?: NodeJS.Timeout;
    reconnectAttempt: number;
    stopped: boolean;
    wsConnected: boolean;
    lastHeartbeatAt: string | null;
    wakeError: string | null;
    restartInFlight: boolean;
    selfUpdateInFlight: boolean;
  } = {
    reconnectAttempt: 0,
    stopped: false,
    wsConnected: false,
    lastHeartbeatAt: null,
    wakeError: null,
    restartInFlight: false,
    selfUpdateInFlight: false,
  };

  const runLocalRestart = (reason: string): void => {
    if (state.restartInFlight) {
      return;
    }

    if (isAgentWitchWriterWorkInProgress(config.layout)) {
      deferAgentWitchLocalRestart(reason);
      console.log(
        `[agent-witch] Deferring local restart (${reason}) until the active writer task finishes.`,
      );
      return;
    }

    state.restartInFlight = true;
    console.log(`[agent-witch] Local restart requested (${reason})…`);
    state.wakeError = `restart:${reason}`;

    void requestLocalAgentWitchRestart()
      .then((result) => {
        if (result.ok) {
          console.log("[agent-witch] Local restart completed.");
          return;
        }

        if (!result.reachable) {
          state.wakeError =
            "Local restart API unreachable — is the wake server running?";
          console.error(`[agent-witch] ${state.wakeError}`);
          return;
        }

        state.wakeError = "Local restart failed";
        console.error("[agent-witch] Local restart failed.", result.payload);
      })
      .finally(() => {
        state.restartInFlight = false;
      });
  };

  const runLocalSelfUpdateFromHeartbeat = (
    remoteBundleVersion: string,
    trigger: "system.ack" | "install.bundle.update" = "system.ack",
  ): void => {
    if (state.selfUpdateInFlight) {
      return;
    }

    if (isAgentWitchWriterWorkInProgress(config.layout)) {
      deferAgentWitchInstallBundleUpdate({
        layout: config.layout,
        remoteBundleVersion,
        trigger,
      });
      console.log(
        `[agent-witch] Deferring install bundle update (${remoteBundleVersion} via ${trigger}) until the active writer task finishes.`,
      );
      return;
    }

    state.selfUpdateInFlight = true;
    void runLocalInstallBundleUpdate({
      layout: config.layout,
      remoteBundleVersion,
      trigger,
    }).finally(() => {
      state.selfUpdateInFlight = false;
    });
  };

  const checkLocalConnectionHealth = (): void => {
    const health = readAgentWitchConnectionHealth(config.layout);
    // Null = never acked this session; wait for connect() rather than restart.
    if (health === null) {
      return;
    }
    if (
      !isAgentWitchConnectionHealthStale(
        health,
        AGENT_WITCH_CONNECTION_STALE_MS,
      )
    ) {
      return;
    }
    // AGENT-059: recover in-process — process restart spawned duplicate clients.
    console.log(
      "[agent-witch] Connection health stale — reconnecting WebSocket…",
    );
    state.reconnectAttempt = 0;
    clearReconnectTimer();
    closeSocket();
    connect();
  };

  const clearHeartbeat = (): void => {
    if (state.heartbeatTimer !== undefined) {
      clearInterval(state.heartbeatTimer);
      state.heartbeatTimer = undefined;
    }
  };

  const clearLocalHealthCheck = (): void => {
    if (state.localHealthTimer !== undefined) {
      clearInterval(state.localHealthTimer);
      state.localHealthTimer = undefined;
    }
  };

  const clearReconnectTimer = (): void => {
    if (state.reconnectTimer !== undefined) {
      clearTimeout(state.reconnectTimer);
      state.reconnectTimer = undefined;
    }
  };

  const closeSocket = (): void => {
    if (state.socket === undefined) {
      return;
    }
    const socket = state.socket;
    state.socket = undefined;
    state.wsConnected = false;
    socket.removeAllListeners("open");
    socket.removeAllListeners("message");
    socket.removeAllListeners("close");
    socket.on("error", () => {
      // Closing a CONNECTING socket emits error; avoid uncaught 'error' crash.
    });
    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }
  };

  const startLocalHealthCheck = (): void => {
    clearLocalHealthCheck();
    // Defer first check so initial connect() can write a fresh ack.
    state.localHealthTimer = setInterval(
      checkLocalConnectionHealth,
      HEARTBEAT_INTERVAL_MS,
    );
  };

  const scheduleReconnect = (): void => {
    if (state.stopped || state.reconnectTimer !== undefined) {
      return;
    }

    const delayMs = computeReconnectDelayMs(state.reconnectAttempt);
    console.log(`[agent-witch] Reconnecting in ${delayMs}ms…`);

    state.reconnectTimer = setTimeout(() => {
      state.reconnectTimer = undefined;
      connect();
    }, delayMs);
  };

  const startHeartbeat = (socket: WebSocket): void => {
    clearHeartbeat();
    const sendHeartbeat = (): void => {
      const installBundleVersion =
        resolveAgentWitchHeartbeatInstallBundleVersion(
          config.layout.installDir,
        );
      const wakePort = resolveAgentWitchWakePort();
      sendMessage(
        socket,
        {
          type: "agent.heartbeat",
          payload: {
            hostname: os.hostname(),
            macOsUsername: os.userInfo().username,
            wakeError: state.wakeError,
            wakePort,
            ...(config.email !== null ? { email: config.email } : {}),
            installBundleVersion,
          },
        },
        config.layout,
      );
      state.lastHeartbeatAt = new Date().toISOString();
    };
    sendHeartbeat();
    state.heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
  };

  const handleInboundRaw = (
    parsed: Record<string, unknown>,
    socket: AgentWitchOutboundSocket,
  ): void => {
    if (typeof parsed.type !== "string") {
      return;
    }

    appendAgentWitchLocalTraffic(config.layout, {
      direction: "in",
      type: parsed.type,
      summary: "inbound WS frame",
    });
    recordAgentWitchWsTraceFromObject(config.layout, "in", parsed);

    const requestId =
      typeof parsed.requestId === "string" ? parsed.requestId : undefined;

    if (parsed.type === "device.auth.attestation" && isRecord(parsed.payload)) {
      const serverPublicKey =
        typeof parsed.payload.serverPublicKey === "string"
          ? parsed.payload.serverPublicKey
          : "";
      const origin =
        typeof parsed.payload.origin === "string" ? parsed.payload.origin : "";
      const devicePublicKey =
        typeof parsed.payload.devicePublicKey === "string"
          ? parsed.payload.devicePublicKey
          : "";
      const challenge =
        typeof parsed.payload.challenge === "string"
          ? parsed.payload.challenge
          : "";
      const serverAttestation =
        typeof parsed.payload.serverAttestation === "string"
          ? parsed.payload.serverAttestation
          : "";
      const ok = verifyServerAttestationLocally({
        serverPublicKey,
        origin,
        devicePublicKey,
        challenge,
        serverAttestation,
      });
      if (!ok) {
        state.wakeError = "Server attestation verification failed";
        appendAgentWitchLocalTraffic(config.layout, {
          direction: "local",
          type: "device.auth.attestation",
          summary: state.wakeError,
          action: "auth-failed",
        });
        if (state.socket !== undefined) {
          state.socket.close();
        }
        return;
      }
      state.wakeError = null;
    }

    if (parsed.type === "writer.ensure" && isRecord(parsed.payload)) {
      const writerAgent =
        typeof parsed.payload.writerAgent === "string"
          ? parsed.payload.writerAgent
          : "";
      appendAgentWitchLocalTraffic(config.layout, {
        direction: "local",
        type: "writer.ensure",
        summary: writerAgent,
        action: "ensure-writer",
      });
      void runWriterEnsure({
        layout: config.layout,
        writerAgent,
        runConfig: config,
        commands: {
          claudeCommand: config.claudeCommand,
          codexCommand: config.codexCommand,
          cursorCommand: config.cursorCommand,
          antigravityCommand: config.antigravityCommand,
        },
      }).then((status) => {
        sendMessage(
          socket,
          {
            type: "writer.status",
            payload: status,
          },
          config.layout,
        );
      });
    }

    if (parsed.type === "install.bundle.update" && isRecord(parsed.payload)) {
      const remoteBundleVersion =
        typeof parsed.payload.bundleVersion === "string"
          ? parsed.payload.bundleVersion.trim()
          : "";
      if (remoteBundleVersion.length > 0) {
        runLocalSelfUpdateFromHeartbeat(
          remoteBundleVersion,
          "install.bundle.update",
        );
      }
    }

    if (parsed.type === "system.ack") {
      writeAgentWitchConnectionHealth(config.layout, {
        wsUrl: config.wsUrl,
      });
      const ackPayload = isRecord(parsed.payload) ? parsed.payload : null;
      const remoteBundleVersion =
        readInstallBundleVersionFromHeartbeatAck(ackPayload);
      if (remoteBundleVersion !== null) {
        runLocalSelfUpdateFromHeartbeat(remoteBundleVersion);
      }
    }

    if (parsed.type === "device.restart") {
      runLocalRestart("cloud-device-restart");
    }

    if (parsed.type === "automations.sync" && isRecord(parsed.payload)) {
      applyAutomationsSyncFromCloud(parsed.payload);
    }

    if (parsed.type === "automations.run" && isRecord(parsed.payload)) {
      void applyAutomationsRunFromCloud(parsed.payload);
    }

    if (
      parsed.type === "terminal.stream.accepted" &&
      isRecord(parsed.payload)
    ) {
      const runId =
        typeof parsed.payload.runId === "string" ? parsed.payload.runId : "";
      if (runId.length > 0) {
        const pendingChunks = acceptTerminalStream(runId);
        for (const chunk of pendingChunks) {
          sendMessage(socket, {
            type: "terminal.stream.chunk",
            payload: { runId, chunk },
            requestId,
          });
        }
      }
    }

    if (parsed.type === "agent.agentRun.list") {
      sendMessage(socket, {
        type: "dashboard.agentRun.list.result",
        payload: { runs: listAgentRunsLocal(config.layout) },
        requestId,
      });
    }

    if (parsed.type === "agent.agentRun.get" && isRecord(parsed.payload)) {
      const runId =
        typeof parsed.payload.runId === "string" ? parsed.payload.runId : "";
      const run =
        runId.length > 0 ? loadAgentRunLocal(config.layout, runId) : null;
      sendMessage(socket, {
        type: "dashboard.agentRun.get.result",
        payload: { run },
        requestId,
      });
    }

    if (parsed.type === "command.claude.run" && isRecord(parsed.payload)) {
      const prompt = parsed.payload.prompt;
      const writerAgent =
        typeof parsed.payload.writerAgent === "string" &&
        isHarnessWriterAgentId(parsed.payload.writerAgent)
          ? parsed.payload.writerAgent
          : "claude-cli";
      const agentRunId =
        typeof parsed.payload.agentRunId === "string"
          ? parsed.payload.agentRunId
          : undefined;
      const sessionContinuation = parsed.payload.sessionContinuation === true;
      const sourceRunId =
        typeof parsed.payload.sourceRunId === "string"
          ? parsed.payload.sourceRunId
          : undefined;
      const shellSessionId =
        typeof parsed.payload.shellSessionId === "string"
          ? parsed.payload.shellSessionId
          : undefined;
      const projectId =
        typeof parsed.payload.projectId === "string"
          ? parsed.payload.projectId
          : undefined;
      const projectFolderPath = resolveRunProjectFolderPath(
        typeof parsed.payload.projectFolderPath === "string"
          ? parsed.payload.projectFolderPath
          : undefined,
        buildDefaultUserProjectFolderPath,
        projectId,
      );
      const compositionSnapshot = parseProjectCompositionSnapshotWire(
        parsed.payload.compositionSnapshot,
      );
      const reportKey =
        typeof parsed.payload.reportKey === "string"
          ? parsed.payload.reportKey
          : undefined;
      const marketplaceTemplateId =
        typeof parsed.payload.marketplaceTemplateId === "string"
          ? parsed.payload.marketplaceTemplateId
          : undefined;
      const capabilityId =
        typeof parsed.payload.capabilityId === "string"
          ? parsed.payload.capabilityId
          : undefined;

      if (typeof prompt === "string" && prompt.trim().length > 0) {
        console.log(
          `[agent-witch] Running ${writerAgent} task (${sessionContinuation ? "continue" : "first"})…`,
        );
        if (projectFolderPath === null) {
          sendMessage(socket, {
            type: "command.claude.result",
            payload: {
              exitCode: -1,
              output:
                "This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",
              ...(agentRunId !== undefined ? { agentRunId } : {}),
            },
            requestId,
          });
          return;
        }

        if (compositionSnapshot !== null) {
          const blobError = verifyProjectCompositionSnapshotBlobs(
            config.layout,
            compositionSnapshot,
          );

          if (blobError !== null) {
            sendMessage(socket, {
              type: "command.claude.result",
              payload: {
                exitCode: -1,
                output: blobError,
                ...(agentRunId !== undefined ? { agentRunId } : {}),
              },
              requestId,
            });
            return;
          }

          if (agentRunId !== undefined) {
            const overlayResult = materializeRunScopedCompositionOverlay(
              config.layout,
              agentRunId,
              compositionSnapshot,
            );

            if (!overlayResult.ok) {
              sendMessage(socket, {
                type: "command.claude.result",
                payload: {
                  exitCode: -1,
                  output: overlayResult.errorMessage,
                  ...(agentRunId !== undefined ? { agentRunId } : {}),
                },
                requestId,
              });
              return;
            }

            runScopedOverlayByRunId.set(
              agentRunId,
              compositionSnapshot.entries.some(
                (entry) => entry.scope === "run",
              ),
            );
          }
        }

        if (agentRunId !== undefined && shellSessionId !== undefined) {
          shellSessionIdByRunId.set(agentRunId, shellSessionId);
        }
        if (agentRunId !== undefined) {
          projectFolderPathByRunId.set(agentRunId, projectFolderPath);
          if (projectId !== undefined && projectId.trim().length > 0) {
            projectIdByRunId.set(agentRunId, projectId.trim());
          }
          promptByRunId.set(agentRunId, prompt.trim());
          ensureAgentWitchProjectFolder({
            projectFolderPath,
            ...(projectId !== undefined && projectId.trim().length > 0
              ? { projectId: projectId.trim() }
              : {}),
          });
        }
        void dispatchWriterTask(
          config,
          writerAgent,
          prompt.trim(),
          requestId,
          socket,
          agentRunId,
          sessionContinuation,
          shellSessionId,
          sourceRunId,
          projectFolderPath,
          reportKey,
          projectId,
          marketplaceTemplateId,
          capabilityId,
        );
      }
    }

    if (parsed.type === "shell.session.open" && isRecord(parsed.payload)) {
      const shellSessionId =
        typeof parsed.payload.shellSessionId === "string"
          ? parsed.payload.shellSessionId
          : "";
      const cols =
        typeof parsed.payload.cols === "number" ? parsed.payload.cols : 120;
      const rows =
        typeof parsed.payload.rows === "number" ? parsed.payload.rows : 32;
      if (shellSessionId.length > 0) {
        console.log("[agent-witch] Opening interactive Mac shell…");
        void openInteractiveShellPty({
          shellSessionId,
          cwd: config.workspace,
          cols,
          rows,
          send: (message) => {
            sendMessage(socket, message);
          },
          requestId,
        });
      }
    }

    if (parsed.type === "shell.session.close" && isRecord(parsed.payload)) {
      const shellSessionId =
        typeof parsed.payload.shellSessionId === "string"
          ? parsed.payload.shellSessionId
          : "";
      if (shellSessionId.length > 0) {
        closeShellPtySession(
          shellSessionId,
          (message) => {
            sendMessage(socket, message);
          },
          requestId,
        );
      }
    }

    if (parsed.type === "shell.input" && isRecord(parsed.payload)) {
      const shellSessionId =
        typeof parsed.payload.shellSessionId === "string"
          ? parsed.payload.shellSessionId
          : "";
      const data =
        typeof parsed.payload.data === "string" ? parsed.payload.data : "";
      if (shellSessionId.length > 0 && data.length > 0) {
        writeShellPtyInput(shellSessionId, data);
      }
    }

    if (parsed.type === "shell.resize" && isRecord(parsed.payload)) {
      const shellSessionId =
        typeof parsed.payload.shellSessionId === "string"
          ? parsed.payload.shellSessionId
          : "";
      const cols =
        typeof parsed.payload.cols === "number" ? parsed.payload.cols : 0;
      const rows =
        typeof parsed.payload.rows === "number" ? parsed.payload.rows : 0;
      if (shellSessionId.length > 0 && cols > 0 && rows > 0) {
        resizeShellPty(shellSessionId, cols, rows);
      }
    }

    if (
      parsed.type === "command.writer.session.end" &&
      isRecord(parsed.payload)
    ) {
      const writerAgent = parsed.payload.writerAgent;
      if (
        typeof writerAgent === "string" &&
        isHarnessWriterAgentId(writerAgent)
      ) {
        clearWriterSession(writerAgent);
        endActiveWriterTranscriptSession(config.layout, writerAgent);
      }
    }

    if (
      parsed.type === "command.writer.session.start" &&
      isRecord(parsed.payload)
    ) {
      const writerAgent = parsed.payload.writerAgent;
      const writerSessionId =
        typeof parsed.payload.writerSessionId === "string"
          ? parsed.payload.writerSessionId
          : "";
      if (
        typeof writerAgent === "string" &&
        isHarnessWriterAgentId(writerAgent) &&
        writerSessionId.length > 0
      ) {
        console.log(`[agent-witch] Starting ${writerAgent} session…`);
        void startWriterSession(
          config,
          writerAgent,
          writerSessionId,
          requestId,
          socket,
        );
      }
    }

    if (parsed.type === "command.claude.stop" && isRecord(parsed.payload)) {
      const agentRunId =
        typeof parsed.payload.agentRunId === "string"
          ? parsed.payload.agentRunId
          : "";

      if (agentRunId.length > 0) {
        console.log(`[agent-witch] Stopping run ${agentRunId}…`);
        stopAgentRun(config, asLegacyWebSocket(socket), agentRunId, requestId);
      }
    }

    if (
      parsed.type === "command.claude.input_respond" &&
      isRecord(parsed.payload)
    ) {
      const agentRunId =
        typeof parsed.payload.agentRunId === "string"
          ? parsed.payload.agentRunId
          : "";
      const response =
        typeof parsed.payload.response === "string"
          ? parsed.payload.response.trim()
          : "";
      const originalPrompt =
        typeof parsed.payload.originalPrompt === "string"
          ? parsed.payload.originalPrompt
          : "";
      const partialOutput =
        typeof parsed.payload.partialOutput === "string"
          ? parsed.payload.partialOutput
          : "";
      const question =
        typeof parsed.payload.question === "string"
          ? parsed.payload.question
          : "";

      if (
        agentRunId.length > 0 &&
        response.length > 0 &&
        originalPrompt.length > 0
      ) {
        console.log("[agent-witch] Continuing Claude task after user input…");
        continueClaudeTaskAfterInput(
          config,
          {
            agentRunId,
            originalPrompt,
            partialOutput,
            question,
            response,
            shellSessionId: shellSessionIdByRunId.get(agentRunId),
          },
          requestId,
          asLegacyWebSocket(socket),
        );
      }
    }

    if (
      parsed.type === "dispatch.approval.required" &&
      isRecord(parsed.payload)
    ) {
      const requesterEmail =
        typeof parsed.payload.requesterEmail === "string"
          ? parsed.payload.requesterEmail
          : "A teammate";
      const promptPreview =
        typeof parsed.payload.prompt === "string"
          ? parsed.payload.prompt.slice(0, 120)
          : "agent task";
      console.log(
        `[agent-witch] Approval required from ${requesterEmail}: ${promptPreview}`,
      );
      if (process.platform === "darwin") {
        spawn(
          "osascript",
          [
            "-e",
            `display notification "${promptPreview.replace(/"/g, '\\"')}" with title "Agent dispatch approval" subtitle "${requesterEmail.replace(/"/g, '\\"')}"`,
          ],
          { stdio: "ignore" },
        );
      }
    }

    if (parsed.type === "harness.request" && isRecord(parsed.payload)) {
      console.log("[agent-witch] Dispatching harness request…");
      void runHarnessRequest(config, parsed.payload, requestId, socket);
    }

    if (parsed.type === "harness.export.request" && isRecord(parsed.payload)) {
      const borrowerUserId =
        typeof parsed.payload.borrowerUserId === "string"
          ? parsed.payload.borrowerUserId
          : "";
      const targetDeviceId =
        typeof parsed.payload.targetDeviceId === "string"
          ? parsed.payload.targetDeviceId
          : undefined;
      const setSlugs = Array.isArray(parsed.payload.setSlugs)
        ? parsed.payload.setSlugs.filter(
            (slug): slug is string => typeof slug === "string",
          )
        : [];

      if (borrowerUserId.length > 0 && setSlugs.length > 0) {
        void (async () => {
          const { readHarnessExportSets } =
            await import("../../../scripts/readHarnessExportSets");
          const sets = readHarnessExportSets(setSlugs, config.email);
          sendMessage(socket, {
            type: "harness.export.result",
            payload: {
              success: sets.length > 0,
              borrowerUserId,
              ...(targetDeviceId !== undefined ? { targetDeviceId } : {}),
              sets,
              errorMessage:
                sets.length > 0
                  ? undefined
                  : "No readable harness sets were found on this machine.",
            },
            requestId,
          });
        })();
      }
    }

    if (parsed.type === "harness.manifest.request") {
      reportHarnessManifest(socket, config.layout);
    }

    if (parsed.type === "command.claude.result" && isRecord(parsed.payload)) {
      const agentRunId =
        typeof parsed.payload.agentRunId === "string"
          ? parsed.payload.agentRunId
          : undefined;
      const output =
        typeof parsed.payload.output === "string" ? parsed.payload.output : "";
      const exitCode =
        typeof parsed.payload.exitCode === "number"
          ? parsed.payload.exitCode
          : null;
      const projectFolderPath = resolveRunProjectFolderPath(
        agentRunId !== undefined
          ? projectFolderPathByRunId.get(agentRunId)
          : undefined,
        buildDefaultUserProjectFolderPath,
      );
      const projectId =
        agentRunId !== undefined ? projectIdByRunId.get(agentRunId) : undefined;
      const prompt =
        agentRunId !== undefined ? (promptByRunId.get(agentRunId) ?? "") : "";

      const shouldCapture = shouldCaptureRunOutputForProjectKnowledge({
        exitCode,
        output,
      });

      if (shouldCapture && projectFolderPath !== null) {
        void indexAgentWitchRagText({
          layout: config.layout,
          text: output,
          source: agentRunId ?? "command.claude.result",
          projectFolderPath,
          ...(projectId !== undefined ? { projectId } : {}),
        });
      }

      if (
        shouldCapture &&
        prompt.trim().length > 0 &&
        projectFolderPath !== null
      ) {
        appendAgentWitchMemoryEntry({
          layout: config.layout,
          projectFolderPath,
          ...(projectId !== undefined ? { projectId } : {}),
          entry: {
            id: `${Date.now()}-${agentRunId ?? "run"}`,
            ...(agentRunId !== undefined ? { agentRunId } : {}),
            prompt,
            output,
            createdAt: new Date().toISOString(),
          },
        });
      }

      if (agentRunId !== undefined && projectFolderPath !== null) {
        const reportKey = reportKeyByRunId.get(agentRunId);
        const gitBefore = gitSnapshotBeforeByRunId.get(agentRunId);
        if (reportKey !== undefined && gitBefore !== undefined) {
          void captureAgentWitchGitWorktreeSnapshot(projectFolderPath).then(
            (gitAfter) => {
              const verdictLine = formatAgentWitchGitWorktreeVerdict({
                before: gitBefore,
                after: gitAfter,
              });
              appendAgentRunReportDetailsLine(reportKey, verdictLine);
              gitSnapshotBeforeByRunId.delete(agentRunId);
              reportKeyByRunId.delete(agentRunId);
            },
          );
        }
      }

      if (
        shouldCapture &&
        projectId !== undefined &&
        projectId.trim().length > 0
      ) {
        const runConfig = readAgentWitchRunConfig();
        const cloudConfig =
          runConfig === null
            ? null
            : resolveAgentWitchCloudApiConfig({
                wsUrl: runConfig.wsUrl,
                pairingToken: runConfig.pairingToken,
              });
        if (cloudConfig !== null) {
          void syncProjectKnowledgeCandidateToCloud(cloudConfig, projectId, {
            ...(agentRunId !== undefined ? { sourceRunId: agentRunId } : {}),
            lesson: distillProjectKnowledgeLesson({ prompt, output }),
          });
        }
      }

      if (agentRunId !== undefined) {
        removeRunCompositionOverlay(config.layout, agentRunId);
        runScopedOverlayByRunId.delete(agentRunId);
        projectIdByRunId.delete(agentRunId);
      }
    }
  };

  const connect = (): void => {
    if (state.stopped) {
      return;
    }

    clearReconnectTimer();
    closeSocket();

    const socket = new WebSocket(config.wsUrl);
    state.socket = socket;

    socket.on("open", () => {
      state.reconnectAttempt = 0;
      state.wsConnected = true;
      state.wakeError = null;
      console.log(`[agent-witch] Connected to ${config.wsUrl}`);
      if (config.email !== null) {
        console.log(`[agent-witch] Profile: ${config.email}`);
      }
      writeAgentWitchConnectionHealth(config.layout, { wsUrl: config.wsUrl });
      configureAgentWitchRunCloudApi(
        resolveAgentWitchCloudApiConfig({
          wsUrl: config.wsUrl,
          pairingToken: config.pairingToken,
        }),
      );
      void flushPendingAgentRunCompletions(config.layout);

      const origin =
        resolveAgentWitchAppOriginFromWsUrl(config.wsUrl) ??
        "http://localhost:3000";
      const claimToken = process.env.AGENT_WITCH_CLAIM_TOKEN?.trim();
      const auth = buildDeviceAuthHelloFields({
        layout: config.layout,
        origin,
        ...(claimToken !== undefined && claimToken.length > 0
          ? { claimToken }
          : {}),
      });

      sendMessage(
        socket,
        {
          type: "agent.register",
          payload: {
            role: "agent",
            hostname: os.hostname(),
            macOsUsername: os.userInfo().username,
            pairingToken: config.pairingToken,
            ...(config.email !== null ? { email: config.email } : {}),
            ...auth,
          },
        },
        config.layout,
      );
      reportHarnessManifest(socket, config.layout);
      replayPendingRunInputRequests(config, socket);
      startHeartbeat(socket);
    });

    socket.on("message", (data) => {
      const raw = typeof data === "string" ? data : data.toString("utf8");
      try {
        const parsed: unknown = JSON.parse(raw);
        if (!isRecord(parsed)) {
          return;
        }
        handleInboundRaw(parsed, socket);
      } catch {
        console.error("[agent-witch] Failed to parse inbound message.");
      }
    });

    socket.on("close", (code, reason) => {
      clearHeartbeat();
      state.socket = undefined;
      state.wsConnected = false;
      state.reconnectAttempt += 1;
      const reasonText =
        typeof reason === "string" ? reason : reason.toString("utf8");
      recordAgentWitchLocalTraceEvent(config.layout, {
        kind: "ws_close",
        message: "WebSocket closed",
        code,
        reason: reasonText,
      });
      console.log("[agent-witch] Disconnected from server.");
      scheduleReconnect();
    });

    socket.on("error", (error) => {
      state.wakeError = error.message;
      recordAgentWitchLocalTraceEvent(config.layout, {
        kind: "ws_error",
        message: error.message,
        stack: error.stack,
      });
      console.error(`[agent-witch] Socket error: ${error.message}`);
    });
  };

  const stop = (): void => {
    state.stopped = true;
    clearHeartbeat();
    clearLocalHealthCheck();
    clearReconnectTimer();
    closeSocket();
  };

  subscribeAgentWitchWriterWorkIdle(() => {
    const deferredUpdate = takeDeferredAgentWitchInstallBundleUpdate();
    if (
      deferredUpdate !== null &&
      deferredUpdate.layout.installDir === config.layout.installDir &&
      deferredUpdate.layout.profileEmail === config.layout.profileEmail
    ) {
      runLocalSelfUpdateFromHeartbeat(
        deferredUpdate.remoteBundleVersion,
        deferredUpdate.trigger,
      );
    }

    const deferredRestart = takeDeferredAgentWitchLocalRestartReason();
    if (deferredRestart !== null) {
      runLocalRestart(deferredRestart);
    }
  });

  return {
    connect,
    startLocalHealthCheck,
    stop,
    getStatus: () => ({
      wsConnected: state.wsConnected,
      lastHeartbeatAt: state.lastHeartbeatAt,
      wakeError: state.wakeError,
      linkCode: null,
      publicKeyRaw: resolveLocalAppPublicKey(config.layout),
    }),
    reviveWebSocket: (): void => {
      state.reconnectAttempt = 0;
      connect();
    },
    reportHarnessManifestIfConnected: (): {
      readonly ok: boolean;
      readonly errorMessage?: string;
    } => {
      const socket = state.socket;
      if (!state.wsConnected || socket === undefined) {
        return {
          ok: false,
          errorMessage:
            "Not connected to Agent Witch — manifest saved locally only.",
        };
      }

      reportHarnessManifest(socket, config.layout);
      return { ok: true };
    },
  };
};

const main = async (): Promise<void> => {
  exitUnlessActiveMacOsConsoleUser("agent-witch");

  const processHost = resolveAgentWitchProcessHost();
  const installDir = resolveAgentWitchInstallDir();

  const machineLease = claimAgentWitchMachineLease();
  if (!machineLease.ok) {
    if (process.platform === "darwin") {
      await kickstartAgentWitchClientLaunchAgents(installDir);
      process.stdout.write(
        "[agent-witch] Another Agent Witch process already owns this Mac user lease — kickstarted LaunchAgent and exiting.\n",
      );
    } else {
      process.stdout.write(
        "[agent-witch] Another Agent Witch process may already be running — exiting.\n",
      );
    }
    process.exit(0);
  }
  migrateLegacyAgentWitchInstallLogsForActiveProfiles(installDir);
  const terminated = terminateOtherAgentWitchClientProcesses({ installDir });
  if (terminated.length > 0) {
    console.log(
      `[agent-witch] Stopped ${terminated.length} sibling process(es): ${terminated.join(", ")}`,
    );
  }

  if (process.platform === "darwin") {
    const launchAgentPlist = ensureAgentWitchLaunchAgentPlist({
      launchAgentLabel: resolveAgentWitchLaunchAgentPrefix(installDir),
      installDir,
    });
    if (launchAgentPlist.rewritten) {
      console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");
    }

    bootoutAgentWitchAuxiliaryLaunchAgents();
  }

  const configs = await waitForConfigs();
  const primaryConfig = configs[0];
  if (primaryConfig !== undefined) {
    registerAgentWitchProcessTraceHandlers(primaryConfig.layout);
  }
  for (const config of configs) {
    const appOrigin =
      resolveAgentWitchAppOriginFromWsUrl(config.wsUrl) ??
      AGENT_WITCH_DEFAULT_ORIGIN;
    ensureAgentWitchInstallVersionRecorded(config.layout.installDir, appOrigin);
  }
  const clients = configs.map((config) => createAgentWitchClient(config));
  const primaryClient = clients[0];
  if (primaryClient === undefined) {
    process.stdout.write("[agent-witch] No profile configs found — exiting.\n");
    releaseAgentWitchMachineLease();
    process.exit(0);
  }

  const reconnectWebSocketsIfStale = (): void => {
    configs.forEach((config, index) => {
      const health = readAgentWitchConnectionHealth(config.layout);
      if (
        health !== null &&
        !isAgentWitchConnectionHealthStale(
          health,
          AGENT_WITCH_CONNECTION_STALE_MS,
        )
      ) {
        return;
      }
      clients[index]?.reviveWebSocket();
    });
  };

  let shutdown = (): void => {
    // replaced after services start
  };

  const inProcessServices = await startAgentWitchInProcessServices({
    skipInProcessBridge: processHost.skipInProcessBridge,
    reconnectWebSockets: reconnectWebSocketsIfStale,
    onLostMachineLease: () => {
      console.log(
        "[agent-witch] Lost machine lease to another process — shutting down.",
      );
      shutdown();
    },
  });

  if (!processHost.skipInProcessLive) {
    startAgentWitchLocalApp({
      layout: configs[0]!.layout,
      controllers: {
        getStatus: primaryClient.getStatus,
        reviveWebSocket: reconnectWebSocketsIfStale,
        reportHarnessManifestIfConnected:
          primaryClient.reportHarnessManifestIfConnected,
      },
    });
  } else {
    console.log(
      "[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE).",
    );
  }

  if (processHost.skipInProcessBridge) {
    console.log(
      "[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).",
    );
  }

  for (const client of clients) {
    client.startLocalHealthCheck();
    client.connect();
  }

  console.log(
    `[agent-witch] Host mode ${processHost.mode}; bridging ${clients.length} account profile(s) in one process.`,
  );

  const stopConsoleUserGuard = startActiveMacOsConsoleUserGuard(() => {
    console.log(
      "[agent-witch] Active macOS console user changed — shutting down.",
    );
    // Drop LaunchAgents so KeepAlive does not respawn for a logged-out user.
    bootoutAgentWitchLaunchAgentsForCurrentUser();
    shutdown();
  });

  shutdown = (): void => {
    stopConsoleUserGuard();
    inProcessServices.stop();
    releaseAgentWitchMachineLease();
    console.log("[agent-witch] Shutting down.");
    for (const client of clients) {
      client.stop();
    }
    process.exit(0);
  };

  process.on("SIGINT", () => {
    shutdown();
  });
  process.on("SIGTERM", () => {
    shutdown();
  });
};
export const startAgentWitchClient = main;
