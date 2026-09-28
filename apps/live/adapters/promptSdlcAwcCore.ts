/** AWL migration adapter — Prompt SDLC domain shared with AWC until packages/shared absorbs it. */

export type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
export {
  isPromptSdlcTerminalStatus,
  type PromptSdlcCycleStatus,
} from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
export {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_PASS_SCORE,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
} from "@/lib/promptSdlc/promptSdlcLimits.constant";
export {
  continueAfterImproveReply,
  continueAfterJudgeReply,
  type PromptSdlcContinuation,
} from "@/lib/promptSdlc/continuePromptSdlc";
export { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
export { buildPromptSdlcJudgePrompt } from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";
export {
  buildPromptSdlcSteps,
  type PromptSdlcStep,
} from "@/lib/promptSdlc/buildPromptSdlcSteps";
export { buildPromptSdlcScoreScale } from "@/lib/promptSdlc/describePromptSdlcScore";
export type { default as PromptSdlcCycleView } from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";
