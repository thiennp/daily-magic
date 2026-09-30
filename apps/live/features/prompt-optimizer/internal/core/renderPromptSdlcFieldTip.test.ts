import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_FIELD_TIPS } from "./promptSdlcFieldTips.constant";
import { renderPromptSdlcFieldTip } from "./renderPromptSdlcFieldTip";

describe("renderPromptSdlcFieldTip", () => {
  it("shows a best practice and an example for the judge", () => {
    const html = renderPromptSdlcFieldTip("judgeInstructions");

    expect(html).toContain('class="sdlc-tip"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('role="tooltip"');
    expect(html).toContain("Best practice");
    expect(html).toContain("Example");
    expect(html).toContain(
      "If the prompt needs an input, put that input here.",
    );
    expect(html).toContain("does not score the prompt wording");
    expect(html).toContain("Input: Where is my refund?");
    expect(html).toContain(
      'aria-label="How to use Instructions for the judge"',
    );
  });

  it("has a tip for every composer field", () => {
    const ids = Object.keys(PROMPT_SDLC_FIELD_TIPS);
    expect(ids).toEqual([
      "goal",
      "prompt",
      "folder",
      "skill",
      "judge",
      "judgeInstructions",
      "improver",
      "improverInstructions",
      "passScore",
      "modulePassScore",
      "roundLimit",
      "runner",
      "runnerInstructions",
    ]);
  });
});
