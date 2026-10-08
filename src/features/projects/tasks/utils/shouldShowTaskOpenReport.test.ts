import { describe, expect, it } from "vitest";

import { shouldShowTaskOpenReport } from "@/features/projects/tasks/utils/shouldShowTaskOpenReport";

describe("shouldShowTaskOpenReport (7bd7b9ae)", () => {
  it("shows Open report for Done, Failed, Stopped and Timed out", () => {
    expect(shouldShowTaskOpenReport("done")).toBe(true);
    expect(shouldShowTaskOpenReport("stopped")).toBe(true);
    expect(shouldShowTaskOpenReport("failed")).toBe(true);
    expect(shouldShowTaskOpenReport("timed_out")).toBe(true);
  });

  it("hides it while the run is still going", () => {
    expect(shouldShowTaskOpenReport("running")).toBe(false);
    expect(shouldShowTaskOpenReport("queued")).toBe(false);
  });
});
