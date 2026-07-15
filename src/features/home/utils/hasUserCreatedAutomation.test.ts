import { beforeEach, describe, expect, it } from "vitest";

import hasUserCreatedAutomation from "@/features/home/utils/hasUserCreatedAutomation";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("hasUserCreatedAutomation", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("returns true when db flag is set", () => {
    expect(hasUserCreatedAutomation({ automations: [] }, true)).toBe(true);
  });

  it("returns true when automations list is non-empty", () => {
    expect(
      hasUserCreatedAutomation({ automations: [{ id: "a1" }] }, false),
    ).toBe(true);
  });

  it("returns true when local onboarding flag is set", () => {
    window.localStorage.setItem(
      "daily-magic.onboarding.automation-created.v1",
      "true",
    );

    expect(hasUserCreatedAutomation({ automations: [] }, false)).toBe(true);
  });

  it("returns false when no automation is recorded", () => {
    expect(hasUserCreatedAutomation({ automations: [] }, false)).toBe(false);
    expect(hasUserCreatedAutomation(null, false)).toBe(false);
  });
});
