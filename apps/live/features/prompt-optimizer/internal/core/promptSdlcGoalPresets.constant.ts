export type PromptSdlcGoalPreset = {
  readonly label: string;
  readonly goal: string;
};

/** Short labels for compose chips; full goal text is inserted into the Goal field. */
export const PROMPT_SDLC_GOAL_PRESETS: readonly PromptSdlcGoalPreset[] = [
  {
    label: "Save tokens",
    goal: "Save tokens while keeping the same output and behavior.",
  },
  {
    label: "Shorter prompt",
    goal: "Make the prompt shorter without losing required behavior or safety constraints.",
  },
  {
    label: "Clearer instructions",
    goal: "Make instructions clearer and easier for the model to follow on the first try.",
  },
  {
    label: "Add guardrails",
    goal: "Add explicit guardrails, constraints, and failure modes so the model stays on scope.",
  },
  {
    label: "Template variables",
    goal: "Turn this into a reusable template with named {{variables}} and sample values for each.",
  },
  {
    label: "Raise judge score",
    goal: "Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity.",
  },
];
