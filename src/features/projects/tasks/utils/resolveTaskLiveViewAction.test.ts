import { describe, expect, it } from "vitest";

import { resolveTaskLiveViewAction } from "@/features/projects/tasks/utils/resolveTaskLiveViewAction";

describe("resolveTaskLiveViewAction (afae8216)", () => {
  it("re-opens a running task's live view", () => {
    expect(
      resolveTaskLiveViewAction({ status: "running", agentRunId: "run-1" }),
    ).toEqual({ runId: "run-1", label: "Open live view" });
  });

  it("keeps Retry reachable for failed and timed-out tasks", () => {
    for (const status of ["failed", "timed_out"] as const) {
      expect(
        resolveTaskLiveViewAction({ status, agentRunId: "run-1" }),
      ).toEqual({ runId: "run-1", label: "Retry" });
    }
  });

  it("shows nothing for done tasks or tasks without a run", () => {
    expect(
      resolveTaskLiveViewAction({ status: "done", agentRunId: "run-1" }),
    ).toBeNull();
    expect(
      resolveTaskLiveViewAction({ status: "running", agentRunId: null }),
    ).toBeNull();
  });
});
