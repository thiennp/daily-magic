import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  markOnboardingAutomationCreated,
  readOnboardingAutomationCreated,
  writeOnboardingAutomationCreatedLocal,
} from "@/features/home/utils/onboardingAutomationCreatedStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const persistMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/home/utils/onboardingAutomationCreatedApi", () => ({
  persistOnboardingAutomationCreated: persistMock,
}));

describe("onboardingAutomationCreatedStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    persistMock.mockClear();
  });

  it("persists automation-created across reads", () => {
    expect(readOnboardingAutomationCreated()).toBe(false);

    markOnboardingAutomationCreated();

    expect(readOnboardingAutomationCreated()).toBe(true);
    expect(persistMock).toHaveBeenCalledTimes(1);
  });

  it("writes local flag without posting when syncing from DB", () => {
    writeOnboardingAutomationCreatedLocal();

    expect(readOnboardingAutomationCreated()).toBe(true);
    expect(persistMock).not.toHaveBeenCalled();
  });
});
