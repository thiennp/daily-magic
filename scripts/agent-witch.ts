#!/usr/bin/env node
/**
 * Agent Witch — local WebSocket client + local.agentwitch.com:43347 UI.
 *
 * Run: npx tsx scripts/agent-witch.ts
 * Config: ~/.agent-witch/config.json (legacy) or
 *         ~/.agent-witch/profiles/<email>/config.json (multi-profile)
 *
 * Select profile: AGENT_WITCH_PROFILE=user@example.com
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";

import WebSocket from "ws";

import {
  exitUnlessActiveMacOsConsoleUser,
  startActiveMacOsConsoleUserGuard,
} from "./guardMacOsConsoleUser";
import { bootoutAgentWitchAuxiliaryLaunchAgents } from "./bootoutAgentWitchAuxiliaryLaunchAgents";
import { bootoutAgentWitchLaunchAgentsForCurrentUser } from "./bootoutAgentWitchLaunchAgentsForCurrentUser";
import {
  claimAgentWitchMachineLease,
  releaseAgentWitchMachineLease,
} from "./claimAgentWitchMachineLease";
import { listAgentWitchProfileEmails } from "./listAgentWitchLaunchTargets";
import { terminateOtherAgentWitchClientProcesses } from "./terminateOtherAgentWitchClientProcesses";

import { startAgentWitchInProcessServices } from "./startAgentWitchInProcessServices";
import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
  type AgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";
import {
  continueClaudeTaskAfterInput,
  configureAgentWitchRunCloudApi,
  flushPendingAgentRunCompletions,
  replayPendingRunInputRequests,
  runWriterTask,
  stopAgentRun,
} from "./agentWitchRunSessions";
import { resolveAgentWitchCloudApiConfig } from "./agentWitchCloudApi";
import {
  closeShellPtySession,
  openInteractiveShellPty,
  resizeShellPty,
  writeShellPtyInput,
} from "./agentWitchShellSession";
import {
  buildWriterSessionReadyMessage,
  buildWriterSessionWarmupMessage,
  clearWriterSession,
  isWriterConversationStarted,
  isWriterSessionWarmed,
  markWriterSessionWarmed,
  runWriterSessionStart,
  supportsWriterSessionContinuation,
  supportsWriterSessionWarmup,
} from "./agentWitchWriterSession";
import { ensureHarnessWriterCli } from "./ensureHarnessWriterCli";
import {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";
import {
  listAgentRunsLocal,
  loadAgentRunLocal,
} from "./agentWitchLocalRunStore";
import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
  writeAgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth";
import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import {
  acceptTerminalStream,
  isTerminalStreamAccepted,
  queueTerminalStreamChunk,
} from "./agentWitchTerminalStreamState";
import { requestLocalAgentWitchRestart } from "./requestLocalAgentWitchRestart";
import { runLocalInstallBundleUpdate } from "./runLocalInstallBundleUpdate";
import { readAgentWitchInstallVersion } from "./agentWitchInstallVersion";
import { readInstallBundleVersionFromHeartbeatAck } from "./readInstallBundleVersionFromHeartbeatAck";
import {
  applyAutomationsRunFromCloud,
  applyAutomationsSyncFromCloud,
} from "./handleAgentWitchCloudControlMessages";
import {
  buildDeviceAuthHelloFields,
  verifyServerAttestationLocally,
} from "./agentWitchDeviceKeypair";
import { appendAgentWitchLocalTraffic } from "./agentWitchLocalTrafficLog";
import {
  resolveLocalAppPublicKey,
  startAgentWitchLocalApp,
} from "./agentWitchLocalApp";
import {
  formatRagContextForPrompt,
  indexAgentWitchRagText,
  queryAgentWitchRag,
} from "./agentWitchLocalRag";
import {
  appendAgentWitchMemoryEntry,
  formatMemoryContextForPrompt,
  readAgentWitchMemoryEntries,
} from "./agentWitchLocalMemory";
import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";
import { buildDefaultUserProjectFolderPath } from "./buildDefaultUserProjectFolderPath";
import { ensureAgentWitchProjectFolder } from "./ensureAgentWitchProjectFolder";
import { runWriterEnsure } from "./handleAgentWitchWriterEnsure";
import { runAgentWitchReportCli } from "./agentWitchReportCli";
import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";
import { wrapPromptWithAgentRunReportInstruction } from "./dispatch/agentRunReport.constant";
import { wrapPromptWithPrerecordedAgentRunEstimate } from "./dispatch/wrapPromptWithPrerecordedAgentRunEstimate";
import { generateAgentRunReportKey } from "./dispatch/generateAgentRunReportKey";
import { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "./dispatch/agentRunWorkingEstimate.constant";
import { seedAgentRunReportFile } from "./agentWitchRunReport";
import { runAgentRunPreEstimate } from "./runAgentRunPreEstimate";

interface AgentWitchConfig {
  readonly email: string | null;
  readonly wsUrl: string;
  readonly workspace: string;
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
  readonly pairingToken: string;
  readonly layout: AgentWitchLocalLayout;
}

const DEFAULT_WS_URL = "ws://localhost:3000/api/agent-witch/ws";
const DEFAULT_CLAUDE_COMMAND = "claude";
const DEFAULT_CODEX_COMMAND = "codex";
const DEFAULT_CURSOR_COMMAND = "cursor";
const DEFAULT_ANTIGRAVITY_COMMAND = "agy";
const HEARTBEAT_INTERVAL_MS = 30_000;
const MAX_RECONNECT_DELAY_MS = 30_000;
const shellSessionIdByRunId = new Map<string, string>();
const projectFolderPathByRunId = new Map<string, string>();
const promptByRunId = new Map<string, string>();

const resolveRunProjectFolderPath = (projectFolderPath?: string): string => {
  const trimmed = projectFolderPath?.trim() ?? "";

  return trimmed.length > 0 ? trimmed : buildDefaultUserProjectFolderPath();
};

interface AgentWitchOutboundSocket {
  readonly readyState: number;
  send(data: string): void;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfig = (
  profileEmailOverride?: string | null,
): AgentWitchConfig | null => {
  const layout = resolveAgentWitchLocalLayout(profileEmailOverride);

  if (!fs.existsSync(layout.configPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.configPath, "utf8"),
    );
    if (!isRecord(parsed)) {
      throw new Error("Config must be a JSON object.");
    }

    const envWsUrl = process.env.AGENT_WITCH_WS_URL?.trim() ?? "";
    const configWsUrl =
      typeof parsed.wsUrl === "string" ? parsed.wsUrl.trim() : "";
    const wsUrl =
      envWsUrl.length > 0
        ? envWsUrl
        : configWsUrl.length > 0
          ? configWsUrl
          : DEFAULT_WS_URL;
    const workspace =
      typeof parsed.workspace === "string" && parsed.workspace.length > 0
        ? parsed.workspace
        : process.cwd();
    const claudeCommand =
      typeof parsed.claudeCommand === "string" &&
      parsed.claudeCommand.length > 0
        ? parsed.claudeCommand
        : (process.env.CLAUDE_COMMAND ?? DEFAULT_CLAUDE_COMMAND);
    const codexCommand =
      typeof parsed.codexCommand === "string" && parsed.codexCommand.length > 0
        ? parsed.codexCommand
        : (process.env.CODEX_COMMAND ?? DEFAULT_CODEX_COMMAND);
    const cursorCommand =
      typeof parsed.cursorCommand === "string" &&
      parsed.cursorCommand.length > 0
        ? parsed.cursorCommand
        : (process.env.CURSOR_COMMAND ?? DEFAULT_CURSOR_COMMAND);
    const antigravityCommand =
      typeof parsed.antigravityCommand === "string" &&
      parsed.antigravityCommand.length > 0
        ? parsed.antigravityCommand
        : (process.env.ANTIGRAVITY_COMMAND ?? DEFAULT_ANTIGRAVITY_COMMAND);
    const pairingToken =
      typeof parsed.pairingToken === "string" && parsed.pairingToken.length > 0
        ? parsed.pairingToken.trim()
        : "";
    const configEmail =
      typeof parsed.email === "string" && parsed.email.trim().length > 0
        ? parsed.email.trim().toLowerCase()
        : layout.profileEmail;

    if (pairingToken.length === 0) {
      console.error(
        `[agent-witch] Missing pairingToken in ${layout.configPath}. Re-run the install script.`,
      );
      return null;
    }

    return {
      email: configEmail,
      wsUrl,
      workspace,
      claudeCommand,
      codexCommand,
      cursorCommand,
      antigravityCommand,
      pairingToken,
      layout,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown config error";
    console.error(
      `[agent-witch] Invalid config at ${layout.configPath}: ${message}`,
    );
    return null;
  }
};

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
): Promise<void> => {
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

  const sessionTurn =
    sessionContinuation &&
    supportsWriterSessionContinuation(writerAgent) &&
    isWriterConversationStarted(writerAgent)
      ? "continue"
      : "first";

  let resolvedPrompt = prompt;
  if (
    sessionContinuation &&
    sessionTurn === "first" &&
    typeof sourceRunId === "string" &&
    sourceRunId.length > 0
  ) {
    const priorRun = loadAgentRunLocal(config.layout, sourceRunId);
    if (priorRun !== null) {
      const { buildContinuationPromptWithContext } =
        await import("./buildContinuationPromptWithContext");
      resolvedPrompt = buildContinuationPromptWithContext({
        priorPrompt: priorRun.prompt,
        priorOutput: priorRun.resultOutput ?? "",
        userMessage: prompt,
      });
    }
  }

  const resolvedProjectFolderPath =
    resolveRunProjectFolderPath(projectFolderPath);
  ensureAgentWitchProjectFolder({
    projectFolderPath: resolvedProjectFolderPath,
  });

  const ragChunks = await queryAgentWitchRag({
    layout: config.layout,
    query: resolvedPrompt,
    limit: 5,
    projectFolderPath: resolvedProjectFolderPath,
  });
  const memoryEntries = readAgentWitchMemoryEntries(
    config.layout,
    resolvedProjectFolderPath,
  );
  let promptWithProjectContext = `${formatMemoryContextForPrompt(memoryEntries)}${formatRagContextForPrompt(ragChunks)}${resolvedPrompt}`;

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
      projectFolderPath: resolvedProjectFolderPath,
      reportKey: resolvedReportKey,
      agentRunId,
      userSummary: "Estimating how long this will take…",
    });

    const preEstimate = await runAgentRunPreEstimate({
      config: {
        workspace: config.workspace,
        claudeCommand: config.claudeCommand,
        codexCommand: config.codexCommand,
        cursorCommand: config.cursorCommand,
        antigravityCommand: config.antigravityCommand,
      },
      writerAgent,
      wrappedPrompt: promptWithProjectContext,
      projectFolderPath: resolvedProjectFolderPath,
      reportKey: resolvedReportKey,
      agentRunId,
    });

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
        projectFolderPath: resolvedProjectFolderPath,
        installDir: config.layout.installDir,
      },
    );
  }

  runWriterTask(
    config,
    writerAgent,
    promptWithProjectContext,
    requestId,
    asLegacyWebSocket(socket),
    agentRunId,
    {
      sessionTurn,
    },
    shellSessionId,
    resolvedProjectFolderPath,
    resolvedReportKey,
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

const runHarnessRequest = async (
  config: AgentWitchConfig,
  payload: Readonly<Record<string, unknown>>,
  requestId: string | undefined,
  socket: AgentWitchOutboundSocket,
): Promise<void> => {
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
  })();

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
    state.socket.removeAllListeners();
    if (
      state.socket.readyState === WebSocket.OPEN ||
      state.socket.readyState === WebSocket.CONNECTING
    ) {
      state.socket.close();
    }
    state.socket = undefined;
    state.wsConnected = false;
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
        readAgentWitchInstallVersion(config.layout.installDir)?.bundleVersion ??
        null;
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
            ...(installBundleVersion !== null ? { installBundleVersion } : {}),
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
      const projectFolderPath = resolveRunProjectFolderPath(
        typeof parsed.payload.projectFolderPath === "string"
          ? parsed.payload.projectFolderPath
          : undefined,
      );
      const reportKey =
        typeof parsed.payload.reportKey === "string"
          ? parsed.payload.reportKey
          : undefined;

      if (typeof prompt === "string" && prompt.trim().length > 0) {
        console.log(
          `[agent-witch] Running ${writerAgent} task (${sessionContinuation ? "continue" : "first"})…`,
        );
        if (agentRunId !== undefined && shellSessionId !== undefined) {
          shellSessionIdByRunId.set(agentRunId, shellSessionId);
        }
        if (agentRunId !== undefined) {
          projectFolderPathByRunId.set(agentRunId, projectFolderPath);
          promptByRunId.set(agentRunId, prompt.trim());
          ensureAgentWitchProjectFolder({ projectFolderPath });
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
            await import("./readHarnessExportSets");
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

    if (
      parsed.type === "command.claude.result" &&
      isRecord(parsed.payload) &&
      typeof parsed.payload.output === "string" &&
      parsed.payload.output.trim().length > 0
    ) {
      const agentRunId =
        typeof parsed.payload.agentRunId === "string"
          ? parsed.payload.agentRunId
          : undefined;
      const projectFolderPath = resolveRunProjectFolderPath(
        agentRunId !== undefined
          ? projectFolderPathByRunId.get(agentRunId)
          : undefined,
      );
      const prompt =
        agentRunId !== undefined ? (promptByRunId.get(agentRunId) ?? "") : "";

      void indexAgentWitchRagText({
        layout: config.layout,
        text: parsed.payload.output,
        source: agentRunId ?? "command.claude.result",
        projectFolderPath,
      });

      if (prompt.trim().length > 0) {
        appendAgentWitchMemoryEntry({
          layout: config.layout,
          projectFolderPath,
          entry: {
            id: `${Date.now()}-${agentRunId ?? "run"}`,
            ...(agentRunId !== undefined ? { agentRunId } : {}),
            prompt,
            output: parsed.payload.output,
            createdAt: new Date().toISOString(),
          },
        });
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

    socket.on("close", () => {
      clearHeartbeat();
      state.socket = undefined;
      state.wsConnected = false;
      state.reconnectAttempt += 1;
      console.log("[agent-witch] Disconnected from server.");
      scheduleReconnect();
    });

    socket.on("error", (error) => {
      state.wakeError = error.message;
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
  };
};

const waitForConfigs = async (): Promise<readonly AgentWitchConfig[]> => {
  const loadConfigs = (): readonly AgentWitchConfig[] => {
    const profileEmails = listAgentWitchProfileEmails();
    if (profileEmails.length === 0) {
      const legacy = readConfig(null);
      return legacy === null ? [] : [legacy];
    }

    return profileEmails.flatMap((profileEmail) => {
      const config = readConfig(profileEmail);
      return config === null ? [] : [config];
    });
  };

  const existing = loadConfigs();
  if (existing.length > 0) {
    return existing;
  }

  console.error("[agent-witch] Waiting for valid config…");

  return new Promise((resolve) => {
    const retry = (): void => {
      const configs = loadConfigs();
      if (configs.length > 0) {
        resolve(configs);
        return;
      }

      setTimeout(retry, 10_000);
    };

    retry();
  });
};

const main = async (): Promise<void> => {
  exitUnlessActiveMacOsConsoleUser("agent-witch");

  const machineLease = claimAgentWitchMachineLease();
  if (!machineLease.ok) {
    process.stdout.write(
      "[agent-witch] Another Agent Witch process already owns this Mac user lease — exiting.\n",
    );
    process.exit(0);
  }

  const installDir = resolveAgentWitchInstallDir();
  const terminated = terminateOtherAgentWitchClientProcesses({ installDir });
  if (terminated.length > 0) {
    console.log(
      `[agent-witch] Stopped ${terminated.length} sibling process(es): ${terminated.join(", ")}`,
    );
  }

  bootoutAgentWitchAuxiliaryLaunchAgents();

  const configs = await waitForConfigs();
  const clients = configs.map((config) => createAgentWitchClient(config));
  const primaryClient = clients[0];
  if (primaryClient === undefined) {
    process.stdout.write("[agent-witch] No profile configs found — exiting.\n");
    releaseAgentWitchMachineLease();
    process.exit(0);
  }

  const reconnectWebSockets = (): void => {
    for (const client of clients) {
      client.reviveWebSocket();
    }
  };

  let shutdown = (): void => {
    // replaced after services start
  };

  const inProcessServices = await startAgentWitchInProcessServices({
    reconnectWebSockets,
    onLostMachineLease: () => {
      console.log(
        "[agent-witch] Lost machine lease to another process — shutting down.",
      );
      shutdown();
    },
  });

  startAgentWitchLocalApp({
    layout: configs[0]!.layout,
    controllers: {
      getStatus: primaryClient.getStatus,
      reviveWebSocket: reconnectWebSockets,
    },
  });

  for (const client of clients) {
    client.startLocalHealthCheck();
    client.connect();
  }

  console.log(
    `[agent-witch] Bridging ${clients.length} account profile(s) in one process.`,
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

if (isAgentWitchScriptEntryPoint(import.meta.url)) {
  const reportArgvIndex = process.argv.indexOf("report");
  if (reportArgvIndex >= 0) {
    process.exit(runAgentWitchReportCli(process.argv.slice(reportArgvIndex)));
  }
}

void main();
