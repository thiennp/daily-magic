import { describe, expect, it } from "vitest";

import {
  resolveSendTaskModalPanelKey,
  shouldKeepDockedPanelOnExpand,
} from "@/features/agent/utils/resolveSendTaskModalPanelKey";

describe("resolveSendTaskModalPanelKey", () => {
  it("AGENT-032: uses a fresh key for Start so the picker remounts", () => {
    expect(
      resolveSendTaskModalPanelKey({
        shouldRestoreLiveSession: false,
        capabilityFromUrl: "custom",
        now: () => 1_700_000_000_000,
      }),
    ).toBe("fresh-loyw3v28");
  });

  it("AGENT-032: keeps a stable key when restoring a live session", () => {
    expect(
      resolveSendTaskModalPanelKey({
        shouldRestoreLiveSession: true,
        capabilityFromUrl: "custom",
      }),
    ).toBe("custom");
  });
});

describe("shouldKeepDockedPanelOnExpand (bedd8c5f)", () => {
  it("keeps the docked panel (and its Failed run) on Expand", () => {
    expect(
      shouldKeepDockedPanelOnExpand({
        keepAlive: true,
        isResumeLive: true,
        sourceRunId: "",
      }),
    ).toBe(true);
  });

  it("remounts for a new dialog or a specific run", () => {
    expect(
      shouldKeepDockedPanelOnExpand({
        keepAlive: false,
        isResumeLive: true,
        sourceRunId: "",
      }),
    ).toBe(false);
    expect(
      shouldKeepDockedPanelOnExpand({
        keepAlive: true,
        isResumeLive: false,
        sourceRunId: "",
      }),
    ).toBe(false);
    expect(
      shouldKeepDockedPanelOnExpand({
        keepAlive: true,
        isResumeLive: true,
        sourceRunId: "812e1568",
      }),
    ).toBe(false);
  });
});
