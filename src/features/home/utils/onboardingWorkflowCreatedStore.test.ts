import { beforeEach, describe, expect, it, vi } from "vitest";

import { ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT } from "@/features/home/utils/onboardingWorkflowCreatedEvents";
import {
  markOnboardingWorkflowCreated,
  readOnboardingWorkflowCreated,
  writeOnboardingWorkflowCreatedLocal,
} from "@/features/home/utils/onboardingWorkflowCreatedStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("onboardingWorkflowCreatedStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("persists workflow-created across reads", () => {
    expect(readOnboardingWorkflowCreated()).toBe(false);

    markOnboardingWorkflowCreated();

    expect(readOnboardingWorkflowCreated()).toBe(true);
  });

  it("dispatches update event when local flag is written", () => {
    const listener = vi.fn();
    window.addEventListener(
      ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT,
      listener,
    );

    writeOnboardingWorkflowCreatedLocal();

    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(
      ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT,
      listener,
    );
  });
});
