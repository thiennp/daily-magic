import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { confirmPromptSdlcCostBudget } from "../../../../adapters/promptSdlcAwcCore";
import { defaultPromptSdlcCostControls } from "../../../../adapters/promptSdlcAwcCore";
import {
  confirmPromptSdlcCostBudget,
  defaultPromptSdlcCostControls,
  estimatePromptSdlcSpendUsd,
  proposePromptSdlcCostBudget,
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  proposePromptSdlcCostBudget,
  seedPromptSdlcStep4CostProposal,
} from "../../../../adapters/promptSdlcAwcCore";
import { readPromptSdlcBudgetStop } from "../../../../adapters/promptSdlcAwcCore";
import { estimatePromptSdlcSpendUsd } from "../../../../adapters/promptSdlcAwcCore";

import { beginPromptSdlcWizardOptimizeModulesAfterSeparate } from "./beginPromptSdlcWizardOptimizeModulesAfterSeparate";
import { buildPromptSdlcAgentSnapshot } from "./buildPromptSdlcAgentSnapshot";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { derivePromptSdlcAgentOutcome } from "./derivePromptSdlcAgentOutcome";
import { describePromptSdlcOutcomeBadge } from "./describePromptSdlcOutcomeBadge";
import { PROMPT_SDLC_COST_COPY } from "./promptSdlcCostControl.constant";
import {
  readEarlyStopCheckboxFromPosted,
  readPromptSdlcCostControlKnobs,
} from "./readPromptSdlcCostControls";
import {
  renderPromptSdlcCostConfirmPanel,
  shouldShowPromptSdlcCostConfirm,
} from "./renderPromptSdlcCostConfirmPanel";
import { renderPromptSdlcCostControlFields } from "./renderPromptSdlcCostControlFields";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";

