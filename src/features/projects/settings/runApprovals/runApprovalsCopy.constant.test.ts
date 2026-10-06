import { describe, expect, it } from "vitest";

import { RUN_APPROVALS_COPY as C } from "@/features/projects/settings/runApprovals/runApprovalsCopy.constant";

describe("RUN_APPROVALS_COPY", () => {
  it("has no jargon and says assistant-friendly plain English", () => {
    for (const value of Object.values(C)) {
      expect(value).not.toMatch(/agent|dispatch|machine|bot\b/i);
    }
    expect(C.empty).toBe("No tasks waiting for approval.");
    expect(C.heading).toBe("Waiting for your approval");
  });
});
