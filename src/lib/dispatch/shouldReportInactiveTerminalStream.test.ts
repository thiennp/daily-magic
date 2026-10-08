import { afterEach, describe, expect, it } from "vitest";

import {
  clearInactiveTerminalStreamReportsForTests,
  shouldReportInactiveTerminalStream,
} from "@/lib/dispatch/shouldReportInactiveTerminalStream";

/** a6053d1c: 160 identical system.errors in 9 s for one run. */
describe("shouldReportInactiveTerminalStream", () => {
  afterEach(() => {
    clearInactiveTerminalStreamReportsForTests();
  });

  it("reports once per run per minute", () => {
    expect(shouldReportInactiveTerminalStream("run-1", 1_000)).toBe(true);
    expect(shouldReportInactiveTerminalStream("run-1", 2_000)).toBe(false);
    expect(shouldReportInactiveTerminalStream("run-2", 2_000)).toBe(true);
    expect(shouldReportInactiveTerminalStream("run-1", 61_001)).toBe(true);
  });
});
