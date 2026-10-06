import { describe, expect, it } from "vitest";

import { RUNS_WITHOUT_APPROVAL_COPY as C } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApprovalCopy.constant";
import { resolveRunsWithoutApprovalDisabledReason } from "@/features/projects/settings/runsWithoutApproval/resolveRunsWithoutApprovalDisabledReason";

const base = {
  loadState: "ready" as const,
  enabled: false,
  saving: false,
  saveFailed: false,
};

describe("resolveRunsWithoutApprovalDisabledReason (S0-2)", () => {
  it("has no reason when the switch can be used", () => {
    expect(resolveRunsWithoutApprovalDisabledReason(base)).toBeNull();
  });

  it("names loading, load error and saving", () => {
    expect(
      resolveRunsWithoutApprovalDisabledReason({ ...base, loadState: "loading" }),
    ).toBe(C.loading);
    expect(
      resolveRunsWithoutApprovalDisabledReason({ ...base, loadState: "error" }),
    ).toBe(C.loadError);
    expect(
      resolveRunsWithoutApprovalDisabledReason({ ...base, saving: true }),
    ).toBe(C.saving);
  });
});
