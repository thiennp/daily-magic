import { beforeEach, describe, expect, it, vi } from "vitest";

import { readOnboardingAutomationCreated } from "@/features/home/utils/onboardingAutomationCreatedStore";
import syncOnboardingAutomationCreatedFlag from "@/features/home/utils/syncOnboardingAutomationCreatedFlag";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const persistMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/home/utils/onboardingAutomationCreatedApi", () => ({
  persistOnboardingAutomationCreated: persistMock,
  fetchOnboardingAutomationCreated: vi.fn(),
}));

describe("syncOnboardingAutomationCreatedFlag", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    persistMock.mockClear();
  });

  it("writes local flag when DB says done (HOME-008)", () => {
    syncOnboardingAutomationCreatedFlag(true);

    expect(readOnboardingAutomationCreated()).toBe(true);
    expect(persistMock).not.toHaveBeenCalled();
  });

  it("migrates local-only true flag to the API once (HOME-008)", () => {
    window.localStorage.setItem(
      "daily-magic.onboarding.automation-created.v1",
      "true",
    );

    syncOnboardingAutomationCreatedFlag(false);

    expect(persistMock).toHaveBeenCalledTimes(1);
  });

  it("does nothing when both local and DB are incomplete", () => {
    syncOnboardingAutomationCreatedFlag(false);

    expect(persistMock).not.toHaveBeenCalled();
    expect(readOnboardingAutomationCreated()).toBe(false);
  });
});
