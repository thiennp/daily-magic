import type WriterLlmUsage from "../writerLlmUsage.type";

import type { WriterApiProvider } from "./WriterApiProvider.constant";
import { resolveWriterApiModel } from "./resolveWriterApiModel";
import { parseWriterLlmUsageFromApiBody } from "./parseWriterLlmUsageFromApiBody";
import type { WriterApiProviderSecret } from "./WriterApiSecrets.type";

export interface CallWriterApiInput {
  readonly provider: WriterApiProvider;
  readonly secret: WriterApiProviderSecret;
  readonly prompt: string;
  readonly onChunk?: (chunk: string) => void;
  /** When set (e.g. Marketplace plan/estimate catalog id), overrides stored profile model. */
  readonly modelOverride?: string;
}

export interface CallWriterApiResult {
  readonly exitCode: number;
  readonly output: string;
  readonly llmUsage?: WriterLlmUsage;
}

const extractAnthropicText = (body: unknown): string => {
  if (typeof body !== "object" || body === null) {
    return "";
  }
  const content = (body as { content?: unknown }).content;
  if (!Array.isArray(content)) {
    return "";
  }
  return content
    .map((block) => {
      if (typeof block !== "object" || block === null) {
        return "";
      }
      const typed = block as { type?: unknown; text?: unknown };
      return typed.type === "text" && typeof typed.text === "string"
        ? typed.text
        : "";
    })
    .join("");
};

const resolveCallWriterApiModel = (
  provider: WriterApiProvider,
  secret: WriterApiProviderSecret,
  modelOverride: string | undefined,
): string => {
  const override = modelOverride?.trim() ?? "";
  if (override.length > 0) {
    return override;
  }
  return resolveWriterApiModel(provider, secret.model);
};

const callAnthropicApi = async (
  input: CallWriterApiInput,
): Promise<CallWriterApiResult> => {
  const model = resolveCallWriterApiModel(
    "anthropic",
    input.secret,
    input.modelOverride,
  );
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": input.secret.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      messages: [{ role: "user", content: input.prompt }],
    }),
  });

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error?: { message?: string } }).error?.message ===
        "string"
        ? (body as { error: { message: string } }).error.message
        : `Anthropic API error (${String(response.status)})`;
    return { exitCode: 1, output: message };
  }

  const text = extractAnthropicText(body);
  if (text.length > 0) {
    input.onChunk?.(text);
  }
  const llmUsage = parseWriterLlmUsageFromApiBody("anthropic", body, model);
  return {
    exitCode: 0,
    output: text,
    ...(llmUsage !== null ? { llmUsage } : {}),
  };
};

const extractOpenAiText = (body: unknown): string => {
  if (typeof body !== "object" || body === null) {
    return "";
  }
  const choices = (body as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    return "";
  }
  const first = choices[0];
  if (typeof first !== "object" || first === null) {
    return "";
  }
  const message = (first as { message?: { content?: unknown } }).message;
  return typeof message?.content === "string" ? message.content : "";
};

const callOpenAiApi = async (
  input: CallWriterApiInput,
): Promise<CallWriterApiResult> => {
  const model = resolveCallWriterApiModel(
    "openai",
    input.secret,
    input.modelOverride,
  );
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${input.secret.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: input.prompt }],
    }),
  });

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error?: { message?: string } }).error?.message ===
        "string"
        ? (body as { error: { message: string } }).error.message
        : `OpenAI API error (${String(response.status)})`;
    return { exitCode: 1, output: message };
  }

  const text = extractOpenAiText(body);
  if (text.length > 0) {
    input.onChunk?.(text);
  }
  const llmUsage = parseWriterLlmUsageFromApiBody("openai", body, model);
  return {
    exitCode: 0,
    output: text,
    ...(llmUsage !== null ? { llmUsage } : {}),
  };
};

const extractGoogleText = (body: unknown): string => {
  if (typeof body !== "object" || body === null) {
    return "";
  }
  const candidates = (body as { candidates?: unknown }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return "";
  }
  const first = candidates[0];
  if (typeof first !== "object" || first === null) {
    return "";
  }
  const parts = (first as { content?: { parts?: unknown } }).content?.parts;
  if (!Array.isArray(parts)) {
    return "";
  }
  return parts
    .map((part) => {
      if (typeof part !== "object" || part === null) {
        return "";
      }
      const text = (part as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .join("");
};

const callGoogleApi = async (
  input: CallWriterApiInput,
): Promise<CallWriterApiResult> => {
  const model = resolveCallWriterApiModel(
    "google",
    input.secret,
    input.modelOverride,
  );
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(input.secret.apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: input.prompt }] }],
    }),
  });

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error?: { message?: string } }).error?.message ===
        "string"
        ? (body as { error: { message: string } }).error.message
        : `Google API error (${String(response.status)})`;
    return { exitCode: 1, output: message };
  }

  const text = extractGoogleText(body);
  if (text.length > 0) {
    input.onChunk?.(text);
  }
  const llmUsage = parseWriterLlmUsageFromApiBody("google", body, model);
  return {
    exitCode: 0,
    output: text,
    ...(llmUsage !== null ? { llmUsage } : {}),
  };
};

export const callWriterApi = async (
  input: CallWriterApiInput,
): Promise<CallWriterApiResult> => {
  try {
    if (input.provider === "anthropic") {
      return await callAnthropicApi(input);
    }
    if (input.provider === "openai") {
      return await callOpenAiApi(input);
    }
    return await callGoogleApi(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { exitCode: -1, output: message };
  }
};
