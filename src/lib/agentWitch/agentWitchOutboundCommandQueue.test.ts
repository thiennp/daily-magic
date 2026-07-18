import { describe, expect, it } from "vitest";

import {
  enqueueAgentWitchDeviceCommand,
  pollAgentWitchDeviceCommand,
  resetAgentWitchCommandQueuesForTests,
} from "@/lib/agentWitch/agentWitchOutboundCommandQueue";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("agentWitchOutboundCommandQueue", () => {
  it("delivers enqueued commands to pollers (AGENT-017)", async () => {
    resetAgentWitchCommandQueuesForTests();

    enqueueAgentWitchDeviceCommand("device-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { prompt: "hi" },
    });

    const command = await pollAgentWitchDeviceCommand("device-1", 0);
    expect(command?.message.payload?.prompt).toBe("hi");
  });
});
