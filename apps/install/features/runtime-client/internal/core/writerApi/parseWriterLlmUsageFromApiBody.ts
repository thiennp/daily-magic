import type WriterLlmUsage from "../writerLlmUsage.type";
import type { WriterApiProvider } from "./WriterApiProvider.constant";
import { withEstimatedWriterLlmCost } from "./estimateWriterLlmUsageCostUsd";

const readNonNegativeInt = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
};

export const parseAnthropicUsage = (
  body: unknown,
  model: string,
): WriterLlmUsage | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const usage = (body as { usage?: unknown }).usage;
  if (typeof usage !== "object" || usage === null) {
    return null;
  }
  const inputTokens = readNonNegativeInt(
    (usage as { input_tokens?: unknown }).input_tokens,
  );
  const outputTokens = readNonNegativeInt(
    (usage as { output_tokens?: unknown }).output_tokens,
  );
  if (inputTokens === 0 && outputTokens === 0) {
    return null;
  }

  return withEstimatedWriterLlmCost({
    provider: "anthropic",
    model,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  });
};

export const parseOpenAiUsage = (
  body: unknown,
  model: string,
): WriterLlmUsage | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const usage = (body as { usage?: unknown }).usage;
  if (typeof usage !== "object" || usage === null) {
    return null;
  }
  const inputTokens = readNonNegativeInt(
    (usage as { prompt_tokens?: unknown }).prompt_tokens,
  );
  const outputTokens = readNonNegativeInt(
    (usage as { completion_tokens?: unknown }).completion_tokens,
  );
  if (inputTokens === 0 && outputTokens === 0) {
    return null;
  }

  return withEstimatedWriterLlmCost({
    provider: "openai",
    model,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  });
};

export const parseGoogleUsage = (
  body: unknown,
  model: string,
): WriterLlmUsage | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const usageMetadata = (body as { usageMetadata?: unknown }).usageMetadata;
  if (typeof usageMetadata !== "object" || usageMetadata === null) {
    return null;
  }
  const inputTokens = readNonNegativeInt(
    (usageMetadata as { promptTokenCount?: unknown }).promptTokenCount,
  );
  const outputTokens = readNonNegativeInt(
    (usageMetadata as { candidatesTokenCount?: unknown }).candidatesTokenCount,
  );
  if (inputTokens === 0 && outputTokens === 0) {
    return null;
  }

  return withEstimatedWriterLlmCost({
    provider: "google",
    model,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  });
};

export const parseWriterLlmUsageFromApiBody = (
  provider: WriterApiProvider,
  body: unknown,
  model: string,
): WriterLlmUsage | null => {
  if (provider === "anthropic") {
    return parseAnthropicUsage(body, model);
  }
  if (provider === "openai") {
    return parseOpenAiUsage(body, model);
  }
  return parseGoogleUsage(body, model);
};
