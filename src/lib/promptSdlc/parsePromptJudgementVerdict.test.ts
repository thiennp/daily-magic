import { describe, expect, it } from "vitest";

import { parsePromptJudgementVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";

describe("parsePromptJudgementVerdict", () => {
  it("reads the last verdict, including one wrapped in prose", () => {
    expect(
      parsePromptJudgementVerdict(
        'note {"score": 10, "passed": false, "reasons": "vague"} then {"score": 81, "passed": true, "reasons": "clear {goal}"}',
      ),
    ).toEqual({
      score: 81,
      passed: true,
      reasons: "clear {goal}",
    });
  });

  it("rejects scores that are missing, out of range, or not a whole number", () => {
    expect(parsePromptJudgementVerdict("no json")).toBeNull();
    expect(
      parsePromptJudgementVerdict(
        '{"score": 80.5, "passed": true, "reasons": "close"}',
      ),
    ).toBeNull();
    expect(
      parsePromptJudgementVerdict(
        '{"score": 101, "passed": true, "reasons": "too high"}',
      ),
    ).toBeNull();
    expect(
      parsePromptJudgementVerdict(
        '{"score": 80, "passed": "yes", "reasons": "x"}',
      ),
    ).toBeNull();
    expect(
      parsePromptJudgementVerdict(
        '{"score": 80, "passed": true, "reasons": "  "}',
      ),
    ).toBeNull();
    expect(parsePromptJudgementVerdict('{"score": "80"}')).toBeNull();
  });
});
