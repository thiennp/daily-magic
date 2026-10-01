import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS } from "@/lib/promptOptimizer/promptSdlcCostControl.constant";

/**
 * Approximate blended USD / 1k tokens for Optimizer cost PREDICTION.
 * Writer-agnostic control flow; rates differ by writer so Codex/Cursor/Claude
 * get distinct estimates. Stub heuristics — not invoice meters.
 */
const WRITER_RATE_USD_PER_1K: Record<HarnessWriterAgent, number> = {
  // Claude Sonnet-class blended ~$0.009 / 1k (input-heavy judge/improver).
  "claude-cli": 0.009,
  // Codex / GPT-class blended.
  codex: 0.008,
  // Cursor agent (subscription + API mix) — keep near default.
  cursor: 0.01,
  "cursor-cloud": 0.01,
  antigravity: 0.01,
};

export const resolvePromptSdlcWriterRateUsdPer1k = (
  writerId: string | null | undefined,
): number => {
  const id = writerId?.trim() ?? "";
  if (id.length === 0) {
    return PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS;
  }
  const rate = WRITER_RATE_USD_PER_1K[id as HarnessWriterAgent];
  return rate ?? PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS;
};
