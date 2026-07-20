import { AGENT_RUN_INPUT_MARKER } from "@/lib/dispatch/agentRunInputGuardrails.constant";

import type { AgentLiveProgressCheckpointExchange } from "@/features/agent/utils/agentLiveProgressCheckpointExchange.type";

export const parseLegacyAwaitingInputExchange = (
  output: string,
): AgentLiveProgressCheckpointExchange | null => {
  const markerIndex = output.indexOf(AGENT_RUN_INPUT_MARKER);
  if (markerIndex < 0) {
    return null;
  }

  const afterMarker = output
    .slice(markerIndex + AGENT_RUN_INPUT_MARKER.length)
    .trimStart();
  const questionEnd = afterMarker.search(/\r?\n\r?\n/);
  const questionLine =
    questionEnd < 0
      ? (afterMarker.split(/\r?\n/)[0]?.trim() ?? "")
      : afterMarker.slice(0, questionEnd).trim();
  const answerBody =
    questionEnd < 0 ? "" : afterMarker.slice(questionEnd).trim();

  if (questionLine.length === 0 || answerBody.length === 0) {
    return null;
  }

  const answer = answerBody.split(/\r?\n/)[0]?.trim() ?? "";
  if (answer.length === 0) {
    return null;
  }

  return {
    question: questionLine,
    answer,
    offset: markerIndex,
  };
};
