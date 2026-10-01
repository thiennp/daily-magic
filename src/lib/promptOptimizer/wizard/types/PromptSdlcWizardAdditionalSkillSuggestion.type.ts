/** Judge-suggested harness skill to add alongside the orchestrator (not a replacement). */
export default interface PromptSdlcWizardAdditionalSkillSuggestion {
  readonly fileName: string;
  readonly name: string;
  readonly description: string;
  readonly rationale: string;
}
