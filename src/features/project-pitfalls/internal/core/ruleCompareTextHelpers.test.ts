import { describe, expect, it } from "vitest";

import { jaccardTokenSetScore } from "@/features/project-pitfalls/internal/core/jaccardTokenSetScore";
import { normalizeRuleCompareText } from "@/features/project-pitfalls/internal/core/normalizeRuleCompareText";
import { parseRuleUsageDays } from "@/features/project-pitfalls/internal/core/parseRuleUsageDays";
import { tokenizeRuleCompareText } from "@/features/project-pitfalls/internal/core/tokenizeRuleCompareText";

describe("normalizeRuleCompareText", () => {
  it("lowercases, strips punctuation, collapses spaces", () => {
    expect(normalizeRuleCompareText("  Hello, WORLD!!  ")).toBe("hello world");
  });
});

describe("jaccardTokenSetScore", () => {
  it("scores identical sets as 1 and empty as 0", () => {
    const tokens = tokenizeRuleCompareText("alpha beta");
    expect(jaccardTokenSetScore(tokens, tokens)).toBe(1);
    expect(jaccardTokenSetScore(new Set(), new Set())).toBe(0);
  });
});

describe("parseRuleUsageDays", () => {
  it("defaults to 30 and rejects outside 1..90", () => {
    expect(parseRuleUsageDays(null)).toEqual({ ok: true, days: 30 });
    expect(parseRuleUsageDays("7")).toEqual({ ok: true, days: 7 });
    expect(parseRuleUsageDays("0")).toEqual({
      ok: false,
      code: "invalid_arguments",
      field: "days",
    });
    expect(parseRuleUsageDays("91")).toMatchObject({ ok: false });
    expect(parseRuleUsageDays("1.5")).toMatchObject({ ok: false });
  });
});
