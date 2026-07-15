import { beforeEach, describe, expect, it, vi } from "vitest";

import syncOnboardingFirstTaskSentFlag from "@/features/home/utils/syncOnboardingFirstTaskSentFlag";
import { readOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const persistMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/home/utils/onboardingFirstTaskSentApi", () => ({
  persistOnboardingFirstTaskSent: persistMock,
  fetchOnboardingFirstTaskSent: vi.fn(),
}));

describe("syncOnboardingFirstTaskSentFlag", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    persistMock.mockClear();
  });

  it("writes local flag when DB says done (HOME-006)", () => {
    syncOnboardingFirstTaskSentFlag(true);

    expect(readOnboardingFirstTaskSent()).toBe(true);
    expect(persistMock).not.toHaveBeenCalled();
  });

  it("migrates local-only true flag to the API once (HOME-006)", () => {
    window.localStorage.setItem(
      "daily-magic.onboarding.first-task-sent.v1",
      "true",
    );

    syncOnboardingFirstTaskSentFlag(false);

    expect(persistMock).toHaveBeenCalledTimes(1);
  });

  it("does nothing when both local and DB are incomplete", () => {
    syncOnboardingFirstTaskSentFlag(false);

    expect(persistMock).not.toHaveBeenCalled();
    expect(readOnboardingFirstTaskSent()).toBe(false);
  });
});
