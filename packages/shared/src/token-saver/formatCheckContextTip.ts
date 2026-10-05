import {
  estimateTokenCount,
  formatPitfallBotLine,
  truncateTextToTokenBudget,
} from "@agent-witch/shared/pitfalls";
import {
  CHECK_CONTEXT_TIP_MAX_LINES,
  CHECK_CONTEXT_TIP_MAX_TOKENS,
} from "./checkContextStatus.constant";
import type { CheckContextPitfallLine } from "./tokenSaverTool.types";

/**
 * Human tip for a hit: header + id|fix lines, capped to ≤~120 tokens / 4 lines.
 * If the header alone exceeds the budget, it is truncated to fit.
 */
export const formatCheckContextTip = (
  pitfalls: readonly CheckContextPitfallLine[],
): string => {
  const header = truncateTextToTokenBudget(
    "Agent Witch tip · check_context",
    CHECK_CONTEXT_TIP_MAX_TOKENS,
  );
  if (estimateTokenCount(header) >= CHECK_CONTEXT_TIP_MAX_TOKENS) {
    return header;
  }

  const lines: string[] = [header];
  let tokens = estimateTokenCount(header);

  for (const pitfall of pitfalls) {
    if (lines.length - 1 >= CHECK_CONTEXT_TIP_MAX_LINES) {
      break;
    }
    const line = formatPitfallBotLine(pitfall);
    const lineTokens = estimateTokenCount(line);
    if (tokens + lineTokens > CHECK_CONTEXT_TIP_MAX_TOKENS) {
      break;
    }
    lines.push(line);
    tokens += lineTokens;
  }

  return lines.join("\n");
};
