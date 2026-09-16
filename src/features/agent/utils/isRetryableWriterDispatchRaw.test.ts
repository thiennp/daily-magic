import { describe, expect, it } from "vitest";

import { isRetryableWriterDispatchRaw } from "@/features/agent/utils/isRetryableWriterDispatchRaw";
import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("isRetryableWriterDispatchRaw", () => {
  it("retries only mac_reconnecting error codes", () => {
    const reconnecting = JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
        errorMessage: "reconnecting",
      },
    });
    const offline = JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
        errorMessage: "The selected Mac is not online right now.",
      },
    });

    expect(isRetryableWriterDispatchRaw(reconnecting)).toBe(true);
    expect(isRetryableWriterDispatchRaw(offline)).toBe(false);
  });
});
