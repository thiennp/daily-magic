/** Skill loaded at compose time; wizard keeps this role across evaluate iterations. */
export default interface PromptSdlcWizardOrchestratorSkill {
  readonly fileName: string;
  readonly name: string;
  readonly description: string;
}
