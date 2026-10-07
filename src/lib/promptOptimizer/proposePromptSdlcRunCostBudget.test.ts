import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_PREVIEW_STEP4_MODULE_COUNT } from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import {
  resolvePromptSdlcEarlyTokensPerRound,
  resolvePromptSdlcStep4TokensPerModuleTrial,
} from "@/lib/promptOptimizer/resolvePromptSdlcWriterTokensPerCall";
import {
  proposePromptSdlcRunCostBudget,
  seedPromptSdlcRunCostProposal,
} from "@/lib/promptOptimizer/proposePromptSdlcRunCostBudget";
import { resolvePromptSdlcWriterRateUsdPer1k } from "@/lib/promptOptimizer/resolvePromptSdlcWriterRateUsdPer1k";
import { PROMPT_SDLC_WIZARD_MAX_ROUNDS } from "@/lib/promptOptimizer/wizard/promptSdlcWizardLimits.constant";

describe("proposePromptSdlcRunCostBudget", () => {
  it("covers early rounds + preview Step4", () => {
    const proposal = proposePromptSdlcRunCostBudget({
      maxRounds: 3,
      maxTrials: 1,
      writerId: "codex",
    });
    const expected =
      3 * resolvePromptSdlcEarlyTokensPerRound("codex") +
      PROMPT_SDLC_PREVIEW_STEP4_MODULE_COUNT *
        1 *
        resolvePromptSdlcStep4TokensPerModuleTrial("codex");
    expect(proposal.targetTokenBudget).toBe(expected);
    expect(proposal.stub).toBe(true);
    expect(proposal.rateUsdPer1kTokens).toBe(0.008);
  });

  it("defaults early rounds to wizard max when maxRounds omitted", () => {
    const proposal = proposePromptSdlcRunCostBudget({
      maxTrials: 1,
      writerId: "codex",
    });
    const expected =
      PROMPT_SDLC_WIZARD_MAX_ROUNDS *
        resolvePromptSdlcEarlyTokensPerRound("codex") +
      PROMPT_SDLC_PREVIEW_STEP4_MODULE_COUNT *
        1 *
        resolvePromptSdlcStep4TokensPerModuleTrial("codex");
    expect(proposal.targetTokenBudget).toBe(expected);
  });

  it("resolvePromptSdlcWriterRateUsdPer1k distinguishes writers", () => {
    expect(resolvePromptSdlcWriterRateUsdPer1k("codex")).toBe(0.008);
    expect(resolvePromptSdlcWriterRateUsdPer1k("claude-cli")).toBe(0.009);
    expect(resolvePromptSdlcWriterRateUsdPer1k("cursor")).toBe(0.01);
  });

  it("seedPromptSdlcRunCostProposal populates estimate before confirm", () => {
    const seeded = seedPromptSdlcRunCostProposal({
      maxRounds: 3,
      writerId: "codex",
    });
    expect(seeded.targetTokenBudget).toBeGreaterThan(0);
    expect(seeded.estimatedSpendUsd).toBeGreaterThan(0);
    expect(seeded.budgetConfirmed).toBe(false);
    expect(seeded.proposalStub).toBe(true);
  });
});
