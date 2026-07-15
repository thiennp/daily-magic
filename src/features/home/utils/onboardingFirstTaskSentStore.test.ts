import { describe, expect, it, beforeEach } from "vitest";

import {
  markOnboardingFirstTaskSent,
  readOnboardingFirstTaskSent,
} from "@/features/home/utils/onboardingFirstTaskSentStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("onboardingFirstTaskSentStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("persists first-task-sent across reads", () => {
    expect(readOnboardingFirstTaskSent()).toBe(false);

    markOnboardingFirstTaskSent();

    expect(readOnboardingFirstTaskSent()).toBe(true);
  });
});
