import {
  CHECK_CONTEXT_TIP_MAX_LINES,
  CHECK_CONTEXT_TIP_MAX_TOKENS,
  estimateTipTokenCount,
} from "./checkContextStatus.constant";
import type { CheckContextPitfallLine } from "./tokenSaverTool.types";

export const formatPitfallBotLine = (pitfall: CheckContextPitfallLine): string =>
  `${pitfall.id} | ${pitfall.avoidance}`;

/**
 * Human tip for a hit: header + id|fix lines, capped to ≤~120 tokens / 4 lines.
 * Pure. Does not match — Mac owns matching until moved to shared.
 */
export const formatCheckContextTip = (
  pitfalls: readonly CheckContextPitfallLine[],
): string => {
  const header = "Agent Witch tip · check_context";
  const lines: string[] = [header];
  let tokens = estimateTipTokenCount(header);

  for (const pitfall of pitfalls) {
    if (lines.length - 1 >= CHECK_CONTEXT_TIP_MAX_LINES) {
      break;
    }
    const line = formatPitfallBotLine(pitfall);
    const lineTokens = estimateTipTokenCount(line);
    if (lines.length > 1 && tokens + lineTokens > CHECK_CONTEXT_TIP_MAX_TOKENS) {
      break;
    }
    lines.push(line);
    tokens += lineTokens;
  }

  return lines.join("\n");
};
