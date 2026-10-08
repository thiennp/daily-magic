import { describe, expect, it } from "vitest";

import { resolveTaskResultBlock } from "@/features/projects/tasks/utils/resolveTaskResultBlock";

describe("resolveTaskResultBlock", () => {
  it("truncates long failed output and flags it", () => {
    const r = resolveTaskResultBlock({
      status: "failed",
      resultOutput: "x".repeat(900),
    });
    expect(r?.preview).toHaveLength(600);
    expect(r?.truncated).toBe(true);
  });
  it("falls back when failed without output", () => {
    const r = resolveTaskResultBlock({ status: "failed", resultOutput: " " });
    expect(r?.body).toBe("No details were reported.");
  });
  it("covers denied, timed out and others", () => {
    expect(
      resolveTaskResultBlock({ status: "denied", denialReason: "no" })?.body,
    ).toBe("no");
    expect(resolveTaskResultBlock({ status: "timed_out" })?.body).toMatch(
      /Nothing ran/,
    );
    expect(resolveTaskResultBlock({ status: "done" })).toBeNull();
  });
  it("gives a known agy quota error one plain hint (9b3947bc)", () => {
    const r = resolveTaskResultBlock({
      status: "failed",
      resultOutput:
        "error: Individual quota reached. Resets in 44m20s.\nAGY_ERROR: {}",
    });
    expect(r?.hint).toBe("Antigravity quota reached; resets in 44m.");
    expect(r?.body).toContain("AGY_ERROR");
  });
});
