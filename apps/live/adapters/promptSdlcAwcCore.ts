/** AWL migration adapter — Prompt optimizer domain shared with AWC until packages/shared absorbs it. */

export type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
export {
  isPromptSdlcTerminalStatus,
  type PromptSdlcCycleStatus,
} from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
export {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_MAX_ROUNDS_LIMIT,
  PROMPT_SDLC_PASS_SCORE,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
  PROMPT_SDLC_STOP_USER,
  PROMPT_SDLC_WIZARD_STOP_USER,
} from "@/lib/promptOptimizer/promptSdlcLimits.constant";
export {
  continueAfterImproveReply,
  continueAfterJudgeReply,
  type PromptSdlcContinuation,
} from "@/lib/promptOptimizer/continuePromptSdlc";
export { buildPromptSdlcImproverPrompt } from "@/lib/promptOptimizer/buildPromptSdlcImproverPrompt";
export {
  buildPromptSdlcJudgePrompt,
  formatPromptSdlcRunDelay,
} from "@/lib/promptOptimizer/buildPromptSdlcJudgePrompt";
export { buildPromptSdlcRunPrompt } from "@/lib/promptOptimizer/buildPromptSdlcRunPrompt";
export { preferMeasurablePromptSdlcGoalOptions } from "@/lib/promptOptimizer/preferMeasurablePromptSdlcGoalOptions";
export { buildPromptSdlcWizardEvaluateJudgePrompt } from "@/lib/promptOptimizer/buildPromptSdlcWizardEvaluateJudgePrompt";
export { buildPromptSdlcTokenReviewPrompt } from "@/lib/promptOptimizer/buildPromptSdlcTokenReviewPrompt";
export { findPromptSdlcEvidencePaths } from "@/lib/promptOptimizer/findPromptSdlcEvidencePaths";
export {
  choosePromptSdlcImproverReference,
  type PromptSdlcImproverReference,
} from "@/lib/promptOptimizer/choosePromptSdlcImproverReference";
export { collectPromptSdlcPriorRounds } from "@/lib/promptOptimizer/collectPromptSdlcPriorRounds";
export { selectPromptSdlcBestPrompt } from "@/lib/promptOptimizer/selectPromptSdlcBestPrompt";
export {
  buildPromptSdlcSteps,
  type PromptSdlcStep,
} from "@/lib/promptOptimizer/buildPromptSdlcSteps";
export { buildPromptSdlcWizardStepIndex } from "@/lib/promptOptimizer/buildPromptSdlcWizardStepIndex";
export { buildPromptSdlcScoreScale } from "@/lib/promptOptimizer/describePromptSdlcScore";
export { readPromptSdlcEndStepFailureMessage } from "@/lib/promptOptimizer/readPromptSdlcEndStepFailureMessage";
export {
  PROMPT_SDLC_AGENT_BODY_ERROR,
  PROMPT_SDLC_AGENT_MANUAL_ERROR,
  PROMPT_SDLC_AGENT_PATH,
  PROMPT_SDLC_AGENT_URL,
  PROMPT_SDLC_LIVE_PAGE_URL,
  PROMPT_SDLC_LOCAL_CONTEXT_REASON,
} from "@/lib/promptOptimizer/promptSdlcAgentContract.constant";
export type { default as PromptSdlcCycleView } from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";
export {
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_MODULE_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  PROMPT_SDLC_WIZARD_SCHEMA_VERSION,
} from "@/lib/promptOptimizer/wizard/promptSdlcWizardLimits.constant";
export { readPromptSdlcWizardModulePassScore } from "@/lib/promptOptimizer/wizard/readPromptSdlcWizardModulePassScore";
export { PROMPT_SDLC_COMPOSE_INTRO } from "@/lib/promptOptimizer/promptSdlcComposeIntro.constant";
export { createInitialPromptSdlcWizardState } from "@/lib/promptOptimizer/wizard/createInitialPromptSdlcWizardState";
export { normalizePromptSdlcWizardState } from "@/lib/promptOptimizer/wizard/normalizePromptSdlcWizardState";
export { appendPromptSdlcWizardFeedback } from "@/lib/promptOptimizer/wizard/appendPromptSdlcWizardFeedback";
export { invalidatePromptSdlcWizardDownstream } from "@/lib/promptOptimizer/wizard/invalidatePromptSdlcWizardDownstream";
export { buildPromptSdlcGeneralizePrompt } from "@/lib/promptOptimizer/wizard/buildPromptSdlcGeneralizePrompt";
export { applyPromptSdlcWizardPlaceholdersToSplitOptions } from "@/lib/promptOptimizer/wizard/applyPromptSdlcWizardPlaceholdersToSplitOptions";
export { buildPromptSdlcSeparatePrompt } from "@/lib/promptOptimizer/wizard/buildPromptSdlcSeparatePrompt";
export { buildPromptSdlcWizardModuleRunPrompt } from "@/lib/promptOptimizer/wizard/buildPromptSdlcWizardModuleRunPrompt";
export { collectPromptSdlcWizardModuleStatistics } from "@/lib/promptOptimizer/wizard/collectPromptSdlcWizardModuleStatistics";
export { finalizePromptSdlcWizardModuleRun } from "@/lib/promptOptimizer/wizard/finalizePromptSdlcWizardModuleRun";
export { readPromptSdlcWizardChainPriorOutput } from "@/lib/promptOptimizer/wizard/readPromptSdlcWizardChainPriorOutput";
export { summarizePromptSdlcWizardCompletion } from "@/lib/promptOptimizer/wizard/summarizePromptSdlcWizardCompletion";
export { buildPromptSdlcWizardAdditionalSkillSuggestionsJudgePrompt } from "@/lib/promptOptimizer/wizard/buildPromptSdlcWizardAdditionalSkillSuggestionsJudgePrompt";
export {
  parsePromptSdlcWizardAdditionalSkillSuggestions,
  type PromptSdlcWizardAdditionalSkillSuggestionsParseResult,
} from "@/lib/promptOptimizer/wizard/parsePromptSdlcWizardAdditionalSkillSuggestions";
export { markPromptSdlcWizardRunComplete } from "@/lib/promptOptimizer/wizard/markPromptSdlcWizardRunComplete";
export { seedPromptSdlcWizardOrchestratorSkill } from "@/lib/promptOptimizer/wizard/seedPromptSdlcWizardOrchestratorSkill";
export { buildPromptSdlcWizardResultMarkdown } from "@/lib/promptOptimizer/wizard/buildPromptSdlcWizardResultMarkdown";
export type {
  PromptSdlcWizardCompletionModuleRow,
  PromptSdlcWizardCompletionSummary,
} from "@/lib/promptOptimizer/wizard/summarizePromptSdlcWizardCompletion";
export { collectPromptSdlcWizardCumulativeTokens } from "@/lib/promptOptimizer/wizard/collectPromptSdlcWizardCumulativeTokens";
export type { default as PromptSdlcWizardChainPriorOutput } from "@/lib/promptOptimizer/wizard/types/PromptSdlcWizardChainPriorOutput.type";
export { parsePromptSdlcGeneralizeReply } from "@/lib/promptOptimizer/wizard/parsePromptSdlcGeneralizeReply";
export { parsePromptSdlcSeparateReply } from "@/lib/promptOptimizer/wizard/parsePromptSdlcSeparateReply";
export { recordPromptSdlcWizardAttempt } from "@/lib/promptOptimizer/wizard/recordPromptSdlcWizardAttempt";
export {
  readPromptSdlcWizardEvaluatePromptText,
  readPromptSdlcWizardTemplatedOrConcrete,
} from "@/lib/promptOptimizer/wizard/readPromptSdlcWizardEvalPrompt";
export { substitutePromptSdlcTemplate } from "@/lib/promptOptimizer/wizard/substitutePromptSdlcTemplate";
export { substitutePromptSdlcTemplateValues } from "@/lib/promptOptimizer/wizard/substitutePromptSdlcTemplateValues";
export { listPromptTemplatePlaceholders } from "@/lib/promptOptimizer/wizard/listPromptTemplatePlaceholders";
export { shouldSkipPromptSdlcWizardGeneralizeReview } from "@/lib/promptOptimizer/wizard/shouldSkipPromptSdlcWizardGeneralizeReview";
export { shouldSkipPromptSdlcWizardEvaluateReview } from "@/lib/promptOptimizer/wizard/shouldSkipPromptSdlcWizardEvaluateReview";
export { shouldSkipPromptSdlcWizardSeparateReview } from "@/lib/promptOptimizer/wizard/shouldSkipPromptSdlcWizardSeparateReview";
export { passesPromptSdlcWizardEvaluateQualityGate } from "@/lib/promptOptimizer/wizard/passesPromptSdlcWizardEvaluateQualityGate";
export { modulesFromPromptSdlcWizardSplitOption } from "@/lib/promptOptimizer/wizard/modulesFromPromptSdlcWizardSplitOption";
export { buildPromptSdlcWizardPipelineSteps } from "@/lib/promptOptimizer/wizard/buildPromptSdlcWizardPipelineSteps";
export type { PromptSdlcWizardPipelineStep } from "@/lib/promptOptimizer/wizard/types/PromptSdlcWizardPipelineStep.type";
export {
  buildPromptSdlcWizardSubstitutionMap,
  seedPromptSdlcWizardParameterValues,
} from "@/lib/promptOptimizer/wizard/buildPromptSdlcWizardSubstitutionMap";
export {
  mergePromptSdlcWizardPostedParameterValues,
  readPostedWizardParameterFieldName,
} from "@/lib/promptOptimizer/wizard/mergePromptSdlcWizardPostedParameterValues";
export type { PromptSdlcWizardSplitOption } from "@/lib/promptOptimizer/wizard/types/PromptSdlcWizardSplitOption.type";
export type { default as PromptSdlcWizardState } from "@/lib/promptOptimizer/wizard/types/PromptSdlcWizardState.type";
export {
  PROMPT_SDLC_WIZARD_GATE_PHASES,
  type PromptSdlcWizardGatePhase,
} from "@/lib/promptOptimizer/wizard/types/PromptSdlcWizardPhase.constant";

export {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_MAX_TRIALS_LIMIT,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
  PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
  PROMPT_SDLC_BUDGET_SOFT_WARN_RATIO,
  PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
  PROMPT_SDLC_SOFT_WARN_BUDGET,
  PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
export { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
export { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
export {
  proposePromptSdlcCostBudget,
  applyPromptSdlcCostProposal,
  seedPromptSdlcStep4CostProposal,
} from "@/lib/promptOptimizer/proposePromptSdlcCostBudget";
export { confirmPromptSdlcCostBudget } from "@/lib/promptOptimizer/confirmPromptSdlcCostBudget";
export {
  readPromptSdlcBudgetStop,
  isPromptSdlcCostBudgetConfirmed,
} from "@/lib/promptOptimizer/readPromptSdlcBudgetStop";
export { resolvePromptSdlcMaxTrials } from "@/lib/promptOptimizer/resolvePromptSdlcMaxTrials";
export type {
  PromptSdlcCostControls,
  PromptSdlcCostProposal,
  PromptSdlcCostConfirm,
  PromptSdlcCostControlKnobs,
} from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";
