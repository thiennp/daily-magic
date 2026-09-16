import path from "node:path";

import type { HarnessWriterAgentId } from "../buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { resolveWriterApiProvider } from "./resolveWriterApiProvider";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { resolveWriterExecutionBackend } from "./resolveWriterExecutionBackend";

export const resolveAgentWitchProfileDirFromConfigPath = (
  configPath: string,
): string => path.dirname(configPath);

export const shouldUseWriterApi = (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
): boolean => {
  if (resolveWriterExecutionBackend(config.writerExecutionBackend) !== "api") {
    return false;
  }
  const provider = resolveWriterApiProvider(writerAgent);
  if (provider === null) {
    return false;
  }
  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const secret = readWriterApiProviderSecret(profileDir, provider);
  return secret !== null && secret.apiKey.length > 0;
};
