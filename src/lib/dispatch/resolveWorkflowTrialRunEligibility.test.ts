import { describe, expect, it } from "vitest";

import {
  resolveWorkflowTrialRunEligibility,
  WorkflowTrialRunBlockReason,
} from "@/lib/dispatch/resolveWorkflowTrialRunEligibility";

describe("resolveWorkflowTrialRunEligibility", () => {
  it("blocks guests who are not signed in", () => {
    expect(
      resolveWorkflowTrialRunEligibility({
        isSignedIn: false,
        hasDispatchReadyMac: false,
        hasCursorCloudConnection: false,
      }),
    ).toEqual({
      allowed: false,
      reason: WorkflowTrialRunBlockReason.SIGN_IN_REQUIRED,
    });
  });

  it("blocks signed-in users without a Mac or Cursor Cloud API key", () => {
    expect(
      resolveWorkflowTrialRunEligibility({
        isSignedIn: true,
        hasDispatchReadyMac: false,
        hasCursorCloudConnection: false,
      }),
    ).toEqual({
      allowed: false,
      reason: WorkflowTrialRunBlockReason.EXECUTOR_REQUIRED,
    });
  });

  it("allows signed-in users with a dispatch-ready Mac", () => {
    expect(
      resolveWorkflowTrialRunEligibility({
        isSignedIn: true,
        hasDispatchReadyMac: true,
        hasCursorCloudConnection: false,
      }).allowed,
    ).toBe(true);
  });

  it("allows signed-in users with Cursor Cloud connected", () => {
    expect(
      resolveWorkflowTrialRunEligibility({
        isSignedIn: true,
        hasDispatchReadyMac: false,
        hasCursorCloudConnection: true,
      }).allowed,
    ).toBe(true);
  });
});
