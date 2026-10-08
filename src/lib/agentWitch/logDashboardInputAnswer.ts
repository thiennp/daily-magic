import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

/**
 * 8181f143 (Testi recheck @300): an answer reached a paused run and nobody
 * could tell which browser sent it. Each answer now leaves one server log
 * line with the run, the answer length and the browser (never the text).
 */
export const logDashboardInputAnswer = (
  request: Request,
  body: AgentWitchMessage,
): void => {
  if (body.type !== AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_RESPOND) {
    return;
  }
  const runId =
    typeof body.payload?.agentRunId === "string"
      ? body.payload.agentRunId.slice(0, 8)
      : "?";
  const length =
    typeof body.payload?.response === "string"
      ? body.payload.response.length
      : 0;
  const userAgent = (request.headers.get("user-agent") ?? "unknown").slice(
    0,
    160,
  );
  const referer = (request.headers.get("referer") ?? "").slice(0, 160);
  console.log(
    `[agent-witch] input answer for run ${runId} (${length} chars) from ${userAgent}${referer.length > 0 ? ` on ${referer}` : ""}`,
  );
};
