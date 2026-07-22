import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { sendAgentRunStop } from "@/features/dispatch/utils/sendAgentRunStop";

describe("sendAgentRunStop", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends stop over an open websocket", async () => {
    const send = vi.fn();
    const socket = { readyState: WebSocket.OPEN, send } as unknown as WebSocket;

    const result = await sendAgentRunStop(socket, "run-1");

    expect(result).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(send.mock.calls[0]?.[0] as string) as {
      type: string;
      payload: { agentRunId: string };
    };
    expect(payload.type).toBe(AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP);
    expect(payload.payload.agentRunId).toBe("run-1");
  });

  it("falls back to the HTTP stop route when the socket is closed", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    const result = await sendAgentRunStop(null, "run-2");

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/agent-runs/run-2/stop",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
