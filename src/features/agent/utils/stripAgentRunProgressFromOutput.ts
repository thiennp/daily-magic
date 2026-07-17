import { parseNextAgentLiveProgressBlock } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import { AGENT_RUN_PROGRESS_MARKER } from "@/lib/dispatch/agentRunProgress.constant";

const stripPartialProgressMarker = (text: string): string => {
  const marker = AGENT_RUN_PROGRESS_MARKER;
  if (text.includes(marker)) {
    return text;
  }

  const partialLength = Array.from(
    { length: marker.length - 1 },
    (_, index) => marker.length - 1 - index,
  ).find((length) => text.endsWith(marker.slice(0, length)));

  if (partialLength === undefined) {
    return text;
  }

  return text.slice(0, -partialLength).trimEnd();
};

const stripProgressRecursive = (remaining: string, result: string): string => {
  const markerIndex = remaining.indexOf(AGENT_RUN_PROGRESS_MARKER);
  if (markerIndex < 0) {
    return `${result}${stripPartialProgressMarker(remaining)}`;
  }

  const afterMarker = markerIndex + AGENT_RUN_PROGRESS_MARKER.length;
  const parsed = parseNextAgentLiveProgressBlock(remaining.slice(afterMarker));
  if (parsed === null) {
    return `${result}${remaining.slice(0, markerIndex)}`;
  }

  return stripProgressRecursive(
    remaining.slice(afterMarker + parsed.consumedLength),
    `${result}${remaining.slice(0, markerIndex)}`,
  );
};

export const stripAgentRunProgressFromOutput = (output: string): string =>
  stripProgressRecursive(output, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
