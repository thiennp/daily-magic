import { spawn } from "node:child_process";

import {
  formatLocalCodingToolRefusal,
  LocalCodingToolRefusalCode,
} from "@agent-witch/shared/dispatch";

import {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../../../scripts/buildWriterCliInvocation";
import { resolveClaudeCliPrintOutput } from "../../../../../../scripts/dispatch/parseClaudeCliPrintResult";
import { runWriterApiPrompt } from "./writerApi/runWriterApiPrompt";
import { shouldUseWriterApi } from "./writerApi/shouldUseWriterApi";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";
import { isCodingToolsPaused } from "./safety/codingToolsPauseStore";

export type AgentWitchHeadlessWriterConfig = AgentWitchRunConfig;

export const runHeadlessWriter = (
  config: AgentWitchRunConfig,
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

    // S0-7a: local "Pause all coding tools" refuses new headless runs too.
    if (isCodingToolsPaused(config.layout.configPath)) {
      resolve({
        exitCode: -1,
        output: formatLocalCodingToolRefusal(
          LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED,
        ),
      });
      return;
    }

    if (shouldUseWriterApi(config, writerAgent)) {
      void runWriterApiPrompt(config, writerAgent, prompt).then(resolve);
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

    const stdoutChunks: string[] = [];
    const stderrChunks: string[] = [];
    child.stdout?.on("data", (chunk: Buffer) => {
      stdoutChunks.push(chunk.toString("utf8"));
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      stderrChunks.push(chunk.toString("utf8"));
    });

    child.on("close", (code) => {
      const printed = resolveClaudeCliPrintOutput(stdoutChunks.join(""));
      const stderrText = stderrChunks.join("").trim();
      const output = [printed.output.trim(), stderrText]
        .filter((part) => part.length > 0)
        .join("\n");
      resolve({
        exitCode: code ?? -1,
        output,
      });
    });

    child.on("error", (error) => {
      resolve({
        exitCode: -1,
        output: error.message,
      });
    });
  });
