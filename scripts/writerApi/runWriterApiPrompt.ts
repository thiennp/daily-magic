import { appendWriterLlmUsageFooter } from "@/lib/agentWitch/formatWriterLlmUsageFooter";
import type WriterLlmUsage from "@/lib/agentWitch/writerLlmUsage.type";

import type { HarnessWriterAgentId } from "../buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { callWriterApi } from "./callWriterApi";
import { resolveWriterApiProvider } from "./resolveWriterApiProvider";
import {
  readWriterApiProviderSecret,
  readWriterApiSecretsFile,
} from "./readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";

export const runWriterApiPrompt = async (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
  onChunk?: (chunk: string) => void,
): Promise<{
  readonly exitCode: number;
  readonly output: string;
  readonly llmUsage?: WriterLlmUsage;
}> => {
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    return {
      exitCode: -1,
      output: "Writer instruction must be a non-empty string.",
    };
  }

  const provider = resolveWriterApiProvider(writerAgent);
  if (provider === null) {
    return {
      exitCode: -1,
      output: `${writerAgent} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`,
    };
  }

  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const secret = readWriterApiProviderSecret(profileDir, provider);
  if (secret === null) {
    const saved = Object.keys(readWriterApiSecretsFile(profileDir));
    return {
      exitCode: -1,
      output: `No API key saved for ${provider}. Add one in Agent Witch Local → Writer API (${saved.length === 0 ? "writer-api-secrets.json is empty" : `have keys for: ${saved.join(", ")}`}).`,
    };
  }

  const apiResult = await callWriterApi({
    provider,
    secret,
    prompt: trimmed,
    onChunk,
  });

  return {
    exitCode: apiResult.exitCode,
    output: appendWriterLlmUsageFooter(apiResult.output, apiResult.llmUsage),
    ...(apiResult.llmUsage !== undefined
      ? { llmUsage: apiResult.llmUsage }
      : {}),
  };
};
