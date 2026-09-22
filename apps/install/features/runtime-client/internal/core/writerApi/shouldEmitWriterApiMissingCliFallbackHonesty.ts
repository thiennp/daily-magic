import type { HarnessWriterAgentId } from "../../../../../../../scripts/buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { resolveWriterApiProvider } from "./resolveWriterApiProvider";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";
import { shouldUseWriterApi } from "./shouldUseWriterApi";

export const shouldEmitWriterApiMissingCliFallbackHonesty = (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
): boolean => {
  if (shouldUseWriterApi(config, writerAgent)) {
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
  return secret === null || secret.apiKey.trim().length === 0;
};
