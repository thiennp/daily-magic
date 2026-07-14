import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface FallbackRuleHarnessInput {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly exampleRequest: string;
  readonly isWorkflow: boolean;
}

const buildFallbackRuleHarnessItem = (
  input: FallbackRuleHarnessInput,
): CapabilityTemplateHarnessItem => ({
  id: `${input.id}-rule`,
  kind: "rule",
  title: `${input.name} behavior`,
  path: `rules/${input.id}.mdc`,
  content: [
    `# ${input.name}`,
    "",
    `Category: ${input.category}`,
    "",
    input.isWorkflow
      ? "When this workflow runs on the user's Mac:"
      : "When this agent runs on the user's Mac:",
    "- Follow the bundled skill and command for this preset.",
    "- Use only facts from user inputs or files they reference.",
    "- Prefer concise, scannable output ready to paste or send.",
    `- Default intent: ${input.exampleRequest}`,
    "",
    "Safety:",
    "- Do not exfiltrate secrets, tokens, or private credentials.",
    "- Ask before destructive file operations outside the task scope.",
  ].join("\n"),
});

export default buildFallbackRuleHarnessItem;
