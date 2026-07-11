#!/usr/bin/env node
/**
 * Agent Witch — local WebSocket client that runs Claude CLI tasks from the app.
 *
 * Run: npx tsx scripts/agent-witch.ts
 * Config: ~/.agent-witch/config.json
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import WebSocket from "ws";

interface AgentWitchConfig {
  readonly wsUrl: string;
  readonly workspace: string;
  readonly claudeCommand: string;
}

const DEFAULT_WS_URL = "ws://localhost:3000/api/agent-witch/ws";
const DEFAULT_CLAUDE_COMMAND = "claude";
const HEARTBEAT_INTERVAL_MS = 30_000;
const MAX_RECONNECT_DELAY_MS = 30_000;
const CONFIG_DIR = path.join(os.homedir(), ".agent-witch");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfig = (): AgentWitchConfig | null => {
  if (!fs.existsSync(CONFIG_PATH)) {
    return {
      wsUrl: process.env.AGENT_WITCH_WS_URL ?? DEFAULT_WS_URL,
      workspace: process.cwd(),
      claudeCommand: process.env.CLAUDE_COMMAND ?? DEFAULT_CLAUDE_COMMAND,
    };
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
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

    return { wsUrl, workspace, claudeCommand };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown config error";
    console.error(`[agent-witch] Invalid config at ${CONFIG_PATH}: ${message}`);
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

const runClaudeTask = (
  config: AgentWitchConfig,
  prompt: string,
  requestId: string | undefined,
  socket: WebSocket,
): void => {
  const child = spawn(config.claudeCommand, ["-p", prompt], {
    cwd: config.workspace,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });

  const outputChunks: string[] = [];

  child.stdout.on("data", (chunk: Buffer) => {
    outputChunks.push(chunk.toString("utf8"));
  });

  child.stderr.on("data", (chunk: Buffer) => {
    outputChunks.push(chunk.toString("utf8"));
  });

  child.on("close", (exitCode) => {
    sendMessage(socket, {
      type: "command.claude.result",
      payload: {
        exitCode: exitCode ?? -1,
        output: outputChunks.join("").trim(),
      },
      requestId,
    });
  });

  child.on("error", (error) => {
    sendMessage(socket, {
      type: "command.claude.result",
      payload: {
        exitCode: -1,
        output: "",
        errorMessage: error.message,
      },
      requestId,
    });
  });
};

const computeReconnectDelayMs = (attempt: number): number => {
  const delayMs = 1000 * 2 ** attempt;
  return Math.min(MAX_RECONNECT_DELAY_MS, delayMs);
};

const createAgentWitchClient = (config: AgentWitchConfig) => {
  const state: {
    socket?: WebSocket;
    heartbeatTimer?: NodeJS.Timeout;
    reconnectTimer?: NodeJS.Timeout;
    reconnectAttempt: number;
    stopped: boolean;
  } = {
    reconnectAttempt: 0,
    stopped: false,
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
    state.heartbeatTimer = setInterval(() => {
      sendMessage(socket, {
        type: "agent.heartbeat",
        payload: {
          hostname: os.hostname(),
        },
      });
    }, HEARTBEAT_INTERVAL_MS);
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
      sendMessage(socket, {
        type: "agent.register",
        payload: {
          role: "agent",
          hostname: os.hostname(),
        },
      });
      startHeartbeat(socket);
    });

    socket.on("message", (data) => {
      const raw = typeof data === "string" ? data : data.toString("utf8");

      try {
        const parsed: unknown = JSON.parse(raw);
        if (!isRecord(parsed) || typeof parsed.type !== "string") {
          return;
        }

        if (parsed.type === "command.claude.run" && isRecord(parsed.payload)) {
          const prompt = parsed.payload.prompt;
          const requestId =
            typeof parsed.requestId === "string" ? parsed.requestId : undefined;

          if (typeof prompt === "string" && prompt.trim().length > 0) {
            console.log("[agent-witch] Running Claude CLI task…");
            runClaudeTask(config, prompt.trim(), requestId, socket);
          }
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
    clearReconnectTimer();
    closeSocket();
  };

  return {
    connect,
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
