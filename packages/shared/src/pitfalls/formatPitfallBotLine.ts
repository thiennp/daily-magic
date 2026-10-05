import { oneLine } from "./oneLine";

export type PitfallBotLineInput = {
  readonly id: string;
  readonly avoidance: string;
};

/** Compact bot line: `id|avoidance` (whitespace collapsed). */
export const formatPitfallBotLine = (pitfall: PitfallBotLineInput): string =>
  `${oneLine(pitfall.id)}|${oneLine(pitfall.avoidance)}`;
