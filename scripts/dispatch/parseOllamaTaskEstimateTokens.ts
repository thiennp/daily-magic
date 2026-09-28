import { AGENT_RUN_WORKING_TOKEN_ESTIMATE_MARKER } from "./agentRunWorkingTokenEstimate.constant";

const LEADING_TOKENS = /^(\d{1,8})\b/;

const parseMarkerTokens = (output: string): number | null => {
  const markerAt = output.indexOf(AGENT_RUN_WORKING_TOKEN_ESTIMATE_MARKER);
  if (markerAt < 0) {
    return null;
  }

  const afterMarker = output
    .slice(markerAt + AGENT_RUN_WORKING_TOKEN_ESTIMATE_MARKER.length)
    .trim();
  const match = LEADING_TOKENS.exec(afterMarker);
  if (match === null) {
    return null;
  }

  const tokens = Number.parseInt(match[1] ?? "", 10);
  return Number.isFinite(tokens) && tokens >= 1 ? tokens : null;
};

/** Total tokens from an Ollama reply: marker block, or a leading integer. */
export const parseOllamaTaskEstimateTokens = (
  output: string,
): number | null => {
  const fromMarker = parseMarkerTokens(output);
  if (fromMarker !== null) {
    return fromMarker;
  }

  const match = LEADING_TOKENS.exec(output.trim());
  if (match === null) {
    return null;
  }

  const tokens = Number.parseInt(match[1] ?? "", 10);
  return Number.isFinite(tokens) && tokens >= 1 ? tokens : null;
};
