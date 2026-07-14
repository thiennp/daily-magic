import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface FallbackSubagentHarnessInput {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
}

const buildFallbackSubagentHarnessItem = (
  input: FallbackSubagentHarnessInput,
): CapabilityTemplateHarnessItem => ({
  id: `${input.id}-agent`,
  kind: "agent",
  title: `${input.name} specialist`,
  path: `agents/${input.id}.md`,
  content: [
    `# ${input.name} subagent`,
    "",
    `You are the dedicated subagent for the **${input.name}** preset (${input.category}).`,
    "",
    "## Delegation",
    "- The main agent delegates this preset's core work to you.",
    "- Own the full deliverable end-to-end unless the user narrows scope.",
    "- Return a finished artifact ready to paste, send, or save.",
    "",
    "## Quality bar",
    "- Apply the bundled rule, skill, and command for this preset.",
    `- Default intent: ${input.exampleRequest}`,
    "- List assumptions, risks, and one recommended next step.",
    "",
    "## Scope",
    input.description,
  ].join("\n"),
});

export default buildFallbackSubagentHarnessItem;
