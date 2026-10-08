import crypto from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import WebSocket from "ws";

import {
  readAgentWitchWakePortFromFile,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
  readAgentWitchHostServices,
  resolveAgentWitchHostProcessScope,
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchWakePortDir,
} from "@agent-witch/install-layout";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@agent-witch/install-bundle";
import {
  bootoutAgentWitchAuxiliaryLaunchAgents,
  bootoutAgentWitchLaunchAgentsForCurrentUser,
  ensureAgentWitchLaunchAgentPlist,
  exitUnlessActiveMacOsConsoleUser,
  kickstartAgentWitchClientLaunchAgents,
  startActiveMacOsConsoleUserGuard,
  syncAgentWitchLaunchAgentPlistWakePort,
} from "@agent-witch/install-macos-launch";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  AGENT_WITCH_CONNECTION_STALE_MS,
  clearAgentWitchConnectionHealth,
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
  resolveAgentWitchLocalWsConnected,
  shouldReviveAgentWitchWebSocketFromHealth,
  writeAgentWitchConnectionHealth,
} from "@agent-witch/install-connection-health";
import {
  buildDeviceAuthHelloFields,
  verifyServerAttestationLocally,
} from "@agent-witch/install-device-identity";
import { resolveAgentWitchProcessHost } from "@agent-witch/install-process-host";
import {
  buildLocalCodingToolRefusalResult,
  createBoundedRunIdLedger,
  isCodingToolsPaused,
  materializeRunScopedCompositionOverlay,
  parseProjectCompositionSnapshotWire,
  removeRunCompositionOverlay,
  resolveRunProjectFolderPath,
  handleAgentWake,
  writeToAgentTerminalSocket,
  registerAgentTerminal,
  unregisterAgentTerminal,
  readAgentWitchRunConfig,
  resolveWriterSpawnEnv,
  scrubOutboundRunFrame,
  verifyProjectCompositionSnapshotBlobs,
  waitForAgentWitchClientConfigs as waitForConfigs,
  watchCodingToolsPause,
} from "@agent-witch/install-runtime-client";
import {
  handleProjectMessageHistoryDispatch,
  handleProjectHistoryPageRequest,
  writeProjectHistoryAiSession,
} from "@agent-witch/live-project-history";
import type { AgentWitchClientConfig as AgentWitchConfig } from "@agent-witch/install-runtime-client/types";
import {
  ensureNodePtySpawnHelpersExecutable,
  resolveAgentWitchBundledDepsDir,
} from "@agent-witch/install-bundled-deps";
import { buildAgentWitchDeviceRestartAckPayload } from "@agent-witch/install-runtime-client";
import {
  ensureAgentWitchInstallVersionRecorded,
  readAgentWitchInstallVersion,
  resolveAgentWitchAppOriginFromWsUrl,
  resolveAgentWitchHeartbeatInstallBundleVersion,
} from "@agent-witch/install-self-update";
import {
  appendAgentWitchLocalTraffic,
  recordAgentWitchLocalTraceEvent,
  recordAgentWitchWsTraceFromObject,
  trimAgentWitchLogs,
} from "@agent-witch/live-diagnostics";
import {
  buildKnowledgeHeartbeatPayload,
  captureKnowledgeAfterRun,
  checkKnowledgeBeforeTask,
  classifyKnowledgeTaskClass,
  isKnowledgeEnabled,
  isKnowledgeHoldoutRun,
  resolveKnowledgeProjectKey,
} from "@agent-witch/live-knowledge";
import {
  resolveLocalAppPublicKey,
  startAgentWitchLocalApp,
} from "@agent-witch/live-local-server";
import {
  buildWriterSessionColdContinuePrompt,
  endActiveWriterTranscriptSession,
  loadWriterSessionCanonical,
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
  resolveLinkedProjectFolderPath,
  shouldCaptureRunOutputForProjectKnowledge,
  syncProjectKnowledgeCandidateToCloud,
} from "@agent-witch/live-projects";
import {
  applyHarnessInstallLocally,
  fetchHarnessInstallBundleArtifact,
  parseHarnessInstallBundle,
} from "@agent-witch/live-harness";
import {
  forgetAgentWitchLocalConnection,
  isDeviceNotLinkedError,
  isUnknownAgentWitchIdentityError,
} from "@agent-witch/install-uninstall";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";
import { LocalCodingToolRefusalCode } from "@agent-witch/shared/dispatch";

import { admitLocalCodingToolRun } from "./admitLocalCodingToolRun";
import { runAgentWitchHostLauncher } from "./hostLauncher/runAgentWitchHostLauncher";
import { describeAgentWitchHostServicesMigration } from "./hostServicesMigration/describeAgentWitchHostServicesMigration";
import { migrateAgentWitchMonolithToAccountServices } from "./hostServicesMigration/migrateAgentWitchMonolithToAccountServices";

