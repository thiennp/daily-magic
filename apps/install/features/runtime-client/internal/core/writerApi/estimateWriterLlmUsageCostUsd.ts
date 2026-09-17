import type WriterLlmUsage from "../writerLlmUsage.type";

type ModelPricePerMillion = {
  readonly inputUsd: number;
  readonly outputUsd: number;
};

const PRICE_PER_MILLION_USD: Record<string, ModelPricePerMillion> = {
  "claude-sonnet-4-20250514": { inputUsd: 3, outputUsd: 15 },
  "claude-3-5-sonnet-20241022": { inputUsd: 3, outputUsd: 15 },
  "gpt-4.1-mini": { inputUsd: 0.4, outputUsd: 1.6 },
  "gpt-4.1": { inputUsd: 2, outputUsd: 8 },
  "gpt-4o-mini": { inputUsd: 0.15, outputUsd: 0.6 },
  "gemini-2.0-flash": { inputUsd: 0.1, outputUsd: 0.4 },
  "gemini-2.5-flash": { inputUsd: 0.15, outputUsd: 0.6 },
};

const resolveModelPrice = (model: string): ModelPricePerMillion | null => {
  const direct = PRICE_PER_MILLION_USD[model];
  if (direct !== undefined) {
    return direct;
  }

  const normalized = model.toLowerCase();
  if (normalized.includes("sonnet")) {
    return PRICE_PER_MILLION_USD["claude-sonnet-4-20250514"];
  }
  if (normalized.includes("gpt-4.1-mini")) {
    return PRICE_PER_MILLION_USD["gpt-4.1-mini"];
  }
  if (normalized.includes("gemini") && normalized.includes("flash")) {
    return PRICE_PER_MILLION_USD["gemini-2.0-flash"];
  }

  return null;
};

export const estimateWriterLlmUsageCostUsd = (
  model: string,
  inputTokens: number,
  outputTokens: number,
): number | null => {
  const price = resolveModelPrice(model);
  if (price === null) {
    return null;
  }

  const inputCost = (inputTokens / 1_000_000) * price.inputUsd;
  const outputCost = (outputTokens / 1_000_000) * price.outputUsd;
  return inputCost + outputCost;
};

export const withEstimatedWriterLlmCost = (
  usage: Omit<WriterLlmUsage, "estimatedCostUsd" | "estimateIsApproximate">,
): WriterLlmUsage => {
  const estimatedCostUsd = estimateWriterLlmUsageCostUsd(
    usage.model,
    usage.inputTokens,
    usage.outputTokens,
  );

  return {
    ...usage,
    estimatedCostUsd,
    estimateIsApproximate: true,
  };
};
