import { describe, expect, it } from "vitest";

import { resolveComposerBlockedAction } from "@/features/agent/utils/resolveComposerBlockedAction";

const baseInput = {
  connectionStatus: "connected" as const,
  isTeamDispatch: false,
  isWorkflowTask: false,
  canCopyPrompt: true,
  hasOnlineMac: true,
  selectedDeviceIsOnline: true,
  devices: [
    { id: "mac-a", isOnline: true },
    { id: "mac-b", isOnline: false },
  ],
  selectedDeviceId: "mac-a",
  devicesHadLoadError: false,
  isSendDisabled: true,
  selectedGroupId: "",
  selectedTargetUserId: "",
  selectedCapabilityId: "",
  manageMacsHref: "/#your-setup",
};

describe("resolveComposerBlockedAction", () => {
  it("returns none when send is enabled", () => {
    expect(
      resolveComposerBlockedAction({
        ...baseInput,
        isSendDisabled: false,
      }).stateId,
    ).toBe("none");
  });

  it("maps websocket connecting to a reconnecting helper", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      connectionStatus: "connecting",
    });

    expect(action.stateId).toBe("ws_connecting");
    expect(action.showQueue).toBe(false);
  });

  it("offers queue when websocket is disconnected and prompt can be copied", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      connectionStatus: "disconnected",
    });

    expect(action.stateId).toBe("ws_disconnected");
    expect(action.showQueue).toBe(true);
    expect(action.primaryManualAction).toBe("queue");
  });

  it("offers queue when all macs are offline and prompt can be copied", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      hasOnlineMac: false,
      selectedDeviceIsOnline: false,
      devices: [{ id: "mac-a", isOnline: false }],
    });

    expect(action.stateId).toBe("no_macs_online");
    expect(action.showQueue).toBe(true);
    expect(action.primaryManualAction).toBe("queue");
    expect(action.helperLinkHref).toBe("/#your-setup");
  });

  it("offers use-online-mac when another mac is online", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      selectedDeviceId: "mac-b",
      selectedDeviceIsOnline: false,
    });

    expect(action.stateId).toBe("selected_mac_offline");
    expect(action.showUseOnlineMac).toBe(true);
    expect(action.alternateOnlineDeviceId).toBe("mac-a");
    expect(action.primaryManualAction).toBe("use_online_mac");
  });

  it("surfaces retry when the devices api fails", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      devicesHadLoadError: true,
    });

    expect(action.stateId).toBe("devices_api_error");
    expect(action.showRetryDevices).toBe(true);
    expect(action.primaryManualAction).toBe("retry_devices");
  });

  it("maps incomplete team dispatch fields", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      isTeamDispatch: true,
      selectedGroupId: "group-1",
      selectedTargetUserId: "user-1",
      selectedCapabilityId: "",
    });

    expect(action.stateId).toBe("team_dispatch_incomplete");
  });

  it("maps empty prompt to form incomplete", () => {
    const action = resolveComposerBlockedAction({
      ...baseInput,
      canCopyPrompt: false,
    });

    expect(action.stateId).toBe("form_incomplete");
    expect(action.showCopy).toBe(false);
  });
});
