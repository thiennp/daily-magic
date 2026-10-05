import type { Pitfall, PitfallBotLine } from "../../public-api/types";
import {
  PITFALL_MATCH_MAX_LINES,
  PITFALL_MATCH_MAX_TOKENS,
  estimateTokenCount,
} from "./pitfall.constants";

export const formatPitfallBotLine = (pitfall: Pitfall): string =>
  `${pitfall.id} | ${pitfall.avoidance}`;

export const toPitfallBotLines = (
  pitfalls: readonly Pitfall[],
): readonly PitfallBotLine[] =>
  pitfalls.map((pitfall) => ({
    id: pitfall.id,
    avoidance: pitfall.avoidance,
  }));

/**
 * Cap bot payload to ≤4 lines and ~200 tokens. Pure.
 */
export const capPitfallsForBot = (
  pitfalls: readonly Pitfall[],
): readonly Pitfall[] => {
  const selected: Pitfall[] = [];
  let tokens = 0;

  for (const pitfall of pitfalls) {
    if (selected.length >= PITFALL_MATCH_MAX_LINES) {
      break;
    }
    const line = formatPitfallBotLine(pitfall);
    const lineTokens = estimateTokenCount(line);
    if (selected.length > 0 && tokens + lineTokens > PITFALL_MATCH_MAX_TOKENS) {
      break;
    }
    selected.push(pitfall);
    tokens += lineTokens;
  }

  return selected;
};
