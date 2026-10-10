import type { AutoSkillSuggestion } from "@/features/project-auto-skills/public-api/types";

/** Questions from the folder-docs scan carry this cluster id prefix (see docClusterId in AWL). */
const DOC_QUESTION_PREFIX = "doc-";

export type AutoSkillQuestionCopy = {
  readonly intro: string;
  readonly neverLabel: string;
  /** The prompt line repeats the doc path for doc questions, so it is hidden. */
  readonly showPrompt: boolean;
};

/** Plain-language text of the "Save as skill?" card for each kind of question. */
export const buildAutoSkillQuestionCopy = (
  suggestion: AutoSkillSuggestion,
): AutoSkillQuestionCopy => {
  if (suggestion.kind === "script_approval") {
    return {
      intro: `Allow ${suggestion.draftName} to run on your computer? It stays blocked until you approve.`,
      neverLabel: "Deny",
      showPrompt: true,
    };
  }
  if (suggestion.clusterId.startsWith(DOC_QUESTION_PREFIX)) {
    return {
      intro: `From the project doc ${suggestion.prompt}. No AI wrote it, and the text is stored in your AgentWitch cloud until you answer.`,
      neverLabel: "Never for this doc",
      showPrompt: false,
    };
  }
  if (suggestion.occurrences <= 1) {
    return {
      intro:
        "Found in one past task or commit that reads like a reusable procedure.",
      neverLabel: "Never for this task",
      showPrompt: true,
    };
  }
  const prompts = suggestion.distinctPrompts;
  return {
    intro:
      suggestion.moduleLabel !== null && prompts !== null
        ? `This step appeared ${suggestion.occurrences} times in ${prompts} ${prompts === 1 ? "prompt" : "prompts"}.`
        : `You ran this kind of task ${suggestion.occurrences} times.`,
    neverLabel: "Never for this task",
    showPrompt: true,
  };
};
