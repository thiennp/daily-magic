import { describe, expect, it } from "vitest";

import { hasScheduledAutomationFromResponse } from "@/features/home/utils/hasScheduledAutomationFromResponse";

describe("hasScheduledAutomationFromResponse", () => {
  it("returns true when automations array is non-empty", () => {
    expect(
      hasScheduledAutomationFromResponse({
        automations: [{ id: "auto-1" }],
      }),
    ).toBe(true);
  });

  it("returns false when automations array is empty", () => {
    expect(hasScheduledAutomationFromResponse({ automations: [] })).toBe(false);
  });
});
