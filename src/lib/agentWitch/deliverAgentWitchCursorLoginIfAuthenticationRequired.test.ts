import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearAgentWitchCursorLoginDeliveryRegistryForTests } from "@/lib/agentWitch/agentWitchCursorLoginDeliveryRegistry";
import { CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET } from "@/lib/agentWitch/cursorAuthenticationRequiredErrorSnippet.constant";
import { deliverAgentWitchCursorLoginIfAuthenticationRequired } from "@/lib/agentWitch/deliverAgentWitchCursorLoginIfAuthenticationRequired";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("deliverAgentWitchCursorLoginIfAuthenticationRequired (AGENT-044)", () => {
  beforeEach(() => {
    clearAgentWitchCursorLoginDeliveryRegistryForTests();
  });

  it("sends writer.ensure for cursor when authentication is required", () => {
    const send = vi.fn();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      deviceId: "device-1",
      send,
    };

    const delivered = deliverAgentWitchCursorLoginIfAuthenticationRequired(
      sender,
      `Error: ${CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET}`,
    );

    expect(delivered).toBe(true);
    expect(send).toHaveBeenCalledWith({
      type: AGENT_WITCH_MESSAGE_TYPES.WRITER_ENSURE,
      payload: {
        writerAgent: "cursor",
        reason: "cursor-authentication-required",
      },
    });
  });

  it("throttles repeated deliveries for the same device", () => {
    const send = vi.fn();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      deviceId: "device-1",
      send,
    };
    const output = `Error: ${CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET}`;

    expect(
      deliverAgentWitchCursorLoginIfAuthenticationRequired(sender, output),
    ).toBe(true);
    expect(
      deliverAgentWitchCursorLoginIfAuthenticationRequired(sender, output),
    ).toBe(false);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("skips non-agent senders", () => {
    const send = vi.fn();
    const sender: AgentWitchHubClient = {
      id: "dash-1",
      role: "dashboard",
      send,
    };

    const delivered = deliverAgentWitchCursorLoginIfAuthenticationRequired(
      sender,
      `Error: ${CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET}`,
    );

    expect(delivered).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
});
