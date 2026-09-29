import { parseClaudeCliPrintResult } from "../../../../adapters/writerDispatch";

const USAGE_PAIR =
  /"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g;

/** Writer-reported tokens for one call. Null when the reply has no usage. */
export const readPromptSdlcWriterTokens = (raw: string): number | null => {
  const claude = parseClaudeCliPrintResult(raw);
  if (claude !== null) {
    return claude.totalTokens;
  }

  const pairs = [...raw.matchAll(USAGE_PAIR)];
  const last = pairs[pairs.length - 1];
  if (last === undefined) {
    return null;
  }

  const total = Number(last[1]) + Number(last[2]);
  return Number.isFinite(total) && total >= 1 ? total : null;
};
