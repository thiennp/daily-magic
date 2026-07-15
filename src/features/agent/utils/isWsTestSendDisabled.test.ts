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
  hasDispatchReadyMac: true,
  selectedDeviceCanDispatch: true,
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

  it("disables send when no Mac is dispatch-ready for self-dispatch", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        hasDispatchReadyMac: false,
      }),
    ).toBe(true);
  });

  it("disables send when selected Mac cannot dispatch", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        selectedDeviceCanDispatch: false,
      }),
    ).toBe(true);
  });

  it("allows send for team dispatch without Mac online checks", () => {
    expect(
      isWsTestSendDisabled({
        ...baseInput,
        isTeamDispatch: true,
        hasDispatchReadyMac: false,
        selectedDeviceCanDispatch: false,
        selectedGroupId: "group-1",
        selectedTargetUserId: "user-2",
        selectedCapabilityId: "cap-1",
      }),
    ).toBe(false);
  });
});
