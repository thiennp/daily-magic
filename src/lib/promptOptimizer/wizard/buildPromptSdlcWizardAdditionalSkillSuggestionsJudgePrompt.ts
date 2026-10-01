import { buildPromptSdlcWizardSkillSuggestionsSummaryText } from "./buildPromptSdlcWizardSkillSuggestionsSummaryText";
import type PromptSdlcWizardOrchestratorSkill from "./types/PromptSdlcWizardOrchestratorSkill.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardAdditionalSkillSuggestionsJudgePrompt =
  (input: {
    readonly goal: string;
    readonly cycleStatus: string;
    readonly wizard: PromptSdlcWizardState;
    readonly orchestratorSkill: PromptSdlcWizardOrchestratorSkill | null;
  }): string => {
    const summary = buildPromptSdlcWizardSkillSuggestionsSummaryText({
      goal: input.goal,
      cycleStatus: input.cycleStatus,
      wizard: input.wizard,
    });
    const orchestratorBlock =
      input.orchestratorSkill === null
        ? "No orchestrator skill was loaded at compose time."
        : [
            "Orchestrator skill (keep this role; do not replace or rename it):",
            `fileName: ${input.orchestratorSkill.fileName}`,
            `name: ${input.orchestratorSkill.name}`,
            `description: ${input.orchestratorSkill.description}`,
          ].join("\n");

    return [
      "You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.",
      "Do not edit files. Do not run tools.",
      "Read the run summary and recommend extra skills that would help the orchestrator skill succeed.",
      "Never suggest replacing the orchestrator skill or reusing its fileName.",
      "Reply with one JSON object only, no markdown.",
      "",
      orchestratorBlock,
      "",
      "Run summary:",
      summary,
      "",
      "summary: one short paragraph on what the run shows.",
      "suggestions: up to 3 additional skills (not the orchestrator).",
      "Each suggestion needs fileName (kebab-case slug), name, description, rationale.",
      "",
      '{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}',
    ].join("\n");
  };
