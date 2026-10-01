import {
  buildPromptSdlcWizardAdditionalSkillSuggestionsJudgePrompt,
  parsePromptSdlcWizardAdditionalSkillSuggestions,
} from "../../../../adapters/promptSdlcAwcCore";

import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

const wizardSkillSuggestionsPending = (
  cycle: PromptSdlcLocalCycle,
): boolean => {
  const wizard = cycle.wizard;
  return (
    wizard !== undefined &&
    wizard.phase === "complete" &&
    wizard.additionalSkillSuggestionsStatus === "pending"
  );
};

export const fetchPromptSdlcWizardAdditionalSkillSuggestions = async (
  cycle: PromptSdlcLocalCycle,
  signal?: AbortSignal,
  onWriterFailure?: (writer: string) => void,
): Promise<PromptSdlcLocalCycle> => {
  if (!wizardSkillSuggestionsPending(cycle)) {
    return cycle;
  }
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  if (cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR) {
    return {
      ...cycle,
      wizard: {
        ...wizard,
        additionalSkillSuggestionsStatus: "skipped",
      },
      updatedAt: new Date().toISOString(),
    };
  }
  const prompt = buildPromptSdlcWizardAdditionalSkillSuggestionsJudgePrompt({
    goal: cycle.goal,
    cycleStatus: cycle.status,
    wizard,
    orchestratorSkill: wizard.orchestratorSkill,
  });
  const reply = await runPromptSdlcWriterReply({
    writerAgent: cycle.judgeModel,
    prompt,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    signal,
  });
  if (!reply.ok) {
    onWriterFailure?.(cycle.judgeModel);
    return {
      ...cycle,
      wizard: {
        ...wizard,
        additionalSkillSuggestionsStatus: "skipped",
      },
      updatedAt: new Date().toISOString(),
    };
  }
  const parsed = parsePromptSdlcWizardAdditionalSkillSuggestions(
    reply.text,
    wizard.orchestratorSkill?.fileName ?? null,
  );
  if (!parsed.ok) {
    return {
      ...cycle,
      wizard: {
        ...wizard,
        additionalSkillSuggestionsStatus: "ready",
        additionalSkillSuggestions: [],
        additionalSkillSuggestionsSummary: parsed.errorMessage,
      },
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    ...cycle,
    wizard: {
      ...wizard,
      additionalSkillSuggestionsStatus: "ready",
      additionalSkillSuggestions: parsed.suggestions,
      additionalSkillSuggestionsSummary:
        parsed.summary.length > 0 ? parsed.summary : null,
    },
    updatedAt: new Date().toISOString(),
  };
};
