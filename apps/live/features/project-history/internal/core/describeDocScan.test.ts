import { describe, expect, it } from "vitest";

import { describeDocScan } from "./scanProjectDocsForAutoSkills";

const result = (over: Partial<Parameters<typeof describeDocScan>[0]> = {}) => ({
  outcome: "done" as const,
  scanned: 60,
  eligible: 25,
  asked: 3,
  skipped: {},
  ...over,
});

describe("describeDocScan", () => {
  it("says how many docs were read and questions raised, and that more wait", () => {
    expect(describeDocScan(result(), 0)).toBe(
      "Docs scan: read 60 docs, raised 3 questions, 22 more eligible once you answer these.",
    );
  });

  it("is singular and mentions changed sources", () => {
    expect(
      describeDocScan(result({ scanned: 1, eligible: 1, asked: 1 }), 1),
    ).toBe(
      "Docs scan: read 1 doc, raised 1 question; 1 doc-made skill has a changed source.",
    );
  });
});
