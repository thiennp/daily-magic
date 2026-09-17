import fs from "node:fs";

import type { WriterApiProvider } from "./WriterApiProvider.constant";
import type {
  WriterApiProviderSecret,
  WriterApiSecretsFile,
} from "./WriterApiSecrets.type";
import { normalizeWriterApiModelForStorage } from "./resolveWriterApiModel";
import { resolveWriterApiSecretsPath } from "./writerApiSecretsPath";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseProviderSecret = (
  value: unknown,
): WriterApiProviderSecret | null => {
  if (!isRecord(value)) {
    return null;
  }
  const apiKey = typeof value.apiKey === "string" ? value.apiKey.trim() : "";
  if (apiKey.length === 0) {
    return null;
  }
  const rawModel = typeof value.model === "string" ? value.model : undefined;
  const model = normalizeWriterApiModelForStorage(rawModel);
  return { apiKey, ...(model !== undefined ? { model } : {}) };
};

export const readWriterApiSecretsFile = (
  profileDir: string,
): WriterApiSecretsFile => {
  const secretsPath = resolveWriterApiSecretsPath(profileDir);
  if (!fs.existsSync(secretsPath)) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(secretsPath, "utf8"));
    if (!isRecord(parsed)) {
      return {};
    }

    const result: WriterApiSecretsFile = {};
    const providers: WriterApiProvider[] = ["anthropic", "openai", "google"];
    for (const provider of providers) {
      const secret = parseProviderSecret(parsed[provider]);
      if (secret !== null) {
        result[provider] = secret;
      }
    }
    return result;
  } catch {
    return {};
  }
};

export const readWriterApiProviderSecret = (
  profileDir: string,
  provider: WriterApiProvider,
): WriterApiProviderSecret | null =>
  readWriterApiSecretsFile(profileDir)[provider] ?? null;
