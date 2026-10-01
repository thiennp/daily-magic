import type PromptSdlcWizardOrchestratorSkill from "./types/PromptSdlcWizardOrchestratorSkill.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const seedPromptSdlcWizardOrchestratorSkill = (
  wizard: PromptSdlcWizardState,
  skill: PromptSdlcWizardOrchestratorSkill | null,
): PromptSdlcWizardState => {
  if (skill === null) {
    return wizard.orchestratorSkill === null
      ? wizard
      : { ...wizard, orchestratorSkill: null };
  }
  const unchanged =
    wizard.orchestratorSkill?.fileName === skill.fileName &&
    wizard.orchestratorSkill.name === skill.name &&
    wizard.orchestratorSkill.description === skill.description;
  if (unchanged) {
    return wizard;
  }
  return { ...wizard, orchestratorSkill: skill };
};
