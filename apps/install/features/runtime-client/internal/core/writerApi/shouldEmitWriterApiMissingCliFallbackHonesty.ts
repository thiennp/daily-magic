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

  // Only claude-cli has an Anthropic Writer API key to be missing. Codex,
  // Cursor and Antigravity run on their own CLI sign-in, so a missing
  // provider key is never a signal for them.
  if (writerAgent !== "claude-cli") {
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
