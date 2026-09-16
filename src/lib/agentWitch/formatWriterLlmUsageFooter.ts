import type WriterLlmUsage from "@/lib/agentWitch/writerLlmUsage.type";

const formatTokenCount = (value: number): string =>
  value.toLocaleString("en-US");

const formatUsd = (value: number): string =>
  value < 0.01 ? value.toFixed(4) : value.toFixed(3);

export const formatWriterLlmUsageFooter = (usage: WriterLlmUsage): string => {
  const costLine =
    usage.estimatedCostUsd === null
      ? "Est. cost: unavailable (model not in local price table)"
      : `Est. cost: ~$${formatUsd(usage.estimatedCostUsd)} USD${usage.estimateIsApproximate ? " (approximate list price)" : ""}`;

  return [
    "",
    "— Agent Witch usage —",
    `Model: ${usage.model} (${usage.provider})`,
    `Tokens: ${formatTokenCount(usage.inputTokens)} in / ${formatTokenCount(usage.outputTokens)} out (${formatTokenCount(usage.totalTokens)} total)`,
    costLine,
  ].join("\n");
};

export const appendWriterLlmUsageFooter = (
  output: string,
  usage: WriterLlmUsage | undefined,
): string => {
  if (usage === undefined) {
    return output;
  }

  const footer = formatWriterLlmUsageFooter(usage);
  if (output.includes("— Agent Witch usage —")) {
    return output;
  }

  const trimmed = output.trimEnd();
  return trimmed.length > 0 ? `${trimmed}\n${footer}` : footer;
};