describe("prompt optimizer cost-control UI bind", () => {
  it("exposes copy + knob defaults aligned to API", () => {
    expect(PROMPT_SDLC_DEFAULT_MAX_TRIALS).toBe(1);
    expect(PROMPT_SDLC_COST_COPY.maxTrialsLabel).toBe("Max trials");
    expect(PROMPT_SDLC_COST_COPY.budgetExceededBadge).toBe("Budget exceeded");
    expect(defaultPromptSdlcCostControls()).toMatchObject({
      maxTrials: 1,
      earlyStop: true,
      budgetConfirmed: false,
      budgetExceeded: false,
      softWarnFired: false,
      targetTokenBudget: null,
    });
  });

  it("defaults earlyStop on unless intent=run omits the checkbox", () => {
    expect(
      readEarlyStopCheckboxFromPosted(
        new URLSearchParams({ intent: "choose-folder" }),
        "choose-folder",
      ),
    ).toBe(true);
    expect(
      readEarlyStopCheckboxFromPosted(
        new URLSearchParams({ intent: "run" }),
        "run",
      ),
    ).toBe(false);
    expect(
      readEarlyStopCheckboxFromPosted(
        new URLSearchParams({ intent: "run", earlyStop: "on" }),
        "run",
      ),
    ).toBe(true);
  });

  it("parses compose knobs including earlyStopFlatRounds", () => {
    expect(
      readPromptSdlcCostControlKnobs({
        maxTrials: "3",
        maxSpendUsd: "1.25",
        earlyStop: "on",
        earlyStopFlatRounds: "3",
      }),
    ).toEqual({
      ok: true,
      knobs: {
        maxTrials: 3,
        maxSpendUsd: 1.25,
        earlyStop: true,
        earlyStopFlatRounds: 3,
      },
    });
  });

  it("uses targetTokenBudget proposal (+ proposedTokenBudget alias in snapshot)", () => {
    const proposal = proposePromptSdlcCostBudget({
      moduleCount: 3,
      maxTrials: 1,
    });
    expect(proposal.stub).toBe(true);
    expect(proposal.targetTokenBudget).toBe(
      3 * PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
    );
    expect(proposal.estimatedSpendUsd).toBe(
      estimatePromptSdlcSpendUsd({
        tokens: proposal.targetTokenBudget,
        rateUsdPer1kTokens: proposal.rateUsdPer1kTokens ?? 0.01,
      }),
    );

    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "codex",
      improverModel: "codex",
      costControls: seedPromptSdlcStep4CostProposal({
        moduleCount: 2,
        existing: defaultPromptSdlcCostControls(),
      }),
    });
    const snap = buildPromptSdlcAgentSnapshot(cycle);
    expect(snap.costControls).toMatchObject({
      targetTokenBudget: 2 * PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
      proposedTokenBudget: 2 * PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
      confirmationRequired: true,
      budgetConfirmed: false,
      budgetExceeded: false,
    });
  });

  it("renders compose knobs + pre-Step4 confirm with wizard-continue fields", () => {
    const fields = renderPromptSdlcCostControlFields({
      maxTrials: "1",
      maxSpendUsd: "",
      earlyStop: true,
    });
    expect(fields).toContain('name="maxTrials"');
    expect(fields).toContain('name="maxSpendUsd"');
    expect(fields).toContain('name="earlyStop"');

    const withProposal = beginPromptSdlcWizardOptimizeModulesAfterSeparate(
      createPromptSdlcLocalCycle({
        goal: "Ship cost UI",
        sourcePrompt: "Do the thing",
        judgeModel: "codex",
        improverModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("Do the thing"),
          gate: "separate",
          phase: "separate",
        },
      }),
      {
        id: "split-1",
        title: "One module",
        summary: "Simple",
        recommended: true,
        topology: "parallel",
        modules: [{ id: "m1", title: "Module A", prompt: "Run A", order: 0 }],
      },
    );
    expect(shouldShowPromptSdlcCostConfirm(withProposal)).toBe(true);
    expect(withProposal.costControls?.targetTokenBudget).toBeGreaterThan(0);

    const panel = renderPromptSdlcCostConfirmPanel(withProposal);
    expect(panel).toContain('name="targetTokenBudget"');
    expect(panel).toContain('name="proposedTokenBudget"');
    expect(panel).toContain('name="confirmedTokenBudget"');
    expect(panel).toContain('name="confirmedMaxSpendUsd"');
    expect(panel).toContain('value="wizard-continue"');
    expect(panel).not.toContain("wizard-confirm-budget");

    const gateHtml = renderPromptSdlcWizardGate(withProposal, { active: true });
    expect(gateHtml).toContain("data-sdlc-cost-confirm");
  });

  it("maps budget_exceeded distinctly; useThisPrompt only on passed", () => {
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "budget_exceeded",
      }),
    ).toBe("budget_exceeded");
    const badge = describePromptSdlcOutcomeBadge({
      status: "failed",
      errorKind: "budget_exceeded",
    });
    expect(badge.badgeLabel).toBe(PROMPT_SDLC_COST_COPY.budgetExceededBadge);

    const base = createPromptSdlcLocalCycle({
      goal: "Cap spend",
      sourcePrompt: "x",
      judgeModel: "codex",
      improverModel: "codex",
    });
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "failed",
        errorMessage: PROMPT_SDLC_COST_COPY.budgetExceededMessage,
        errorKind: "budget_exceeded",
        costControls: {
          ...defaultPromptSdlcCostControls(),
          budgetConfirmed: true,
          budgetExceeded: true,
          confirmedTokenBudget: 100,
          confirmedMaxSpendUsd: 1,
        },
      }),
    ).toMatchObject({
      useThisPrompt: false,
      outcome: "budget_exceeded",
      errorKind: "budget_exceeded",
      costControls: { budgetExceeded: true },
    });
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "passed",
        errorMessage: null,
      }).useThisPrompt,
    ).toBe(true);
  });

  it("soft-warns then hard-stops; flat early-stop is not budget_exceeded", () => {
    const confirmed = confirmPromptSdlcCostBudget({
      existing: defaultPromptSdlcCostControls(),
      confirmedTokenBudget: 10_000,
      confirmedMaxSpendUsd: 1,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) {
      return;
    }
    expect(
      readPromptSdlcBudgetStop({
        costControls: confirmed.costControls,
        spentTokens: 8_500,
      }),
    ).toMatchObject({ kind: "soft_warn" });
    expect(
      readPromptSdlcBudgetStop({
        costControls: confirmed.costControls,
        spentTokens: 10_000,
      }),
    ).toMatchObject({
      kind: "hard_stop",
      errorKind: "budget_exceeded",
    });
    expect(
      derivePromptSdlcAgentOutcome({
        status: "stopped",
        errorKind: undefined,
      }),
    ).toBe("stopped");
  });
});
