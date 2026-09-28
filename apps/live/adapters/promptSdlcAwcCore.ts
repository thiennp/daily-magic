/** AWL migration adapter — Prompt SDLC domain shared with AWC until packages/shared absorbs it. */

export type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
export {
  isPromptSdlcTerminalStatus,
  type PromptSdlcCycleStatus,
} from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
export {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_MAX_ROUNDS_LIMIT,
  PROMPT_SDLC_PASS_SCORE,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
  PROMPT_SDLC_STOP_USER,
} from "@/lib/promptSdlc/promptSdlcLimits.constant";
export {
  continueAfterImproveReply,
  continueAfterJudgeReply,
  type PromptSdlcContinuation,
} from "@/lib/promptSdlc/continuePromptSdlc";
export { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
export {
  buildPromptSdlcJudgePrompt,
  formatPromptSdlcRunDelay,
} from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";
export { buildPromptSdlcRunPrompt } from "@/lib/promptSdlc/buildPromptSdlcRunPrompt";
export { buildPromptSdlcTokenReviewPrompt } from "@/lib/promptSdlc/buildPromptSdlcTokenReviewPrompt";
export { findPromptSdlcEvidencePaths } from "@/lib/promptSdlc/findPromptSdlcEvidencePaths";
export {
  choosePromptSdlcImproverReference,
  type PromptSdlcImproverReference,
} from "@/lib/promptSdlc/choosePromptSdlcImproverReference";
export { collectPromptSdlcPriorRounds } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
export { selectPromptSdlcBestPrompt } from "@/lib/promptSdlc/selectPromptSdlcBestPrompt";
export {
  buildPromptSdlcSteps,
  type PromptSdlcStep,
} from "@/lib/promptSdlc/buildPromptSdlcSteps";
export { buildPromptSdlcScoreScale } from "@/lib/promptSdlc/describePromptSdlcScore";
export {
  PROMPT_SDLC_AGENT_BODY_ERROR,
  PROMPT_SDLC_AGENT_MANUAL_ERROR,
  PROMPT_SDLC_AGENT_PATH,
  PROMPT_SDLC_AGENT_URL,
  PROMPT_SDLC_LIVE_PAGE_URL,
  PROMPT_SDLC_LOCAL_CONTEXT_REASON,
} from "@/lib/promptSdlc/promptSdlcAgentContract.constant";
export type { default as PromptSdlcCycleView } from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";
