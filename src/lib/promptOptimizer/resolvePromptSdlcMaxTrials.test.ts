import { describe, expect, it } from "vitest";

import { confirmPromptSdlcCostBudget } from "@/lib/promptOptimizer/confirmPromptSdlcCostBudget";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
import { resolvePromptSdlcMaxTrials } from "@/lib/promptOptimizer/resolvePromptSdlcMaxTrials";

describe("resolvePromptSdlcMaxTrials", () => {
  it("ignores maxTrials until Step 4 budget is confirmed", () => {
    expect(
      resolvePromptSdlcMaxTrials({
        maxRounds: 10,
        costControls: defaultPromptSdlcCostControls({ maxTrials: 3 }),
      }),
    ).toBe(10);
    const confirmed = confirmPromptSdlcCostBudget({
      existing: defaultPromptSdlcCostControls({ maxTrials: 3 }),
      confirmedTokenBudget: 5_000,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) {
      return;
    }
    expect(
      resolvePromptSdlcMaxTrials({
        maxRounds: 10,
        costControls: confirmed.costControls,
      }),
    ).toBe(3);
    expect(
      resolvePromptSdlcMaxTrials({
        maxRounds: 2,
        costControls: {
          ...confirmed.costControls,
          maxTrials: 5,
        },
      }),
    ).toBe(2);
  });
});
