import fs from "node:fs";

import type { WriterExecutionBackend } from "./resolveWriterExecutionBackend";
import type { WriterApiSecretsFile } from "./WriterApiSecrets.type";
import { readWriterApiSecretsFile } from "./readWriterApiSecrets";
import { writeWriterApiSecretsFile } from "./writeWriterApiSecrets";
import { isUnchangedMaskedWriterApiKeyInput } from "./maskWriterApiKeyForDisplay";
import { normalizeWriterApiModelForStorage } from "./resolveWriterApiModel";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface WriterApiSettingsFormInput {
  readonly configPath: string;
  readonly writerExecutionBackend: WriterExecutionBackend;
  readonly anthropicApiKey?: string;
  readonly anthropicModel?: string;
  readonly openaiApiKey?: string;
  readonly openaiModel?: string;
  readonly googleApiKey?: string;
  readonly googleModel?: string;
}

const mergeProviderSecret = (
  existing: WriterApiSecretsFile,
  provider: keyof WriterApiSecretsFile,
  apiKeyInput: string | undefined,
  modelInput: string | undefined,
): WriterApiSecretsFile => {
  const previous = existing[provider];
  const rawApiKey = apiKeyInput?.trim() ?? "";
  const apiKey = isUnchangedMaskedWriterApiKeyInput(rawApiKey, previous?.apiKey)
    ? ""
    : rawApiKey;
  const nextKey = apiKey.length > 0 ? apiKey : previous?.apiKey;
  if (nextKey === undefined || nextKey.length === 0) {
    return existing;
  }

  const nextModel =
    modelInput !== undefined
      ? normalizeWriterApiModelForStorage(modelInput)
      : previous?.model;

  return {
    ...existing,
    [provider]: {
      apiKey: nextKey,
      ...(nextModel !== undefined ? { model: nextModel } : {}),
    },
  };
};

export const applyWriterApiSettings = (
  input: WriterApiSettingsFormInput,
): void => {
  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    input.configPath,
  );

  let configObject: Record<string, unknown> = {};
  if (fs.existsSync(input.configPath)) {
    try {
      const parsed: unknown = JSON.parse(
        fs.readFileSync(input.configPath, "utf8"),
      );
      if (isRecord(parsed)) {
        configObject = { ...parsed };
      }
    } catch {
      configObject = {};
    }
  }

  configObject.writerExecutionBackend = input.writerExecutionBackend;
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(
    input.configPath,
    `${JSON.stringify(configObject, null, 2)}\n`,
    "utf8",
  );

  const secrets = mergeProviderSecret(
    mergeProviderSecret(
      mergeProviderSecret(
        readWriterApiSecretsFile(profileDir),
        "anthropic",
        input.anthropicApiKey,
        input.anthropicModel,
      ),
      "openai",
      input.openaiApiKey,
      input.openaiModel,
    ),
    "google",
    input.googleApiKey,
    input.googleModel,
  );

  writeWriterApiSecretsFile(profileDir, secrets);
};
