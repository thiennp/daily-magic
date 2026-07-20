import { AGENT_RUN_INPUT_MARKER } from "@/lib/dispatch/agentRunInputGuardrails.constant";

import { AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER } from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";

const stripAwaitingInputBlock = (output: string): string => {
  const markerIndex = output.indexOf(AGENT_RUN_INPUT_MARKER);
  if (markerIndex < 0) {
    return output;
  }

  const afterMarker = output.slice(markerIndex + AGENT_RUN_INPUT_MARKER.length);
  const nextProgress = afterMarker.search(/\[\[(?:PROGRESS|CHECKPOINT_QA)\]\]/);
  const strippedAfter = nextProgress < 0 ? "" : afterMarker.slice(nextProgress);
  const remaining = `${output.slice(0, markerIndex)}${strippedAfter}`;

  return stripAwaitingInputBlock(remaining);
};

export const stripAgentLiveProgressCheckpointFromOutput = (
  output: string,
): string =>
  stripAwaitingInputBlock(output)
    .split(AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER)
    .map((segment, index) => {
      if (index === 0) {
        return segment;
      }

      const nextMarker = segment.search(/\[\[(?:PROGRESS|AWAITING_INPUT)\]\]/);
      return nextMarker < 0 ? "" : segment.slice(nextMarker);
    })
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
