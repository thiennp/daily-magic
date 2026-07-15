import { spawn } from "node:child_process";

import {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "./buildWriterCliInvocation";

export interface AgentWitchHeadlessWriterConfig {
  readonly workspace: string;
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
}

export const runHeadlessWriter = (
  config: AgentWitchHeadlessWriterConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
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
      prompt,
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

    const child = spawn(invocation.command, invocation.args, {
      cwd: config.workspace,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const outputChunks: string[] = [];
    child.stdout?.on("data", (chunk: Buffer) => {
      outputChunks.push(chunk.toString("utf8"));
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      outputChunks.push(chunk.toString("utf8"));
    });

    child.on("close", (code) => {
      resolve({
        exitCode: code ?? -1,
        output: outputChunks.join(""),
      });
    });

    child.on("error", (error) => {
      resolve({
        exitCode: -1,
        output: error.message,
      });
    });
  });
