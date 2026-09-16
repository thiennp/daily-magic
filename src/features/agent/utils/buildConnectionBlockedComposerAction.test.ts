import { describe, expect, it } from "vitest";

import { buildConnectionBlockedComposerAction } from "@/features/agent/utils/buildConnectionBlockedComposerAction";

const baseInput = {
  connectionStatus: "connected" as const,
  isTeamDispatch: false,
  isWorkflowTask: false,
  canCopyPrompt: true,
  hasDispatchReadyMac: true,
  selectedDeviceCanDispatch: true,
  devices: [],
  selectedDeviceId: "",
  devicesHadLoadError: false,
  isSendDisabled: true,
  selectedGroupId: "",
  selectedTargetUserId: "",
  selectedCapabilityId: "",
  manageMacsHref: "/#your-setup",
};

describe("buildConnectionBlockedComposerAction", () => {
  it("OPEN-002: separates browser dashboard connecting from Mac presence", () => {
    const action = buildConnectionBlockedComposerAction("ws_connecting", {
      ...baseInput,
      connectionStatus: "connecting",
    });

    expect(action.helperMessage.toLowerCase()).toContain("dashboard");
    expect(action.helperMessage.toLowerCase()).not.toContain("reconnecting");
  });
});
