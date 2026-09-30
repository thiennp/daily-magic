import { createEmptyPromptSdlcWizardAvoidByStep } from "./createEmptyPromptSdlcWizardAvoidByStep";
import {
  PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  PROMPT_SDLC_WIZARD_SCHEMA_VERSION,
} from "./promptSdlcWizardLimits.constant";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const createInitialPromptSdlcWizardState = (
  sourcePrompt: string,
): PromptSdlcWizardState => ({
  schemaVersion: PROMPT_SDLC_WIZARD_SCHEMA_VERSION,
  phase: "generalize",
  gate: null,
  variables: [],
  templatedPrompt: sourcePrompt.trim(),
  attempts: [],
  avoidByStep: createEmptyPromptSdlcWizardAvoidByStep(),
  evaluateSelectedRound: null,
  splitOptions: [],
  selectedSplitOptionId: null,
  selectedSplitTopology: null,
  modules: [],
  currentModuleIndex: 0,
  runnerInstructions: "",
  pendingStepInstructions: "",
  parameterValues: {},
  modulePassScore: PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  orchestratorSkill: null,
  additionalSkillSuggestions: [],
  additionalSkillSuggestionsStatus: "idle",
  additionalSkillSuggestionsSummary: null,
});
