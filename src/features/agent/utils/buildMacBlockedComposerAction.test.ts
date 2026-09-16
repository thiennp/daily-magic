import { describe, expect, it } from "vitest";

import { buildMacBlockedComposerAction } from "@/features/agent/utils/buildMacBlockedComposerAction";
import type { ResolveComposerBlockedActionInput } from "@/features/agent/utils/composerBlockedAction.types";

const baseInput: ResolveComposerBlockedActionInput = {
  connectionStatus: "connected",
  isTeamDispatch: false,
  isWorkflowTask: false,
  canCopyPrompt: true,
  hasDispatchReadyMac: true,
  selectedDeviceCanDispatch: false,
  devices: [],
  selectedDeviceId: "mac-a",
  devicesHadLoadError: false,
  isSendDisabled: true,
  selectedGroupId: "",
  selectedTargetUserId: "",
  selectedCapabilityId: "",
  manageMacsHref: "/#your-setup",
};

describe("buildMacBlockedComposerAction", () => {
  it("OPEN-002: uses reconnecting copy for live_other_instance", () => {
    const action = buildMacBlockedComposerAction(
      "selected_mac_offline",
      {
        ...baseInput,
        devices: [
          {
            id: "mac-a",
            isConnected: false,
            isOnline: true,
            presenceTier: "live_other_instance",
          },
        ],
      },
      null,
    );

    expect(action.helperMessage).toContain("another server");
    expect(action.helperMessage).not.toContain("offline");
  });

  it("OPEN-002: uses soft reconnecting copy for recent tier, not offline", () => {
    const action = buildMacBlockedComposerAction(
      "selected_mac_offline",
      {
        ...baseInput,
        devices: [
          {
            id: "mac-a",
            isConnected: false,
            isOnline: true,
            presenceTier: "recent",
          },
        ],
      },
      null,
    );

    expect(action.helperMessage.toLowerCase()).toContain("seen recently");
    expect(action.helperMessage.toLowerCase()).not.toContain("offline");
  });

  it("OPEN-002: uses offline copy for hard offline tier, not reconnecting", () => {
    const action = buildMacBlockedComposerAction(
      "selected_mac_offline",
      {
        ...baseInput,
        devices: [
          {
            id: "mac-a",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
          },
        ],
      },
      null,
    );

    expect(action.helperMessage.toLowerCase()).toContain("offline");
    expect(action.helperMessage).not.toContain("another server");
  });
});
