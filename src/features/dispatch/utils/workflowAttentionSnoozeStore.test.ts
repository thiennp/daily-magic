import { describe, expect, it } from "vitest";

import {
  clearWorkflowAttentionSnoozeForRun,
  getWorkflowAttentionSnoozeSnapshot,
  snoozeWorkflowHumanAttention,
} from "@/features/dispatch/utils/workflowAttentionSnoozeStore";

describe("workflowAttentionSnoozeStore", () => {
  it("clears snoozed human attention for a workflow run", () => {
    snoozeWorkflowHumanAttention({
      workflowRunId: "run-a",
      stepRunId: "step-1",
      stepIndex: 2,
      title: "Review",
      instructions: "Reply when ready.",
    });

    clearWorkflowAttentionSnoozeForRun("run-a");

    expect(getWorkflowAttentionSnoozeSnapshot().human).toBeNull();
  });
});
