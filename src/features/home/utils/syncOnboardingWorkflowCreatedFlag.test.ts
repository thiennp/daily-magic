import { beforeEach, describe, expect, it } from "vitest";

import {
  readOnboardingWorkflowCreated,
  writeOnboardingWorkflowCreatedLocal,
} from "@/features/home/utils/onboardingWorkflowCreatedStore";
import syncOnboardingWorkflowCreatedFlag from "@/features/home/utils/syncOnboardingWorkflowCreatedFlag";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("syncOnboardingWorkflowCreatedFlag", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("writes local flag when DB says done (HOME-011)", () => {
    syncOnboardingWorkflowCreatedFlag(true);

    expect(readOnboardingWorkflowCreated()).toBe(true);
  });

  it("clears stale local flag when DB says incomplete", () => {
    writeOnboardingWorkflowCreatedLocal();

    syncOnboardingWorkflowCreatedFlag(false);

    expect(readOnboardingWorkflowCreated()).toBe(false);
  });
});
