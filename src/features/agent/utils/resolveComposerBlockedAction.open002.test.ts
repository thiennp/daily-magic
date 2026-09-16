import { describe, expect, it } from "vitest";

import { resolveComposerBlockedAction } from "@/features/agent/utils/resolveComposerBlockedAction";

const baseInput = {
  connectionStatus: "connected" as const,
  isTeamDispatch: false,
  isWorkflowTask: false,
  canCopyPrompt: true,
  hasDispatchReadyMac: true,
  selectedDeviceCanDispatch: true,
  devices: [
    { id: "mac-a", isConnected: true, isOnline: true },
    { id: "mac-b", isConnected: false, isOnline: true },
  ],
  selectedDeviceId: "mac-a",
  devicesHadLoadError: false,
  isSendDisabled: true,
  selectedGroupId: "",
  selectedTargetUserId: "",
  selectedCapabilityId: "",
  manageMacsHref: "/#your-setup",
};

describe("resolveComposerBlockedAction OPEN-002", () => {
  it("surfaces no_macs_online when dispatch-ready flag is false for offline tier", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      hasDispatchReadyMac: false,
      selectedDeviceCanDispatch: false,
      devices: [
        {
          id: "mac-a",
          isConnected: false,
          isOnline: false,
          presenceTier: "offline",
        },
      ],
    });

    expect(action.stateId).toBe("no_macs_online");
  });
});
