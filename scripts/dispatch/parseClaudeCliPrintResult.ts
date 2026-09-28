import type WriterLlmUsage from "@/lib/agentWitch/writerLlmUsage.type";

export type ClaudeCliPrintResult = {
  readonly text: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
  readonly model: string;
  readonly costUsd: number | null;
};

const readCount = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : 0;

const pickPrimaryModel = (modelUsage: unknown): string => {
  if (typeof modelUsage !== "object" || modelUsage === null) {
    return "claude";
  }

  const ranked = Object.entries(modelUsage as Record<string, unknown>).map(
    ([name, value]) => {
      if (typeof value !== "object" || value === null) {
        return { name, total: 0 };
      }
      const row = value as Record<string, unknown>;
      return {
        name,
        total:
          readCount(row.inputTokens) +
          readCount(row.outputTokens) +
          readCount(row.cacheReadInputTokens) +
          readCount(row.cacheCreationInputTokens),
      };
    },
  );
  const best = [...ranked].sort((left, right) => right.total - left.total)[0];
  return best !== undefined && best.name.length > 0 ? best.name : "claude";
};

/** Claude `-p --output-format json`. Totals include cache read and cache write. */
export const parseClaudeCliPrintResult = (
  raw: string,
): ClaudeCliPrintResult | null => {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed.slice(start, end + 1));
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  if (record.type !== "result" || typeof record.result !== "string") {
    return null;
  }

  const usage = record.usage;
  if (typeof usage !== "object" || usage === null) {
    return null;
  }

  const usageRecord = usage as Record<string, unknown>;
  const inputTokens =
    readCount(usageRecord.input_tokens) +
    readCount(usageRecord.cache_creation_input_tokens) +
    readCount(usageRecord.cache_read_input_tokens);
  const outputTokens = readCount(usageRecord.output_tokens);
  const totalTokens = inputTokens + outputTokens;
  if (totalTokens < 1) {
    return null;
  }

  return {
    text: record.result,
    inputTokens,
    outputTokens,
    totalTokens,
    model: pickPrimaryModel(record.modelUsage),
    costUsd:
      typeof record.total_cost_usd === "number" ? record.total_cost_usd : null,
  };
};

export const claudeCliPrintUsage = (
  parsed: ClaudeCliPrintResult,
): WriterLlmUsage => ({
  provider: "anthropic",
  model: parsed.model,
  inputTokens: parsed.inputTokens,
  outputTokens: parsed.outputTokens,
  totalTokens: parsed.totalTokens,
  estimatedCostUsd: parsed.costUsd,
  estimateIsApproximate: false,
});

export const resolveClaudeCliPrintOutput = (
  output: string,
  llmUsage?: WriterLlmUsage,
): { readonly output: string; readonly llmUsage?: WriterLlmUsage } => {
  const parsed = parseClaudeCliPrintResult(output);
  if (parsed === null) {
    return { output, ...(llmUsage !== undefined ? { llmUsage } : {}) };
  }

  return {
    output: parsed.text,
    llmUsage: llmUsage ?? claudeCliPrintUsage(parsed),
  };
};
