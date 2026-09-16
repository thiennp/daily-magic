import { describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildWriterDispatchTargetMacOfflineError } from "@/lib/dispatch/buildWriterDispatchTargetMacOfflineError";

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  isDeviceLiveOnAnotherInstance: vi.fn(async () => false),
}));

vi.mock("@/lib/agentWitch/classifyAgentWitchDispatchUnavailability", () => ({
  classifyAgentWitchDispatchUnavailability: vi.fn(async () => "offline"),
}));

describe("buildWriterDispatchTargetMacOfflineError", () => {
  it("returns mac_reconnecting when the device is live on another hub instance", async () => {
    const { isDeviceLiveOnAnotherInstance } =
      await import("@/lib/agentWitch/agentWitchConnectionRegistry");
    vi.mocked(isDeviceLiveOnAnotherInstance).mockResolvedValueOnce(true);

    const message = await buildWriterDispatchTargetMacOfflineError({
      executorUserId: "user-1",
      deviceId: "device-1",
    });

    expect(message.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(message.payload?.errorCode).toBe(
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  });

  it("returns mac_offline when the Mac is not on the hub and not recently seen", async () => {
    const message = await buildWriterDispatchTargetMacOfflineError({
      executorUserId: "user-1",
      deviceId: "device-1",
    });

    expect(message.payload?.errorCode).toBe(
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
    );
  });
});
