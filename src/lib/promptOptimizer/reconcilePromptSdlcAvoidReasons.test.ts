import { describe, expect, it } from "vitest";

import { choosePromptSdlcImproverReference } from "@/lib/promptOptimizer/choosePromptSdlcImproverReference";
import { formatPromptSdlcAvoidList } from "@/lib/promptOptimizer/reconcilePromptSdlcAvoidReasons";

describe("reconcilePromptSdlcAvoidReasons", () => {
  it("keeps lower-score reasons and drops repeated prompt text", () => {
    const reference = choosePromptSdlcImproverReference({
      current: {
        roundNumber: 2,
        promptText: "Name the screen and the stop.",
        score: 84,
        reasons: "Names the screen.",
      },
      priorRounds: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          score: 22,
          reasons: "Too vague.",
        },
        {
          roundNumber: 1,
          promptText: "Be helpful and careful.",
          score: 0,
          reasons: "Too vague.\nIt left the ticket.",
        },
      ],
    });

    expect(reference.promptText).toBe("Name the screen and the stop.");
    expect(reference.score).toBe(84);
    expect(reference.avoid).toBe("- Too vague.\n- It left the ticket.");
    expect(reference.avoid).not.toContain("Be helpful");
    expect(formatPromptSdlcAvoidList(["Too vague.", "too vague.", ""])).toBe(
      "- Too vague.",
    );
  });
});