import {
  acceptTerminalStream,
  AGENT_RUN_WORKING_ESTIMATE_MARKER,
  applyAutomationsRunFromCloud,
  applyAutomationsSyncFromCloud,
  beginAgentWitchWriterWork,
  registerAgentWitchWriterWorkPid,
  buildDefaultUserProjectFolderPath,
  deferAgentWitchInstallBundleUpdate,
  deferAgentWitchLocalRestart,
  ensureAgentWitchCoupledLiveAppHealth,
  endAgentWitchWriterWork,
  isAgentWitchInstallBundleUpdateNeeded,
  isAgentWitchWriterWorkInProgress,
  buildWriterCliInvocation,
  buildWriterSessionReadyMessage,
  buildWriterSessionWarmupMessage,
  claimAgentWitchMachineLease,
  clearWriterSession,
  closeShellPtySession,
  configureAgentWitchRunCloudApi,
  continueClaudeTaskAfterInput,
  supersedePausedRunForContinuation,
  ensureHarnessWriterCli,
  flushPendingAgentRunCompletions,
  flushPendingRunResultDeliveries,
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
  publishAgentRunEstimateComparison,
  readInstallBundleVersionFromHeartbeatAck,
  registerAgentWitchProcessTraceHandlers,
  releaseAgentWitchMachineLease,
  replayPendingRunInputRequests,
  resolveAgentWitchMachineLeasePath,
  bindAgentWitchLiveRunSocket,
  dropPendingRunInputSession,
  requestLocalAgentWitchRestart,
  resizeShellPty,
  resolveAgentWitchCloudApiConfig,
  resolveAgentWitchWakePort,
  resolveWriterCliCommands,
  beginAgentRunPreEstimate,
  recordAgentRunPreEstimateOutput,
  storeAgentRunTimeEstimateHistory,
  beginAgentRunTokenPreEstimate,
  recordAgentRunTokenPreEstimateOutput,
  resolveTaskWriterEstimateLabel,
  probeLocalRunClis,
  registerAgentWitchHostGracefulShutdown,
  restartAgentWitchHostAfterBundleUpdate,
  runLocalInstallBundleUpdate,
  runWriterEnsure,
  runWriterSessionStart,
  runWriterTask,
  seedAgentRunReportFile,
  startAgentWitchInProcessServices,
  stopAgentRun,
  stopAllAgentRuns,
  subscribeAgentWitchWriterWorkIdle,
  supportsWriterSessionContinuation,
  takeDeferredAgentWitchInstallBundleUpdate,
  takeDeferredAgentWitchLocalRestartReason,
  supportsWriterSessionWarmup,
  terminateOtherAgentWitchClientProcesses,
  wrapPromptWithAgentRunReportInstruction,
  wrapPromptWithSidecarAgentRunEstimate,
  writeShellPtyInput,
} from "./legacyScriptDeps";
const HEARTBEAT_INTERVAL_MS = 30_000;
const MAX_RECONNECT_DELAY_MS = 30_000;
/** Revoked/unlinked device: retry rarely instead of every 2s. */
const NOT_LINKED_RETRY_MS = 5 * 60 * 1_000;
const shellSessionIdByRunId = new Map<string, string>();
const projectFolderPathByRunId = new Map<string, string>();
const projectIdByRunId = new Map<string, string>();
const promptByRunId = new Map<string, string>();

/** Durable C1 SoT on the project computer when History is ON (no-op otherwise). */
const persistRunHistoryAiSessionLocal = (input: {
  readonly projectId: string;
  readonly agentRunId: string;
  readonly status: string;
  readonly promptBody?: string | null;
  readonly resultBody?: string | null;
  readonly writerAgent?: string | null;
  readonly completedAt?: string | null;
}): void => {
  try {
    writeProjectHistoryAiSession({
      projectId: input.projectId,
      taskId: input.agentRunId,
      agentRunId: input.agentRunId,
      status: input.status,
      ...(input.promptBody !== undefined
        ? { promptBody: input.promptBody }
        : {}),
      ...(input.resultBody !== undefined
        ? { resultBody: input.resultBody }
        : {}),
      ...(typeof input.writerAgent === "string"
        ? { writerAgent: input.writerAgent }
        : {}),
      ...(input.completedAt !== undefined
        ? { completedAt: input.completedAt }
        : { completedAt: null }),
    });
  } catch {
    // best-effort; never block the run
  }
};

const reportKeyByRunId = new Map<string, string>();
const gitSnapshotBeforeByRunId = new Map<
  string,
  Awaited<ReturnType<typeof captureAgentWitchGitWorktreeSnapshot>>
>();
const runScopedOverlayByRunId = new Map<string, boolean>();
/** S0-7c: agentRunIds accepted for a run (a redelivered command never runs twice). */
const acceptedRunIds = createBoundedRunIdLedger();
const admittingRunIds = new Set<string>();

