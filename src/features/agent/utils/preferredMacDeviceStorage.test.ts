import { describe, expect, it, beforeEach, afterEach } from "vitest";

import { PREFERRED_MAC_DEVICE_STORAGE_KEY } from "@/features/agent/constants/preferredMacDeviceStorage.constant";
import {
  hasRememberedMacDeviceInList,
  readPreferredMacDeviceId,
  writePreferredMacDeviceId,
} from "@/features/agent/utils/preferredMacDeviceStorage";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("preferredMacDeviceStorage (AGENT-027)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns empty when no preferred Mac is stored", () => {
    expect(readPreferredMacDeviceId()).toBe("");
    expect(hasRememberedMacDeviceInList(["mac-a", "mac-b"])).toBe(false);
  });

  it("persists and recognizes a preferred Mac still in the paired list", () => {
    writePreferredMacDeviceId("mac-b");

    expect(readPreferredMacDeviceId()).toBe("mac-b");
    expect(window.localStorage.getItem(PREFERRED_MAC_DEVICE_STORAGE_KEY)).toBe(
      "mac-b",
    );
    expect(hasRememberedMacDeviceInList(["mac-a", "mac-b"])).toBe(true);
    expect(hasRememberedMacDeviceInList(["mac-a"])).toBe(false);
  });

  it("ignores empty device ids when writing", () => {
    writePreferredMacDeviceId("");

    expect(readPreferredMacDeviceId()).toBe("");
  });
});
