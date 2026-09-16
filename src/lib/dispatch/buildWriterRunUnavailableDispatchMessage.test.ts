import { describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { buildWriterRunUnavailableDispatchMessage } from "@/lib/dispatch/buildWriterRunUnavailableDispatchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

vi.mock("@/lib/agentWitch/buildAgentWitchDispatchUnavailableResult", () => ({
  buildAgentWitchDispatchUnavailableResult: vi.fn(async () => ({
    kind: "retry" as const,
    errorMessage: "Mac reconnecting",
    errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
  })),
}));

describe("buildWriterRunUnavailableDispatchMessage", () => {
  it("returns mac_reconnecting without creating a run (AGENT-022)", async () => {
    const message = await buildWriterRunUnavailableDispatchMessage({
      deviceId: "device-1",
      requestId: "req-1",
    });

    expect(message).toEqual({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Mac reconnecting",
        errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
      },
      requestId: "req-1",
    });
  });
});
