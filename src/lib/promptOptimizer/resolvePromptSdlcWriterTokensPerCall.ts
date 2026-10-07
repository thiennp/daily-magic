import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import {
  PROMPT_SDLC_EARLY_TOKENS_PER_ROUND,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";

/**
 * DF-035 (b): typical tokens ONE agent CLI call reports (system prompt + tool
 * context + cache reads included), as metered by the budget guard. The old flat
 * 8k-per-trial stub was ~10x below a single Codex call (66k–96k observed), so
 * every confirmed budget hard-stopped before a module could pass.
 */
const WRITER_TOKENS_PER_CALL: Record<HarnessWriterAgent, number> = {
  codex: 90_000,
  "claude-cli": 30_000,
  cursor: 40_000,
  "cursor-cloud": 40_000,
  antigravity: 30_000,
};

/** Calls per Step 4 module trial (runner + judge) and per early round (judge + improver). */
const CALLS_PER_STEP = 2;

const tokensPerCall = (writerId: string | null | undefined): number | null => {
  const id = writerId?.trim() ?? "";
  return id.length === 0
    ? null
    : (WRITER_TOKENS_PER_CALL[id as HarnessWriterAgent] ?? null);
};

export const resolvePromptSdlcStep4TokensPerModuleTrial = (
  writerId: string | null | undefined,
): number => {
  const perCall = tokensPerCall(writerId);
  return perCall === null
    ? PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL
    : perCall * CALLS_PER_STEP;
};

export const resolvePromptSdlcEarlyTokensPerRound = (
  writerId: string | null | undefined,
): number => {
  const perCall = tokensPerCall(writerId);
  return perCall === null
    ? PROMPT_SDLC_EARLY_TOKENS_PER_ROUND
    : perCall * CALLS_PER_STEP;
};
