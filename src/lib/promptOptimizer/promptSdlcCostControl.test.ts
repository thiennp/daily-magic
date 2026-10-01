import { describe, expect, it } from "vitest";

import { confirmPromptSdlcCostBudget } from "@/lib/promptOptimizer/confirmPromptSdlcCostBudget";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import {
  PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import {
  proposePromptSdlcCostBudget,
  seedPromptSdlcStep4CostProposal,
} from "@/lib/promptOptimizer/proposePromptSdlcCostBudget";
import { readPromptSdlcBudgetStop } from "@/lib/promptOptimizer/readPromptSdlcBudgetStop";
import { readPromptSdlcRewriteStop } from "@/lib/promptOptimizer/readPromptSdlcRewriteStop";
import { resolvePromptSdlcMaxTrials } from "@/lib/promptOptimizer/resolvePromptSdlcMaxTrials";

describe("Prompt Optimizer cost controls", () => {
  it("proposes targetTokenBudget + estimatedSpendUsd from module × trials", () => {
    const proposal = proposePromptSdlcCostBudget({
      moduleCount: 2,
      maxTrials: 1,
      rateUsdPer1kTokens: 0.01,
    });
    expect(proposal.targetTokenBudget).toBe(
      2 * PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
    );
    expect(proposal.estimatedSpendUsd).toBe(
      estimatePromptSdlcSpendUsd({
        tokens: proposal.targetTokenBudget,
        rateUsdPer1kTokens: 0.01,
      }),
    );
    expect(proposal.stub).toBe(true);
  });

  it("maxTrials resolves the effective trial hard cap", () => {
    expect(
      resolvePromptSdlcMaxTrials({
        maxRounds: 10,
        costControls: defaultPromptSdlcCostControls({ maxTrials: 3 }),
      }),
    ).toBe(3);
    expect(
      resolvePromptSdlcMaxTrials({
        maxRounds: 2,
        costControls: defaultPromptSdlcCostControls({ maxTrials: 5 }),
      }),
    ).toBe(2);
  });

  it("confirm persists confirmedTokenBudget / confirmedMaxSpendUsd ceilings", () => {
    const seeded = seedPromptSdlcStep4CostProposal({ moduleCount: 1 });
    const confirmed = confirmPromptSdlcCostBudget({
      existing: seeded,
      confirmedTokenBudget: 12_000,
      confirmedMaxSpendUsd: 0.15,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) {
      return;
    }
    expect(confirmed.costControls.budgetConfirmed).toBe(true);
    expect(confirmed.costControls.confirmedTokenBudget).toBe(12_000);
    expect(confirmed.costControls.confirmedMaxSpendUsd).toBe(0.15);
    expect(confirmed.costControls.targetTokenBudget).toBe(
      seeded.targetTokenBudget,
    );
  });

  it("soft-warns then hard-stops with budget_exceeded", () => {
    const confirmed = confirmPromptSdlcCostBudget({
      existing: defaultPromptSdlcCostControls({ maxTrials: 2 }),
      confirmedTokenBudget: 10_000,
      confirmedMaxSpendUsd: 1,
      rateUsdPer1kTokens: 0.01,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) {
      return;
    }
    const soft = readPromptSdlcBudgetStop({
      costControls: confirmed.costControls,
      spentTokens: 8_500,
    });
    expect(soft?.kind).toBe("soft_warn");

    const hard = readPromptSdlcBudgetStop({
      costControls:
        soft?.kind === "soft_warn"
          ? soft.costControls
          : confirmed.costControls,
      spentTokens: 10_000,
    });
    expect(hard).toEqual({
      kind: "hard_stop",
      errorMessage: PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
      errorKind: "budget_exceeded",
      costControls: expect.objectContaining({
        budgetExceeded: true,
      }),
    });
  });

  it("early-stop when scores are flat uses earlyStopFlatRounds", () => {
    const stop = readPromptSdlcRewriteStop({
      scores: [80, 80, 79],
      reasons: ["a", "b", "c"],
      round: 2,
      maxRounds: 10,
      earlyStopFlat: 2,
    });
    expect(stop?.type).toBe("stopped");
    expect(stop?.errorMessage).toMatch(/score stopped rising/i);
  });
});
