import { describe, expect, it } from "vitest";

import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";

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