interface AgentWitchOutboundSocket {
  readonly readyState: number;
  send(data: string): void;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const knowledgeConfigByRunId = new Map<string, AgentWitchConfig>();
const capturedKnowledgeRunIds = new Set<string>();
const CAPTURED_KNOWLEDGE_RUN_ID_LIMIT = 500;

/**
 * The cloud never echoes `command.claude.result` back to the agent, so project
 * knowledge is captured where this computer emits the result.
 */
const captureKnowledgeForRunResult = (
  message: Record<string, unknown>,
): void => {
  const payload = isRecord(message.payload) ? message.payload : null;
  if (payload === null) {
    return;
  }
  const agentRunId =
    typeof payload.agentRunId === "string" ? payload.agentRunId : undefined;
  const requestId =
    typeof message.requestId === "string" ? message.requestId : undefined;
  const runId = agentRunId ?? requestId;
  if (runId === undefined || capturedKnowledgeRunIds.has(runId)) {
    return;
  }
  const config = knowledgeConfigByRunId.get(runId);
  if (config === undefined) {
    return;
  }
  knowledgeConfigByRunId.delete(runId);
  // Refusals (S0 errorCode) are policy denials, not something the agent got wrong.
  if (typeof payload.errorCode === "string" || !isKnowledgeEnabled()) {
    return;
  }
  capturedKnowledgeRunIds.add(runId);
  if (capturedKnowledgeRunIds.size > CAPTURED_KNOWLEDGE_RUN_ID_LIMIT) {
    const oldest = capturedKnowledgeRunIds.values().next().value;
    if (oldest !== undefined) {
      capturedKnowledgeRunIds.delete(oldest);
    }
  }

  const output = typeof payload.output === "string" ? payload.output : "";
  const exitCode =
    typeof payload.exitCode === "number" ? payload.exitCode : null;
  const projectFolderPath = resolveRunProjectFolderPath(
    agentRunId !== undefined
      ? projectFolderPathByRunId.get(agentRunId)
      : undefined,
    buildDefaultUserProjectFolderPath,
  );
  if (projectFolderPath === null) {
    return;
  }
  const projectId =
    agentRunId !== undefined ? projectIdByRunId.get(agentRunId) : undefined;
  const prompt =
    agentRunId !== undefined ? (promptByRunId.get(agentRunId) ?? "") : "";
  const gitBefore =
    agentRunId !== undefined
      ? gitSnapshotBeforeByRunId.get(agentRunId)
      : undefined;

  void captureKnowledgeAfterRun({
    layout: config.layout,
    projectKey: resolveKnowledgeProjectKey({ projectId, projectFolderPath }),
    projectFolderPath,
    runId,
    prompt,
    output,
    exitCode,
    onRecurringMistake: (mistake) => {
      const runConfig = readAgentWitchRunConfig();
      const cloudConfig =
        runConfig === null || projectId === undefined
          ? null
          : resolveAgentWitchCloudApiConfig({
              wsUrl: runConfig.wsUrl,
              pairingToken: runConfig.pairingToken,
            });
      if (cloudConfig !== null && projectId !== undefined) {
        void syncProjectKnowledgeCandidateToCloud(cloudConfig, projectId, {
          sourceRunId: mistake.runId,
          lesson: `Recurring mistake (3x): ${mistake.takeaway}`,
        });
      }
    },
    gitBefore:
      gitBefore === undefined
        ? undefined
        : {
            headSha: gitBefore.headSha,
            porcelainLineCount: gitBefore.porcelainLineCount,
          },
  });
};

const sendMessage = (
  socket: AgentWitchOutboundSocket,
  message: Record<string, unknown>,
  layout?: AgentWitchLocalLayout,
): void => {
  if (socket.readyState === WebSocket.OPEN) {
    // S0-8: scrub run output before it leaves the machine or hits the trace.
    const outbound = scrubOutboundRunFrame(message);
    socket.send(JSON.stringify(outbound));
    if (message.type === "command.claude.result") {
      captureKnowledgeForRunResult(message);
    }
    if (layout !== undefined) {
      appendAgentWitchLocalTraffic(layout, {
        direction: "out",
        type: String(message.type ?? "unknown"),
        summary: "outbound WS frame",
      });
      recordAgentWitchWsTraceFromObject(layout, "out", outbound);
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

  const writerLabel = resolveTaskWriterEstimateLabel({
    writerAgent,
    writerExecutionBackend: config.writerExecutionBackend,
    configPath: config.layout.configPath,
  });
  const cliProbe = await probeLocalRunClis({
    commands: resolveWriterCliCommands({
      claudeCommand: config.claudeCommand,
      codexCommand: config.codexCommand,
      cursorCommand: config.cursorCommand,
      antigravityCommand: config.antigravityCommand,
    }),
    writerAgent,
  }).catch(() => null);
  const estimateRequest =
    agentRunId !== undefined
      ? beginAgentRunPreEstimate({
          wrappedPrompt: prompt,
          writerLabel,
          reportsDir: config.layout.reportsDir,
          estimateModel: cliProbe?.estimateModel,
          capabilityNote: cliProbe?.capabilityNote,
        }).catch(() => null)
      : null;
  const tokenEstimateRequest =
    agentRunId !== undefined
      ? beginAgentRunTokenPreEstimate({
          wrappedPrompt: prompt,
          writerLabel,
          reportsDir: config.layout.reportsDir,
          estimateModel: cliProbe?.estimateModel,
          capabilityNote: cliProbe?.capabilityNote,
        }).catch(() => null)
      : null;

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
    resolveLinkedProjectFolderPath(
      path.dirname(config.layout.configPath),
      projectId,
    ),
  );
  if (resolvedProjectFolderPath === null) {
    sendMessage(
      socket,
      buildLocalCodingToolRefusalResult({
        code: LocalCodingToolRefusalCode.FOLDER_REQUIRED,
        ...(agentRunId !== undefined ? { agentRunId } : {}),
        ...(requestId !== undefined ? { requestId } : {}),
      }),
    );
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

  const hasSourceRunId =
    typeof sourceRunId === "string" && sourceRunId.trim().length > 0;
  if (typeof sourceRunId === "string" && hasSourceRunId) {
    // b2179f2b: a paused source run is answered by this new run; close it.
    supersedePausedRunForContinuation(
      config,
      asLegacyWebSocket(socket),
      sourceRunId.trim(),
      agentRunId,
    );
  }

  const sessionTurn = resolveWriterSessionTurn({
    sessionContinuation,
    supportsWriterSessionContinuation:
      supportsWriterSessionContinuation(writerAgent),
    isWriterConversationStarted: isWriterConversationStarted(writerAgent),
    hasSourceRunId,
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
    hasSourceRunId,
    hasCanonicalTurns,
    userPromptCharacterCount: prompt.length,
    taskClass: classifyKnowledgeTaskClass(prompt),
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

  const knowledgeRunId = agentRunId ?? requestId;
  const knowledgeCheck =
    isKnowledgeEnabled() && knowledgeRunId !== undefined
      ? await checkKnowledgeBeforeTask({
          layout: config.layout,
          projectKey: resolveKnowledgeProjectKey({
            projectId: resolvedProjectId,
            projectFolderPath: resolvedProjectFolderPath,
          }),
          projectFolderPath: resolvedProjectFolderPath,
          runId: knowledgeRunId,
          userPrompt: prompt,
          promptText: resolvedPrompt,
          plan: dispatchRoute.knowledgePlan,
          taskClass: classifyKnowledgeTaskClass(prompt),
          holdout: isKnowledgeHoldoutRun(knowledgeRunId),
        })
      : null;
  if (knowledgeCheck !== null && knowledgeRunId !== undefined) {
    knowledgeConfigByRunId.set(knowledgeRunId, config);
  }
  let promptWithProjectContext = `${knowledgeCheck?.contextText ?? ""}${resolvedPrompt}`;

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
      userSummary: "Working on your computer…",
    });

    const taskPromptForEstimate = promptWithProjectContext;
    if (estimateRequest !== null) {
      void estimateRequest
        .then((draft) => {
          if (draft === null) {
            return;
          }
          const preEstimate = recordAgentRunPreEstimateOutput({
            estimateOutput: draft.estimateOutput ?? "",
            reportKey: resolvedReportKey,
            agentRunId,
            reportsDir: config.layout.reportsDir,
            task: draft.task,
            writerLabel: draft.writerLabel,
            embedding: draft.embedding,
          });
          if (preEstimate.estimateSeconds === null) {
            return;
          }

          publishAgentRunEstimateComparison(
            config.layout.reportsDir,
            agentRunId,
          );

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
            return;
          }

          queueTerminalStreamChunk(agentRunId, estimateChunk);
        })
        .catch(() => undefined);
    }

    promptWithProjectContext = wrapPromptWithSidecarAgentRunEstimate(
      taskPromptForEstimate,
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

  if (agentRunId !== undefined && estimateRequest !== null) {
    void estimateRequest
      .then((draft) => {
        if (draft === null) {
          return;
        }
        storeAgentRunTimeEstimateHistory({
          estimateOutput: draft.estimateOutput ?? "",
          agentRunId,
          reportsDir: config.layout.reportsDir,
          task: draft.task,
          writerLabel: draft.writerLabel,
          embedding: draft.embedding,
        });
      })
      .catch(() => undefined);
  }

  if (agentRunId !== undefined && tokenEstimateRequest !== null) {
    void tokenEstimateRequest
      .then((draft) => {
        if (draft === null) {
          return;
        }
        recordAgentRunTokenPreEstimateOutput({
          estimateOutput: draft.estimateOutput ?? "",
          agentRunId,
          reportsDir: config.layout.reportsDir,
          task: draft.task,
          writerLabel: draft.writerLabel,
        });
      })
      .catch(() => undefined);
  }

  const hasRunScopedOverlay =
    agentRunId !== undefined &&
    runScopedOverlayByRunId.get(agentRunId) === true;

  if (agentRunId !== undefined && resolvedProjectFolderPath.trim().length > 0) {
    const gitBefore = await captureAgentWitchGitWorktreeSnapshot(
      resolvedProjectFolderPath,
    );
    gitSnapshotBeforeByRunId.set(agentRunId, gitBefore);
    if (resolvedReportKey !== undefined && resolvedReportKey.length > 0) {
      reportKeyByRunId.set(agentRunId, resolvedReportKey);
    }
  }

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
    resolvedProjectId.length > 0 ? resolvedProjectId : undefined,
  );

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
  onSpawned?: (pid: number) => void,
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

    if (child.pid !== undefined) {
      onSpawned?.(child.pid);
    }

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

  if (isCodingToolsPaused(config.layout.configPath)) {
    // S0-7a: harness requests run a local CLI too.
    sendMessage(socket, {
      type: "harness.request.result",
      payload: {
        success: false,
        writerAgent,
        errorCode: LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED,
        errorMessage: buildLocalCodingToolRefusalResult({
          code: LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED,
        }).payload.output,
      },
      requestId,
    });
    return;
  }

  const workId = crypto.randomUUID();
  beginAgentWitchWriterWork(config.layout, workId);
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

    return runWriterProcess(config, writerAgent, instruction, (pid) => {
      registerAgentWitchWriterWorkPid(config.layout, workId, pid);
    });
  })().finally(() => {
    endAgentWitchWriterWork(config.layout, workId);
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
  // node-pty ships spawn-helper without +x; fix it before the first PTY run.
  try {
    ensureNodePtySpawnHelpersExecutable(
      resolveAgentWitchBundledDepsDir(config.layout.installDir),
    );
  } catch {
    // PTY simply falls back to a pipe
  }
  const state: {
    socket?: WebSocket;
    heartbeatTimer?: NodeJS.Timeout;
    localHealthTimer?: NodeJS.Timeout;
    reconnectTimer?: NodeJS.Timeout;
    reconnectAttempt: number;
    notLinked: boolean;
    stopped: boolean;
    wsConnected: boolean;
    lastHeartbeatAt: string | null;
    wakeError: string | null;
    restartInFlight: boolean;
    selfUpdateInFlight: boolean;
    hasRequestedAccountConvergenceRestart: boolean;
  } = {
    reconnectAttempt: 0,
    notLinked: false,
    stopped: false,
    wsConnected: false,
    lastHeartbeatAt: null,
    wakeError: null,
    restartInFlight: false,
    selfUpdateInFlight: false,
    hasRequestedAccountConvergenceRestart: false,
  };

  const runLocalRestart = (
    reason: string,
  ): "accepted" | "already_in_progress" | "deferred_writer_busy" => {
    if (state.restartInFlight) {
      return "already_in_progress";
    }

    if (isAgentWitchWriterWorkInProgress(config.layout)) {
      deferAgentWitchLocalRestart(reason);
      console.log(
        `[agent-witch] Deferring local restart (${reason}) until the active writer task finishes.`,
      );
      return "deferred_writer_busy";
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

    return "accepted";
  };

  const runLocalHostRestartIntoUpdatedBundle = (
    reason: string,
  ): "accepted" | "already_in_progress" | "deferred_writer_busy" => {
    if (state.restartInFlight) {
      return "already_in_progress";
    }

    if (isAgentWitchWriterWorkInProgress(config.layout)) {
      deferAgentWitchLocalRestart(reason);
      console.log(
        `[agent-witch] Deferring host restart (${reason}) until the active writer task finishes.`,
      );
      return "deferred_writer_busy";
    }

    const bundleVersion =
      readAgentWitchInstallVersion(config.layout.installDir)?.bundleVersion ??
      "unknown";

    state.restartInFlight = true;
    console.log(
      `[agent-witch] Host restart into updated bundle requested (${reason})…`,
    );

    void restartAgentWitchHostAfterBundleUpdate({
      installDir: config.layout.installDir,
      bundleVersion,
    })
      .then((result) => {
        if (!result.ok) {
          state.wakeError = result.message;
          console.error(
            `[agent-witch] Host restart after bundle update failed: ${result.message}`,
          );
        }
      })
      .finally(() => {
        state.restartInFlight = false;
      });

    return "accepted";
  };

  const acknowledgeDeviceRestart = (
    socket: AgentWitchOutboundSocket,
    reason: string,
    status: "accepted" | "already_in_progress" | "deferred_writer_busy",
    requestId: string | undefined,
  ): void => {
    sendMessage(
      socket,
      {
        type: "device.restart.ack",
        payload: buildAgentWitchDeviceRestartAckPayload({ status, reason }),
        ...(requestId !== undefined ? { requestId } : {}),
      },
      config.layout,
    );
  };

  const runLocalSelfUpdateFromHeartbeat = (
    remoteBundleVersion: string,
    trigger: "system.ack" | "install.bundle.update" = "system.ack",
  ): void => {
    if (state.selfUpdateInFlight) {
      return;
    }

    // Already on this bundle: nothing to update or defer (avoids per-ack log spam).
    if (
      !isAgentWitchInstallBundleUpdateNeeded({
        installDir: config.layout.installDir,
        remoteBundleVersion,
      })
    ) {
      // AWL-ISO-1: another account host already installed this bundle; this
      // per-account process still runs the old code, so restart into it once.
      const scope = resolveAgentWitchHostProcessScope({
        installDir: config.layout.installDir,
      });
      if (
        scope.kind === "account" &&
        AGENT_WITCH_INSTALL_BUNDLE_VERSION !== remoteBundleVersion &&
        !state.hasRequestedAccountConvergenceRestart
      ) {
        state.hasRequestedAccountConvergenceRestart = true;
        runLocalHostRestartIntoUpdatedBundle("install-bundle-update");
      }
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

    const delayMs = state.notLinked
      ? NOT_LINKED_RETRY_MS
      : computeReconnectDelayMs(state.reconnectAttempt);
    console.log(`[agent-witch] Reconnecting in ${delayMs}ms…`);

    state.reconnectTimer = setTimeout(() => {
      state.reconnectTimer = undefined;
      connect();
    }, delayMs);
  };

  const startHeartbeat = (socket: WebSocket): void => {
    clearHeartbeat();
    const sendHeartbeat = async (): Promise<void> => {
      trimAgentWitchLogs([
        config.layout.mainLogPath,
        config.layout.errorLogPath,
        path.join(config.layout.installDir, "agent-witch.log"),
        path.join(config.layout.installDir, "agent-witch.error.log"),
      ]);
      const knowledge = await buildKnowledgeHeartbeatPayload(
        config.layout,
      ).catch(() => null);
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
            ...(knowledge !== null ? { knowledge } : {}),
          },
        },
        config.layout,
      );
      state.lastHeartbeatAt = new Date().toISOString();
    };
    void sendHeartbeat();
    state.heartbeatTimer = setInterval(() => {
      void sendHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);
  };

  const handleInboundRaw = (
    parsed: Record<string, unknown>,
    socket: AgentWitchOutboundSocket,
  ): void => {
    if (typeof parsed.type !== "string") {
      return;
    }

    if (isDeviceNotLinkedError(parsed)) {
      recordAgentWitchWsTraceFromObject(config.layout, "in", parsed);
      if (!state.notLinked) {
        const serverMessage = isRecord(parsed.payload)
          ? String(parsed.payload.errorMessage ?? "")
          : "";
        console.error(
          `[agent-witch] This computer is not linked to AgentWitch. Retrying every 5 minutes. ${serverMessage}`.trim(),
        );
      }
      state.notLinked = true;
      return;
    }

    if (parsed.type === "system.ack") {
      state.notLinked = false;
    }

    if (isUnknownAgentWitchIdentityError(parsed)) {
      state.stopped = true;
      clearHeartbeat();
      clearReconnectTimer();
      closeSocket();
      void forgetAgentWitchLocalConnection({ layout: config.layout }).finally(
        () => {
          releaseAgentWitchMachineLease();
          process.exit(0);
        },
      );
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

    if (parsed.type === "system.error" && isRecord(parsed.payload)) {
      const errorCode =
        typeof parsed.payload.errorCode === "string"
          ? parsed.payload.errorCode
          : "";
      const payloadRunId =
        typeof parsed.payload.agentRunId === "string"
          ? parsed.payload.agentRunId
          : "";

      if (
        (requestId && requestId.startsWith("replay-input:")) ||
        (errorCode === "run_not_awaiting_input" && payloadRunId.length > 0)
      ) {
        const dropRunId =
          payloadRunId.length > 0
            ? payloadRunId
            : requestId?.replace("replay-input:", "");
        if (dropRunId && dropRunId.length > 0) {
          dropPendingRunInputSession(config, dropRunId);
        }
      }
    }

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
      const restartStatus = runLocalRestart("cloud-device-restart");
      acknowledgeDeviceRestart(
        socket,
        "cloud-device-restart",
        restartStatus,
        requestId,
      );
    }

    if (parsed.type === "automations.sync" && isRecord(parsed.payload)) {
      applyAutomationsSyncFromCloud(parsed.payload);
    }

    if (parsed.type === "project.message.history" && isRecord(parsed.payload)) {
      void handleProjectMessageHistoryDispatch({ payload: parsed.payload });
      return;
    }

    if (
      parsed.type === "project.history.page.request" &&
      isRecord(parsed.payload)
    ) {
      const pageResult = handleProjectHistoryPageRequest({
        payload: parsed.payload,
      });
      sendMessage(socket, {
        type: "project.history.page.result",
        payload: pageResult,
        requestId,
      });
      return;
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
        resolveLinkedProjectFolderPath(
          path.dirname(config.layout.configPath),
          projectId,
        ),
      );
      const compositionSnapshot = parseProjectCompositionSnapshotWire(
        parsed.payload.compositionSnapshot,
      );
      const reportKey =
        typeof parsed.payload.reportKey === "string"
          ? parsed.payload.reportKey
          : undefined;

      if (typeof prompt === "string" && prompt.trim().length > 0) {
        console.log(
          `[agent-witch] Running ${writerAgent} task (${sessionContinuation ? "continue" : "first"})…`,
        );
        if (
          agentRunId !== undefined &&
          (acceptedRunIds.has(agentRunId) ||
            admittingRunIds.has(agentRunId) ||
            loadAgentRunLocal(config.layout, agentRunId) !== null)
        ) {
          // S0-7c: redelivered run command; never start the same run twice.
          console.log(`[agent-witch] Ignoring duplicate run ${agentRunId}.`);
          return;
        }
        const refuseRun = (
          code: Parameters<typeof buildLocalCodingToolRefusalResult>[0]["code"],
        ): void => {
          sendMessage(
            socket,
            buildLocalCodingToolRefusalResult({
              code,
              ...(agentRunId !== undefined ? { agentRunId } : {}),
              ...(requestId !== undefined ? { requestId } : {}),
            }),
          );
        };
        const startAdmittedRun = (admittedFolderPath: string): void => {
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
            projectFolderPathByRunId.set(agentRunId, admittedFolderPath);
            if (projectId !== undefined && projectId.trim().length > 0) {
              projectIdByRunId.set(agentRunId, projectId.trim());
            }
            promptByRunId.set(agentRunId, prompt.trim());
            if (projectId !== undefined && projectId.trim().length > 0) {
              persistRunHistoryAiSessionLocal({
                projectId: projectId.trim(),
                agentRunId,
                status: "running",
                promptBody: prompt.trim(),
                resultBody: null,
                writerAgent,
                completedAt: null,
              });
            }
            ensureAgentWitchProjectFolder({
              projectFolderPath: admittedFolderPath,
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
            admittedFolderPath,
            reportKey,
            projectId,
          );
        };
        if (agentRunId !== undefined) {
          admittingRunIds.add(agentRunId);
        }
        // S0-7a pause + S0-5 folder allowlist, before any folder is created.
        void admitLocalCodingToolRun({
          config,
          ...(projectId !== undefined ? { projectId } : {}),
          requestedFolderPath: projectFolderPath,
          defaultFolderPath: buildDefaultUserProjectFolderPath(),
        })
          .catch(() => ({
            ok: false as const,
            code: LocalCodingToolRefusalCode.FOLDER_CHECK_UNAVAILABLE,
          }))
          .then((admission) => {
            if (agentRunId !== undefined) {
              admittingRunIds.delete(agentRunId);
            }
            if (!admission.ok) {
              refuseRun(admission.code);
              return;
            }
            if (agentRunId !== undefined) {
              acceptedRunIds.add(agentRunId);
            }
            startAdmittedRun(admission.folderRealPath);
          })
          .catch((error: unknown) => {
            console.error(
              "[agent-witch] Run start failed:",
              error instanceof Error ? error.message : error,
            );
          });
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
        // Server-opened shells may carry projectId/membershipId; CLI agents the
        // user starts via `agent-witch agent run` bind through their own launcher.
        const agentProjectId = parsed.payload.projectId;
        const agentMembershipId = parsed.payload.membershipId;
        if (
          typeof agentProjectId === "string" &&
          typeof agentMembershipId === "string"
        ) {
          registerAgentTerminal({
            installDir: config.layout.installDir,
            projectId: agentProjectId,
            membershipId: agentMembershipId,
            shellSessionId,
          });
        }
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

    if (parsed.type === "agent.wake") {
      // Wake a local CLI agent through its terminal; task meta stays local.
      try {
        const result = handleAgentWake({
          installDir: config.layout.installDir,
          projectDataDir: config.layout.projectDataDir,
          payload: parsed.payload,
          writeInput: (shellSessionId, data) =>
            writeShellPtyInput(shellSessionId, data) ||
            writeToAgentTerminalSocket(
              config.layout.installDir,
              shellSessionId,
              data,
            ),
          schedule: (run, delayMs) => {
            setTimeout(run, delayMs);
          },
        });
        console.log(`[agent-witch] agent.wake ${result}`);
      } catch (error: unknown) {
        console.error(
          "[agent-witch] agent.wake failed:",
          error instanceof Error ? error.message : error,
        );
      }
    }

    if (parsed.type === "shell.session.close" && isRecord(parsed.payload)) {
      const shellSessionId =
        typeof parsed.payload.shellSessionId === "string"
          ? parsed.payload.shellSessionId
          : "";
      if (shellSessionId.length > 0) {
        unregisterAgentTerminal({
          installDir: config.layout.installDir,
          shellSessionId,
        });
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

      if (
        agentRunId !== undefined &&
        projectId !== undefined &&
        projectId.trim().length > 0
      ) {
        const terminalStatus =
          exitCode === undefined || exitCode === null
            ? "completed"
            : exitCode === 0
              ? "completed"
              : "failed";
        persistRunHistoryAiSessionLocal({
          projectId: projectId.trim(),
          agentRunId,
          status: terminalStatus,
          promptBody: prompt.length > 0 ? prompt : undefined,
          resultBody: output,
          completedAt: new Date().toISOString(),
        });
      }

      if (agentRunId !== undefined) {
        removeRunCompositionOverlay(config.layout, agentRunId);
        runScopedOverlayByRunId.delete(agentRunId);
        projectIdByRunId.delete(agentRunId);
        promptByRunId.delete(agentRunId);
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
      bindAgentWitchLiveRunSocket(config.layout.profileEmail ?? "", socket);
      state.reconnectAttempt = 0;
      state.wsConnected = true;
      state.wakeError = null;
      console.log(`[agent-witch] Connected to ${config.wsUrl}`);
      if (config.email !== null) {
        console.log(`[agent-witch] Profile: ${config.email}`);
      }
      configureAgentWitchRunCloudApi(
        resolveAgentWitchCloudApiConfig({
          wsUrl: config.wsUrl,
          pairingToken: config.pairingToken,
        }),
      );
      void flushPendingAgentRunCompletions(config.layout);
      flushPendingRunResultDeliveries({
        layout: config.layout,
        send: (message) => {
          sendMessage(socket, message);
        },
      });

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
            platform: process.platform === "linux" ? "linux" : "mac",
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
      clearAgentWitchConnectionHealth(config.layout);
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

  // S0-7a: turning "Pause all coding tools" on stops every active run.
  const unwatchCodingToolsPause = watchCodingToolsPause(
    config.layout.configPath,
    (paused) => {
      if (!paused) {
        return;
      }
      const stopped = stopAllAgentRuns(
        config,
        asLegacyWebSocket(
          state.socket ?? {
            readyState: WebSocket.CLOSED,
            send: () => undefined,
          },
        ),
      );
      console.log(
        `[agent-witch] Coding tools paused; stopped ${stopped} run(s).`,
      );
    },
  );

  const stop = (): void => {
    state.stopped = true;
    unwatchCodingToolsPause();
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
    if (deferredRestart === "install-bundle-update") {
      runLocalHostRestartIntoUpdatedBundle(deferredRestart);
      return;
    }
    if (deferredRestart !== null) {
      runLocalRestart(deferredRestart);
    }
  });

  return {
    connect,
    startLocalHealthCheck,
    stop,
    hasMacSocketOpen: () => state.wsConnected,
    getStatus: () => ({
      wsConnected:
        !state.notLinked &&
        resolveAgentWitchLocalWsConnected(config.layout, {
          socketOpen: state.wsConnected,
        }),
      notLinked: state.notLinked,
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
            "Not connected to AgentWitch — manifest saved locally only.",
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

  const initialScope = resolveAgentWitchHostProcessScope({ installDir });
  // AWL-ISO-4: before any lease or port, move a multi-account monolith (or
  // accounts added later) onto one service per account.
  const migration =
    initialScope.kind === "account"
      ? null
      : await migrateAgentWitchMonolithToAccountServices({
          installDir,
          bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
        });
  if (migration !== null) {
    console.log(
      `[agent-witch] Host services migration: ${describeAgentWitchHostServicesMigration(migration)}`,
    );
  }
  const scope =
    migration === null
      ? initialScope
      : resolveAgentWitchHostProcessScope({ installDir });
  if (scope.kind === "launcher") {
    await runAgentWitchHostLauncher({ installDir, services: scope.services });
    return;
  }

  const accountEmail = scope.kind === "account" ? scope.email : null;
  const leasePath = resolveAgentWitchMachineLeasePath(undefined, accountEmail);

  const machineLease = claimAgentWitchMachineLease({ leasePath });
  if (!machineLease.ok) {
    if (process.platform === "darwin") {
      await kickstartAgentWitchClientLaunchAgents(installDir, "darwin", {
        onlyAccountEmail: accountEmail,
      });
      process.stdout.write(
        "[agent-witch] Another AgentWitch process already owns this Mac user lease — kickstarted LaunchAgent and exiting.\n",
      );
    } else {
      process.stdout.write(
        "[agent-witch] Another AgentWitch process may already be running — exiting.\n",
      );
    }
    process.exit(0);
  }
  migrateLegacyAgentWitchInstallLogsForActiveProfiles(installDir);
  // AWL-ISO-1: an account host only replaces its own account's older process.
  const terminated = terminateOtherAgentWitchClientProcesses({
    installDir,
    accountEmail,
    hostServicesPresent: readAgentWitchHostServices(installDir) !== null,
  });
  if (terminated.length > 0) {
    console.log(
      `[agent-witch] Stopped ${terminated.length} sibling process(es): ${terminated.join(", ")}`,
    );
  }

  if (process.platform === "darwin") {
    const label =
      accountEmail === null
        ? resolveAgentWitchLaunchAgentPrefix(installDir)
        : resolveAgentWitchAccountLaunchAgentLabel(installDir, accountEmail);
    const launchAgentPlist = ensureAgentWitchLaunchAgentPlist({
      launchAgentLabel: label,
      installDir,
    });
    if (launchAgentPlist.rewritten) {
      console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");
    }
    try {
      // Heal a plist whose AGENT_WITCH_WAKE_PORT drifted from wake-port.json (file wins; no reload).
      const synced = syncAgentWitchLaunchAgentPlistWakePort({
        launchAgentPrefix: label,
        wakePort: readAgentWitchWakePortFromFile(
          resolveAgentWitchWakePortDir(installDir),
        ),
      });
      if (synced.length > 0) {
        console.log(
          `[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(synced.length)} LaunchAgent plist(s).`,
        );
      }
    } catch (error) {
      console.error(
        `[agent-witch] Could not sync LaunchAgent wake port: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    bootoutAgentWitchAuxiliaryLaunchAgents();
  }

  const configs = await waitForConfigs({ onlyProfileEmail: accountEmail });
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
    releaseAgentWitchMachineLease({ leasePath });
    process.exit(0);
  }

  const reconnectWebSocketsIfStale = (): void => {
    configs.forEach((config, index) => {
      const client = clients[index];
      if (client === undefined) {
        return;
      }
      const health = readAgentWitchConnectionHealth(config.layout);
      const shouldRevive = shouldReviveAgentWitchWebSocketFromHealth(health, {
        socketOpen: client.hasMacSocketOpen(),
        staleAfterMs: AGENT_WITCH_CONNECTION_STALE_MS,
      });
      if (!shouldRevive) {
        return;
      }
      client.reviveWebSocket();
    });
  };

  let shutdown = (): void => {
    // replaced after services start
  };

  const ensureLiveAppReachableIfIdle = (): void => {
    if (processHost.skipInProcessLive) {
      return;
    }
    const layout = configs[0]?.layout;
    if (layout === undefined) {
      return;
    }
    if (isAgentWitchWriterWorkInProgress(layout)) {
      return;
    }
    void ensureAgentWitchCoupledLiveAppHealth(layout.installDir, {
      accountEmail,
    });
  };

  const inProcessServices = await startAgentWitchInProcessServices({
    skipInProcessBridge: processHost.skipInProcessBridge,
    reconnectWebSockets: reconnectWebSocketsIfStale,
    ensureLiveAppReachable: ensureLiveAppReachableIfIdle,
    leasePath,
    onLostMachineLease: () => {
      console.log(
        "[agent-witch] Lost machine lease to another process — shutting down.",
      );
      shutdown();
    },
  });

  const localAppServers: ReturnType<typeof startAgentWitchLocalApp>[] = [];
  if (!processHost.skipInProcessLive) {
    for (let index = 0; index < clients.length; index += 1) {
      const client = clients[index];
      const config = configs[index];
      if (client === undefined || config === undefined) {
        continue;
      }
      localAppServers.push(
        startAgentWitchLocalApp({
          layout: config.layout,
          controllers: {
            getStatus: client.getStatus,
            reviveWebSocket: reconnectWebSocketsIfStale,
            reportHarnessManifestIfConnected:
              client.reportHarnessManifestIfConnected,
          },
        }),
      );
    }
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

  if (scope.kind === "account") {
    console.log(
      `[agent-witch] Host mode account; one process for ${accountEmail} (pid ${process.pid}).`,
    );
  } else {
    console.log(
      `[agent-witch] Host mode ${processHost.mode}; bridging ${clients.length} account profile(s) in one process.`,
    );
  }

  const stopConsoleUserGuard = startActiveMacOsConsoleUserGuard(() => {
    console.log(
      "[agent-witch] Active macOS console user changed — shutting down.",
    );
    // Drop LaunchAgents so KeepAlive does not respawn for a logged-out user.
    bootoutAgentWitchLaunchAgentsForCurrentUser();
    shutdown();
  });

  const gracefulHostShutdown = (): void => {
    stopConsoleUserGuard();
    inProcessServices.stop();
    for (const localAppServer of localAppServers) {
      localAppServer.close();
    }
    for (const client of clients) {
      client.stop();
    }
    releaseAgentWitchMachineLease({ leasePath });
  };

  registerAgentWitchHostGracefulShutdown(gracefulHostShutdown);

  shutdown = (): void => {
    gracefulHostShutdown();
    console.log("[agent-witch] Shutting down.");
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
