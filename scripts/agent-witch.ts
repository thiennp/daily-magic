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
const CONFIG_DIR = path.join(os.homedir(), ".agent-witch");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfig = (): AgentWitchConfig => {
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
    process.exit(1);
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
    const socket = connectionHolder.socket;
    if (socket === undefined) {
      return;
    }

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
    const socket = connectionHolder.socket;
    if (socket === undefined) {
      return;
    }

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

const connectionHolder: { socket?: WebSocket } = {};

const connect = (config: AgentWitchConfig): void => {
  const socket = new WebSocket(config.wsUrl);
  connectionHolder.socket = socket;

  socket.on("open", () => {
    console.log(`[agent-witch] Connected to ${config.wsUrl}`);
    sendMessage(socket, {
      type: "agent.register",
      payload: {
        role: "agent",
        hostname: os.hostname(),
      },
    });
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
          runClaudeTask(config, prompt.trim(), requestId);
        }
      }
    } catch {
      console.error("[agent-witch] Failed to parse inbound message.");
    }
  });

  socket.on("close", () => {
    console.log("[agent-witch] Disconnected. Reconnecting in 5s…");
    connectionHolder.socket = undefined;
    setTimeout(() => {
      connect(config);
    }, 5000);
  });

  socket.on("error", (error) => {
    console.error(`[agent-witch] Socket error: ${error.message}`);
  });
};

const config = readConfig();
connect(config);
