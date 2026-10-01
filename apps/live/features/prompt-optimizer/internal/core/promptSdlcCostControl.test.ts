import {
  confirmPromptSdlcCostBudget,
  createInitialPromptSdlcWizardState,
  defaultPromptSdlcCostControls,
  estimatePromptSdlcSpendUsd,
  proposePromptSdlcCostBudget,
  proposePromptSdlcRunCostBudget,
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
  resolvePromptSdlcWriterRateUsdPer1k,
  seedPromptSdlcStep4CostProposal,
  readPromptSdlcBudgetStop,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  autoConfirmPromptSdlcCostFromMaxSpend,
  isPromptSdlcEstimateOverMaxSpend,
} from "./autoConfirmPromptSdlcCostFromMaxSpend";
import { describe, expect, it } from "vitest";

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
      writerId: "codex",
    });
    expect(fields).toContain('name="maxTrials"');
    expect(fields).toContain('name="maxSpendUsd"');
    expect(fields).toContain('name="earlyStop"');
    expect(fields).toContain("data-sdlc-estimated-spend");
    expect(fields).toContain("data-sdlc-target-tokens");
    expect(fields).toContain("data-sdlc-writer-rate-chip");
    expect(fields).toContain("data-sdlc-cost-estimate");
    const codexRate = resolvePromptSdlcWriterRateUsdPer1k("codex");
    expect(fields).toContain(`$${codexRate.toFixed(4)}`);

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

  it("binds compose live run-cost PREDICTION for codex rate", () => {
    const proposal = proposePromptSdlcRunCostBudget({
      maxRounds: 5,
      maxTrials: 1,
      writerId: "codex",
    });
    const fields = renderPromptSdlcCostControlFields({
      maxTrials: "1",
      maxSpendUsd: "",
      earlyStop: true,
      writerId: "codex",
      maxRounds: 5,
    });
    expect(fields).toContain(`data-sdlc-estimated-spend>$${proposal.estimatedSpendUsd.toFixed(4)}`);
    expect(fields).toContain(String(proposal.targetTokenBudget));
  });

  it("auto-confirms from maxSpendUsd and warns when estimate exceeds ceiling", () => {
    const seeded = seedPromptSdlcStep4CostProposal({
      moduleCount: 2,
      existing: defaultPromptSdlcCostControls({
        maxTrials: 1,
        maxSpendUsd: 0.01,
        earlyStop: true,
        earlyStopFlatRounds: 3,
      }),
      writerId: "codex",
    });
    expect(seeded.budgetConfirmed).toBe(false);
    expect(
      isPromptSdlcEstimateOverMaxSpend({
        estimatedSpendUsd: seeded.estimatedSpendUsd,
        maxSpendUsd: 0.01,
      }),
    ).toBe(true);
    const auto = autoConfirmPromptSdlcCostFromMaxSpend(seeded);
    expect(auto.budgetConfirmed).toBe(true);
    expect(auto.confirmedMaxSpendUsd).toBe(0.01);
    expect(auto.confirmedTokenBudget).toBe(seeded.targetTokenBudget);

    const noCeiling = autoConfirmPromptSdlcCostFromMaxSpend(
      seedPromptSdlcStep4CostProposal({ moduleCount: 2, writerId: "codex" }),
    );
    expect(noCeiling.budgetConfirmed).toBe(false);
  });

  it("skips Step4 confirm panel when maxSpendUsd auto-confirms", () => {
    const option = {
      id: "opt-1",
      title: "Two modules",
      summary: "Parallel",
      recommended: true,
      topology: "parallel" as const,
      modules: [
        { id: "m1", title: "A", prompt: "do A", order: 0 },
        { id: "m2", title: "B", prompt: "do B", order: 1 },
      ],
    };
    const cycle = beginPromptSdlcWizardOptimizeModulesAfterSeparate(
      createPromptSdlcLocalCycle({
        goal: "Auto confirm",
        sourcePrompt: "x",
        judgeModel: "codex",
        improverModel: "codex",
        costControls: defaultPromptSdlcCostControls({
          maxTrials: 1,
          maxSpendUsd: 5,
          earlyStop: true,
          earlyStopFlatRounds: 3,
        }),
        wizard: {
          ...createInitialPromptSdlcWizardState("x"),
          gate: "separate",
          phase: "separate",
        },
      }),
      option,
    );
    expect(cycle.costControls?.budgetConfirmed).toBe(true);
    expect(cycle.costControls?.confirmedMaxSpendUsd).toBe(5);
    expect(shouldShowPromptSdlcCostConfirm(cycle)).toBe(false);
  });

});
