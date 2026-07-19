import { AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER } from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";
import type { AgentLiveProgressCheckpointExchange } from "@/features/agent/utils/agentLiveProgressCheckpointExchange.type";
import { parseCheckpointQaBlock } from "@/features/agent/utils/parseAgentLiveProgressCheckpointBlock";
import { parseLegacyAwaitingInputExchange } from "@/features/agent/utils/parseLegacyAwaitingInputCheckpoint";

const collectCheckpointQaBlocks = (
  remaining: string,
  offset: number,
  exchanges: readonly AgentLiveProgressCheckpointExchange[],
): readonly AgentLiveProgressCheckpointExchange[] => {
  const markerIndex = remaining.indexOf(
    AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER,
  );
  if (markerIndex < 0) {
    return exchanges;
  }

  const blockStart =
    offset + markerIndex + AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER.length;
  const afterMarker = remaining.slice(
    markerIndex + AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER.length,
  );
  const nextMarkerIndex = afterMarker.indexOf(
    AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER,
  );
  const blockBody =
    nextMarkerIndex < 0 ? afterMarker : afterMarker.slice(0, nextMarkerIndex);
  const parsed = parseCheckpointQaBlock(blockBody, blockStart);
  const nextRemaining =
    nextMarkerIndex < 0 ? "" : afterMarker.slice(nextMarkerIndex);
  const nextOffset =
    nextMarkerIndex < 0
      ? offset + remaining.length
      : offset +
        markerIndex +
        AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER.length +
        nextMarkerIndex;

  return collectCheckpointQaBlocks(
    nextRemaining,
    nextOffset,
    parsed === null ? exchanges : [...exchanges, parsed],
  );
};

export const parseAgentLiveProgressCheckpointExchanges = (
  output: string,
): readonly AgentLiveProgressCheckpointExchange[] => {
  const structured = collectCheckpointQaBlocks(output, 0, []);
  if (structured.length > 0) {
    return structured;
  }

  const legacy = parseLegacyAwaitingInputExchange(output);
  return legacy === null ? [] : [legacy];
};
