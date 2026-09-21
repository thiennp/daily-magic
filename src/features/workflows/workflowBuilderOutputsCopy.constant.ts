export const WORKFLOW_BUILDER_OUTPUTS_SECTION = {
  title: "What should this workflow produce?",
  description:
    "Optional declared outputs for future graph steps and validation. Runs still use free-form agent text and [[ARTIFACT]] blocks today.",
  addButton: "Add output",
  outputLabel: "Output name",
  outputPlaceholder: "e.g. Summary, Client email draft",
  kindLabel: "Format",
  requiredLabel: "Required on success",
} as const;

export const WORKFLOW_BUILDER_OUTPUT_KIND_OPTIONS = [
  { value: "text", label: "Plain text" },
  { value: "markdown", label: "Markdown" },
  { value: "file", label: "File" },
  { value: "table", label: "Table" },
  { value: "json", label: "JSON" },
] as const;
