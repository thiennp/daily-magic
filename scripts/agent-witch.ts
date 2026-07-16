#!/usr/bin/env node
/**
 * Agent Witch — local WebSocket client that runs writer agents from the app.
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
  resolveAgentWitchLocalLayout,
  type AgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";
import {
  continueClaudeTaskAfterInput,
  replayPendingRunInputRequests,
  runWriterTask,
} from "./agentWitchRunSessions";
import {
  buildWriterSessionWarmupMessage,
  clearWriterSession,
  isWriterConversationStarted,
  isWriterSessionWarmed,
  markWriterConversationStarted,
  markWriterSessionWarmed,
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
import { writeAgentWitchConnectionHealth } from "./agentWitchConnectionHealth";
import { acceptTerminalStream } from "./agentWitchTerminalStreamState";
import {
  postAgentWitchDeviceHeartbeat,
  resolveAgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import { pollAndExecuteCloudAgentRun } from "./agentWitchCloudJobPoll";

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
const CLOUD_JOB_POLL_INTERVAL_MS = 3_000;
const MAX_RECONNECT_DELAY_MS = 30_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfig = (): AgentWitchConfig | null => {
  const layout = resolveAgentWitchLocalLayout();

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

    const wsUrl =
      typeof parsed.wsUrl === "string" && parsed.wsUrl.length > 0
        ? parsed.wsUrl
        : (process.env.AGENT_WITCH_WS_URL ?? DEFAULT_WS_URL);
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
  socket: WebSocket,
  message: Record<string, unknown>,
): void => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

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
  socket: WebSocket,
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
  socket: WebSocket,
  agentRunId?: string,
  sessionContinuation = false,
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

  runWriterTask(config, writerAgent, prompt, requestId, socket, agentRunId, {
    sessionTurn,
  });

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

  markWriterConversationStarted(writerAgent);
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
  socket: WebSocket,
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
  const cloudApi = resolveAgentWitchCloudApiConfig({
    wsUrl: config.wsUrl,
    pairingToken: config.pairingToken,
  });
  const state: {
    socket?: WebSocket;
    heartbeatTimer?: NodeJS.Timeout;
    httpHeartbeatTimer?: NodeJS.Timeout;
    cloudJobPollTimer?: NodeJS.Timeout;
    reconnectTimer?: NodeJS.Timeout;
    reconnectAttempt: number;
    stopped: boolean;
  } = {
    reconnectAttempt: 0,
    stopped: false,
  };

  const clearHttpHeartbeat = (): void => {
    if (state.httpHeartbeatTimer !== undefined) {
      clearInterval(state.httpHeartbeatTimer);
      state.httpHeartbeatTimer = undefined;
    }
  };

  const clearCloudJobPoll = (): void => {
    if (state.cloudJobPollTimer !== undefined) {
      clearInterval(state.cloudJobPollTimer);
      state.cloudJobPollTimer = undefined;
    }
  };

  const startCloudJobPoll = (): void => {
    if (cloudApi === null) {
      return;
    }

    clearCloudJobPoll();
    const pollCloudJobs = (): void => {
      void pollAndExecuteCloudAgentRun({
        cloudApi,
        workspace: config.workspace,
        claudeCommand: config.claudeCommand,
        codexCommand: config.codexCommand,
        cursorCommand: config.cursorCommand,
        antigravityCommand: config.antigravityCommand,
      });
    };
    pollCloudJobs();
    state.cloudJobPollTimer = setInterval(
      pollCloudJobs,
      CLOUD_JOB_POLL_INTERVAL_MS,
    );
  };

  const startHttpHeartbeat = (): void => {
    if (cloudApi === null) {
      return;
    }

    clearHttpHeartbeat();
    const sendHttpHeartbeat = (): void => {
      void postAgentWitchDeviceHeartbeat(cloudApi, os.hostname());
    };
    sendHttpHeartbeat();
    state.httpHeartbeatTimer = setInterval(
      sendHttpHeartbeat,
      HEARTBEAT_INTERVAL_MS,
    );
  };

  const clearHeartbeat = (): void => {
    if (state.heartbeatTimer !== undefined) {
      clearInterval(state.heartbeatTimer);
      state.heartbeatTimer = undefined;
    }
  };

  const clearReconnectTimer = (): void => {
    if (state.reconnectTimer !== undefined) {
      clearTimeout(state.reconnectTimer);
      state.reconnectTimer = undefined;
    }
  };

  const closeSocket = (): void => {
    if (state.socket !== undefined) {
      state.socket.removeAllListeners();
      if (
        state.socket.readyState === WebSocket.OPEN ||
        state.socket.readyState === WebSocket.CONNECTING
      ) {
        state.socket.close();
      }
      state.socket = undefined;
    }
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
      sendMessage(socket, {
        type: "agent.heartbeat",
        payload: {
          hostname: os.hostname(),
        },
      });
    };
    sendHeartbeat();
    state.heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
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
      console.log(`[agent-witch] Connected to ${config.wsUrl}`);
      if (config.email !== null) {
        console.log(`[agent-witch] Profile: ${config.email}`);
      }
      writeAgentWitchConnectionHealth(config.layout, { wsUrl: config.wsUrl });
      sendMessage(socket, {
        type: "agent.register",
        payload: {
          role: "agent",
          hostname: os.hostname(),
          pairingToken: config.pairingToken,
        },
      });
      reportHarnessManifest(socket, config.layout);
      replayPendingRunInputRequests(config, socket);
      startHeartbeat(socket);
    });

    socket.on("message", (data) => {
      const raw = typeof data === "string" ? data : data.toString("utf8");

      try {
        const parsed: unknown = JSON.parse(raw);
        if (!isRecord(parsed) || typeof parsed.type !== "string") {
          return;
        }

        const requestId =
          typeof parsed.requestId === "string" ? parsed.requestId : undefined;

        if (parsed.type === "system.ack") {
          writeAgentWitchConnectionHealth(config.layout, {
            wsUrl: config.wsUrl,
          });
        }

        if (
          parsed.type === "terminal.stream.accepted" &&
          isRecord(parsed.payload)
        ) {
          const runId =
            typeof parsed.payload.runId === "string"
              ? parsed.payload.runId
              : "";
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
            typeof parsed.payload.runId === "string"
              ? parsed.payload.runId
              : "";
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
          const sessionContinuation =
            parsed.payload.sessionContinuation === true;

          if (typeof prompt === "string" && prompt.trim().length > 0) {
            console.log(`[agent-witch] Running ${writerAgent} task…`);
            void dispatchWriterTask(
              config,
              writerAgent,
              prompt.trim(),
              requestId,
              socket,
              agentRunId,
              sessionContinuation,
            );
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
            console.log(
              "[agent-witch] Continuing Claude task after user input…",
            );
            continueClaudeTaskAfterInput(
              config,
              {
                agentRunId,
                originalPrompt,
                partialOutput,
                question,
                response,
              },
              requestId,
              socket,
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

        if (
          parsed.type === "harness.export.request" &&
          isRecord(parsed.payload)
        ) {
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
      } catch {
        console.error("[agent-witch] Failed to parse inbound message.");
      }
    });

    socket.on("close", () => {
      clearHeartbeat();
      state.socket = undefined;
      state.reconnectAttempt += 1;
      console.log("[agent-witch] Disconnected from server.");
      scheduleReconnect();
    });

    socket.on("error", (error) => {
      console.error(`[agent-witch] Socket error: ${error.message}`);
    });
  };

  const stop = (): void => {
    state.stopped = true;
    clearHeartbeat();
    clearHttpHeartbeat();
    clearCloudJobPoll();
    clearReconnectTimer();
    closeSocket();
  };

  return {
    connect,
    startHttpHeartbeat,
    startCloudJobPoll,
    stop,
  };
};

const waitForConfig = async (): Promise<AgentWitchConfig> => {
  const existingConfig = readConfig();
  if (existingConfig !== null) {
    return existingConfig;
  }

  console.error("[agent-witch] Waiting for valid config…");

  return new Promise((resolve) => {
    const retry = (): void => {
      const config = readConfig();
      if (config !== null) {
        resolve(config);
        return;
      }

      setTimeout(retry, 10_000);
    };

    retry();
  });
};

const main = async (): Promise<void> => {
  const config = await waitForConfig();
  const client = createAgentWitchClient(config);
  client.startHttpHeartbeat();
  client.startCloudJobPoll();
  client.connect();

  const shutdown = (): void => {
    console.log("[agent-witch] Shutting down.");
    client.stop();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

void main();
