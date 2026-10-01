import {
  confirmPromptSdlcCostBudget,
  defaultPromptSdlcCostControls,
  seedPromptSdlcStep4CostProposal,
} from "../../../../adapters/promptSdlcAwcCore";
import { describe, expect, it } from "vitest";

import { applyPromptSdlcBudgetGuard } from "./applyPromptSdlcBudgetGuard";
import { buildPromptSdlcAgentSnapshot } from "./buildPromptSdlcAgentSnapshot";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { derivePromptSdlcAgentOutcome } from "./derivePromptSdlcAgentOutcome";

describe("cost control honesty (budget_exceeded → useThisPrompt false)", () => {
  it("maps budget_exceeded outcome and keeps useThisPrompt false", () => {
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "budget_exceeded",
      }),
    ).toBe("budget_exceeded");

    const base = createPromptSdlcLocalCycle({
      goal: "Stay under budget",
      sourcePrompt: "Use the harness",
      judgeModel: "codex",
      improverModel: "codex",
    });
    const snap = buildPromptSdlcAgentSnapshot({
      ...base,
      status: "failed",
      errorMessage: "budget",
      errorKind: "budget_exceeded",
    });
    expect(snap).toMatchObject({
      useThisPrompt: false,
      outcome: "budget_exceeded",
      errorKind: "budget_exceeded",
    });
  });

  it("exposes proposal + confirmation state on the agent snapshot", () => {
    const proposed = seedPromptSdlcStep4CostProposal({ moduleCount: 2 });
    const cycle = createPromptSdlcLocalCycle({
      goal: "Ship modules",
      sourcePrompt: "Split work",
      judgeModel: "codex",
      improverModel: "codex",
      costControls: proposed,
    });
    const before = buildPromptSdlcAgentSnapshot(cycle);
    expect(before.costControls).toMatchObject({
      targetTokenBudget: proposed.targetTokenBudget,
      proposedTokenBudget: proposed.targetTokenBudget,
      estimatedSpendUsd: proposed.estimatedSpendUsd,
      budgetConfirmed: false,
      confirmationRequired: true,
    });

    const confirmed = confirmPromptSdlcCostBudget({
      existing: proposed,
      confirmedTokenBudget: proposed.targetTokenBudget!,
      confirmedMaxSpendUsd: proposed.estimatedSpendUsd,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) {
      return;
    }
    const after = buildPromptSdlcAgentSnapshot({
      ...cycle,
      costControls: confirmed.costControls,
    });
    expect(after.costControls).toMatchObject({
      budgetConfirmed: true,
      confirmationRequired: false,
      confirmedTokenBudget: proposed.targetTokenBudget,
      confirmedMaxSpendUsd: proposed.estimatedSpendUsd,
    });
  });

  it("hard-stops the cycle with budget_exceeded when ceiling is hit", () => {
    const confirmed = confirmPromptSdlcCostBudget({
      existing: defaultPromptSdlcCostControls(),
      confirmedTokenBudget: 100,
      confirmedMaxSpendUsd: 10,
      rateUsdPer1kTokens: 0.01,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) {
      return;
    }
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Cap spend",
        sourcePrompt: "Be brief",
        judgeModel: "codex" as const,
        improverModel: "codex" as const,
        costControls: confirmed.costControls,
      }),
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be brief",
          judgement: {
            score: 40,
            passed: false,
            reasons: "Thin",
            rawReply: "{}",
            tokens: 120,
          },
        },
      ],
    };
    const next = applyPromptSdlcBudgetGuard(cycle);
    expect(next.status).toBe("failed");
    expect(next.errorKind).toBe("budget_exceeded");
    expect(next.costControls?.budgetExceeded).toBe(true);
    expect(buildPromptSdlcAgentSnapshot(next).useThisPrompt).toBe(false);
  });
});
