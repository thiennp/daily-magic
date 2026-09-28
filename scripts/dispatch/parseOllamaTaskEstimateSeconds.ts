import { parseAgentRunWorkingEstimateSeconds } from "./parseAgentRunWorkingEstimateSeconds";

const LEADING_SECONDS = /^(\d{1,6})\b/;

/** Seconds from an Ollama estimate reply: marker block, or a leading integer. */
export const parseOllamaTaskEstimateSeconds = (
  output: string,
): number | null => {
  const fromMarker = parseAgentRunWorkingEstimateSeconds(output);
  if (fromMarker !== null) {
    return fromMarker;
  }

  const match = LEADING_SECONDS.exec(output.trim());
  if (match === null) {
    return null;
  }

  const seconds = Number.parseInt(match[1] ?? "", 10);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return null;
  }

  return seconds;
};
