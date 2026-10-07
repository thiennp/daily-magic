import { describe, expect, it } from "vitest";

import { proposePromptSdlcCostBudget } from "@/lib/promptOptimizer/proposePromptSdlcCostBudget";
import {
  PROMPT_SDLC_EARLY_TOKENS_PER_ROUND,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import {
  resolvePromptSdlcEarlyTokensPerRound,
  resolvePromptSdlcStep4TokensPerModuleTrial,
} from "@/lib/promptOptimizer/resolvePromptSdlcWriterTokensPerCall";

describe("DF-035 (b) writer-aware token proposal", () => {
  it("covers at least one observed Codex call (66k–96k) per trial", () => {
    expect(
      resolvePromptSdlcStep4TokensPerModuleTrial("codex"),
    ).toBeGreaterThanOrEqual(2 * 90_000);
    const proposal = proposePromptSdlcCostBudget({
      moduleCount: 1,
      maxTrials: 1,
      writerId: "codex",
    });
    expect(proposal.targetTokenBudget).toBeGreaterThan(162_000);
  });

  it("differs per writer and keeps the stub defaults when unknown", () => {
    expect(
      resolvePromptSdlcStep4TokensPerModuleTrial("claude-cli"),
    ).toBeLessThan(resolvePromptSdlcStep4TokensPerModuleTrial("codex"));
    expect(resolvePromptSdlcStep4TokensPerModuleTrial(null)).toBe(
      PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
    );
    expect(resolvePromptSdlcEarlyTokensPerRound(undefined)).toBe(
      PROMPT_SDLC_EARLY_TOKENS_PER_ROUND,
    );
  });
});
