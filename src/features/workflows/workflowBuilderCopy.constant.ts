export const WORKFLOW_BUILDER_ABOUT_SECTION = {
  title: "About this workflow",
  description:
    "Name and notes for your library. These do not become form fields in Agent.",
} as const;

export const WORKFLOW_BUILDER_QUESTIONS_SECTION = {
  title: "What should Agent ask?",
  description:
    "Each question becomes a form field when someone runs this workflow, and one line in the prompt sent to your Mac.",
  addButton: "Add another question",
  untitledQuestion: "New question",
  questionLabel: "Question",
  questionPlaceholder: "e.g. Week of, Client name, Main topic",
  inputTypeLabel: "Answer length",
  requiredLabel: "Required to run",
} as const;

export const WORKFLOW_BUILDER_INSTRUCTIONS_LABEL =
  "Standing instructions (optional)";

export const WORKFLOW_BUILDER_INSTRUCTIONS_PLACEHOLDER =
  "Tone, format, or rules appended to every run — e.g. Use bullet points";
