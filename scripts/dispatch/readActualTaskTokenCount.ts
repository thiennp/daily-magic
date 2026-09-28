import type WriterLlmUsage from "@/lib/agentWitch/writerLlmUsage.type";

const INPUT_TOKENS = /"input_tokens"\s*:\s*(\d+)/;
const OUTPUT_TOKENS = /"output_tokens"\s*:\s*(\d+)/;

const readPositiveInt = (match: RegExpExecArray | null): number | null => {
  if (match === null) {
    return null;
  }
  const value = Number.parseInt(match[1] ?? "", 10);
  return Number.isFinite(value) && value >= 0 ? value : null;
};

/** Writer-reported total tokens. Null when the run did not report usage. */
export const readActualTaskTokenCount = (
  llmUsage: WriterLlmUsage | undefined,
  output: string,
): number | null => {
  if (llmUsage !== undefined && llmUsage.totalTokens >= 1) {
    return llmUsage.totalTokens;
  }

  const inputTokens = readPositiveInt(INPUT_TOKENS.exec(output));
  const outputTokens = readPositiveInt(OUTPUT_TOKENS.exec(output));
  if (inputTokens === null || outputTokens === null) {
    return null;
  }

  const total = inputTokens + outputTokens;
  return total >= 1 ? total : null;
};
