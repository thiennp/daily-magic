import { spawn } from "node:child_process";

import {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";
import {
  claimAgentRunFromCloud,
  completeAgentRunOnCloud,
  type AgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";

export interface AgentWitchCloudJobConfig {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly workspace: string;
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
}

let cloudJobInFlight = false;

const runWriterForCloudJob = (
  config: AgentWitchCloudJobConfig,
  writerAgent: string,
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

export const pollAndExecuteCloudAgentRun = async (
  config: AgentWitchCloudJobConfig,
): Promise<void> => {
  if (cloudJobInFlight) {
    return;
  }

  cloudJobInFlight = true;

  try {
    const claimed = await claimAgentRunFromCloud(config.cloudApi);

    if (claimed === null) {
      return;
    }

    console.log(`[agent-witch] Claimed cloud run ${claimed.id}`);
    const result = await runWriterForCloudJob(
      config,
      claimed.writerAgent,
      claimed.prompt,
    );
    const completed = await completeAgentRunOnCloud(
      config.cloudApi,
      claimed.id,
      result.exitCode,
      result.output,
    );

    if (!completed) {
      console.error(
        `[agent-witch] Failed to report completion for run ${claimed.id}.`,
      );
    }
  } finally {
    cloudJobInFlight = false;
  }
};
