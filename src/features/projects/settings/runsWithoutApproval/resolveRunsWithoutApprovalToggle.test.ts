import { describe, expect, it } from "vitest";

import { resolveRunsWithoutApprovalToggle } from "@/features/projects/settings/runsWithoutApproval/resolveRunsWithoutApprovalToggle";

describe("resolveRunsWithoutApprovalToggle (S0-2)", () => {
  it("asks before turning on", () => {
    expect(
      resolveRunsWithoutApprovalToggle({ enabled: false, busy: false }),
    ).toEqual({ kind: "confirm" });
  });

  it("turns off with no confirm", () => {
    expect(
      resolveRunsWithoutApprovalToggle({ enabled: true, busy: false }),
    ).toEqual({ kind: "save", value: false });
  });

  it("does nothing while busy", () => {
    expect(
      resolveRunsWithoutApprovalToggle({ enabled: true, busy: true }),
    ).toEqual({ kind: "none" });
  });
});
