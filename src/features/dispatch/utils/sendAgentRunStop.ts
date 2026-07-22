import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";

export const sendAgentRunStop = (
  socket: WebSocket | null,
  agentRunId: string,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  if (agentRunId.trim().length === 0) {
    return Promise.resolve({
      ok: false,
      errorMessage: "No active run to stop.",
    });
  }

  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId },
        requestId: createAgentWitchRequestId(),
      }),
    );
    return Promise.resolve({ ok: true });
  }

  return fetch(`/api/agent-runs/${encodeURIComponent(agentRunId)}/stop`, {
    method: "POST",
  })
    .then(async (response) => {
      const data: unknown = await response.json().catch(() => null);

      if (
        response.ok &&
        typeof data === "object" &&
        data !== null &&
        "ok" in data &&
        (data as { ok: boolean }).ok === true
      ) {
        return { ok: true };
      }

      const errorMessage =
        typeof data === "object" &&
        data !== null &&
        "errorMessage" in data &&
        typeof (data as { errorMessage: unknown }).errorMessage === "string"
          ? (data as { errorMessage: string }).errorMessage
          : "Could not stop run.";

      return { ok: false, errorMessage };
    })
    .catch(() => ({ ok: false, errorMessage: "Could not stop run." }));
};
