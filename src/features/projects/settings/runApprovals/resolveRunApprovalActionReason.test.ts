import { describe, expect, it } from "vitest";

import { RUN_APPROVALS_COPY as C } from "@/features/projects/settings/runApprovals/runApprovalsCopy.constant";
import { resolveRunApprovalActionReason } from "@/features/projects/settings/runApprovals/resolveRunApprovalActionReason";

describe("resolveRunApprovalActionReason", () => {
  it("shows working on the busy row only", () => {
    expect(
      resolveRunApprovalActionReason({
        busyRunId: "r1",
        actionError: null,
        actionErrorRunId: null,
        forRunId: "r1",
      }),
    ).toBe(C.working);
    expect(
      resolveRunApprovalActionReason({
        busyRunId: "r1",
        actionError: null,
        actionErrorRunId: null,
        forRunId: "r2",
      }),
    ).toBeNull();
  });

  it("scopes ended/forbidden/error to the failing row", () => {
    expect(
      resolveRunApprovalActionReason({
        busyRunId: null,
        actionError: "ended",
        actionErrorRunId: "r1",
        forRunId: "r1",
      }),
    ).toBe(C.endedReason);
    expect(
      resolveRunApprovalActionReason({
        busyRunId: null,
        actionError: "ended",
        actionErrorRunId: "r1",
        forRunId: "r2",
      }),
    ).toBeNull();
    expect(
      resolveRunApprovalActionReason({
        busyRunId: null,
        actionError: "forbidden",
        actionErrorRunId: "r1",
        forRunId: "r1",
      }),
    ).toBe(C.forbiddenReason);
  });
});
