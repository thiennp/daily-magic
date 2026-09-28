import type { HarnessWriterAgentId } from "../buildWriterCliInvocation";
import { isHarnessWriterAgentId } from "../buildWriterCliInvocation";
import { readWriterApiProviderSecret } from "../writerApi/readWriterApiSecrets";
import { resolveWriterApiModel } from "../writerApi/resolveWriterApiModel";
import { resolveWriterApiProvider } from "../writerApi/resolveWriterApiProvider";
import { resolveWriterExecutionBackend } from "../writerApi/resolveWriterExecutionBackend";
import { resolveAgentWitchProfileDirFromConfigPath } from "../writerApi/shouldUseWriterApi";

const CLI_WRITER_LABELS: Record<HarnessWriterAgentId, string> = {
  "claude-cli": "Claude CLI",
  codex: "Codex CLI",
  cursor: "Cursor agent CLI",
  antigravity: "Antigravity CLI",
};

const API_WRITER_LABELS = {
  anthropic: "Anthropic API",
  openai: "OpenAI API",
  google: "Google API",
};

export const resolveTaskWriterEstimateLabel = (input: {
  readonly writerAgent: string;
  readonly writerExecutionBackend: unknown;
  readonly configPath: string;
}): string => {
  if (!isHarnessWriterAgentId(input.writerAgent)) {
    return "the selected writer";
  }

  const provider = resolveWriterApiProvider(input.writerAgent);
  if (
    resolveWriterExecutionBackend(input.writerExecutionBackend) === "api" &&
    provider !== null
  ) {
    const secret = readWriterApiProviderSecret(
      resolveAgentWitchProfileDirFromConfigPath(input.configPath),
      provider,
    );
    if (secret !== null && secret.apiKey.length > 0) {
      const model = resolveWriterApiModel(provider, secret.model);
      return `${API_WRITER_LABELS[provider]} model ${model}`;
    }
  }

  return CLI_WRITER_LABELS[input.writerAgent];
};
