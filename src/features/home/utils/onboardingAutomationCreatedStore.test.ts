import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  markOnboardingAutomationCreated,
  readOnboardingAutomationCreated,
  writeOnboardingAutomationCreatedLocal,
} from "@/features/home/utils/onboardingAutomationCreatedStore";
import { ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT } from "@/features/home/utils/onboardingAutomationCreatedEvents";
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
    const listener = vi.fn();
    window.addEventListener(
      ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT,
      listener,
    );

    writeOnboardingAutomationCreatedLocal();

    expect(readOnboardingAutomationCreated()).toBe(true);
    expect(persistMock).not.toHaveBeenCalled();
    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(
      ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT,
      listener,
    );
  });
});
