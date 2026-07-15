import { describe, expect, it, beforeEach, vi } from "vitest";

import {
  markOnboardingFirstTaskSent,
  readOnboardingFirstTaskSent,
  writeOnboardingFirstTaskSentLocal,
} from "@/features/home/utils/onboardingFirstTaskSentStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const persistMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/home/utils/onboardingFirstTaskSentApi", () => ({
  persistOnboardingFirstTaskSent: persistMock,
}));

describe("onboardingFirstTaskSentStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    persistMock.mockClear();
  });

  it("persists first-task-sent across reads", () => {
    expect(readOnboardingFirstTaskSent()).toBe(false);

    markOnboardingFirstTaskSent();

    expect(readOnboardingFirstTaskSent()).toBe(true);
    expect(persistMock).toHaveBeenCalledTimes(1);
  });

  it("writes local flag without posting when syncing from DB", () => {
    writeOnboardingFirstTaskSentLocal();

    expect(readOnboardingFirstTaskSent()).toBe(true);
    expect(persistMock).not.toHaveBeenCalled();
  });
});
