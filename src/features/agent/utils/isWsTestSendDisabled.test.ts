import { describe, expect, it } from "vitest";

import { isWsTestSendDisabled } from "@/features/agent/utils/isWsTestSendDisabled";

const baseInput = {
  connectionStatus: "connected",
  isWorkflowTask: false,
  workflowValidationErrors: [],
  prompt: "Do something",
  resolvedPrompt: "Do something",
  selectedGroupId: "",
  selectedTargetUserId: "",
  isTeamDispatch: false,
  selectedCapabilityId: "",
  isLibraryPlaybook: false,
  hasOnlineMac: true,
  selectedDeviceIsOnline: true,
};

describe("isWsTestSendDisabled", () => {
  it("disables send when browser websocket is disconnected", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        connectionStatus: "disconnected",
      }),
    ).toBe(true);
  });

  it("disables send when no Mac is online for self-dispatch", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        hasOnlineMac: false,
      }),
    ).toBe(true);
  });

  it("disables send when selected Mac is offline", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        selectedDeviceIsOnline: false,
      }),
    ).toBe(true);
  });

  it("allows send for team dispatch without Mac online checks", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        isTeamDispatch: true,
        hasOnlineMac: false,
        selectedDeviceIsOnline: false,
        selectedGroupId: "group-1",
        selectedTargetUserId: "user-2",
        selectedCapabilityId: "cap-1",
      }),
    ).toBe(false);
  });
});
