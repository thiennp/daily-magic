import { describe, expect, it } from "vitest";

import {
  clampScanCommits,
  DEFAULT_SCAN_COMMITS,
  MAX_SCAN_COMMITS,
  parseMainBranchCommits,
} from "./readMainBranchCommits";

describe("clampScanCommits", () => {
  it("defaults to 100 for anything that is not a positive number", () => {
    expect(clampScanCommits(undefined)).toBe(DEFAULT_SCAN_COMMITS);
    expect(clampScanCommits("500")).toBe(DEFAULT_SCAN_COMMITS);
    expect(clampScanCommits(0)).toBe(DEFAULT_SCAN_COMMITS);
    expect(clampScanCommits(Number.NaN)).toBe(DEFAULT_SCAN_COMMITS);
  });

  it("floors and caps a requested count", () => {
    expect(clampScanCommits(250.9)).toBe(250);
    expect(clampScanCommits(1_000_000)).toBe(MAX_SCAN_COMMITS);
  });
});

describe("parseMainBranchCommits", () => {
  it("reads sha, date, subject and body, newest first as given", () => {
    const raw =
      "a1\u001f2026-10-09T10:00:00+02:00\u001ffix: one\u001fbody one\u001e\n" +
      "b2\u001f2026-10-08T10:00:00+02:00\u001ffeat: two\u001f\u001e\n";
    expect(parseMainBranchCommits(raw)).toEqual([
      {
        sha: "a1",
        committedAt: "2026-10-09T10:00:00+02:00",
        subject: "fix: one",
        body: "body one",
      },
      {
        sha: "b2",
        committedAt: "2026-10-08T10:00:00+02:00",
        subject: "feat: two",
        body: "",
      },
    ]);
  });

  it("drops entries without a subject", () => {
    expect(parseMainBranchCommits("c3\u001f2026\u001f\u001f\u001e")).toEqual(
      [],
    );
  });
});

describe("describeScan", () => {
  it("names the commits and branch next to the tasks", async () => {
    const { describeScan } = await import("./scanProjectTasksForAutoSkills");
    expect(
      describeScan(
        { scanned: 3, commitsScanned: 100, asked: 2, outcomes: {} },
        "main",
      ),
    ).toBe(
      "Scanned 3 finished tasks and the last 100 commits on main on this computer · 2 questions raised.",
    );
    expect(
      describeScan(
        { scanned: 0, commitsScanned: 1, asked: 0, outcomes: {} },
        "main",
      ),
    ).toContain("the last 1 commit on main");
  });
});
