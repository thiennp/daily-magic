import buildFallbackRuleHarnessItem from "@/lib/capabilities/templates/buildFallbackRuleHarnessItem";
import buildFallbackSubagentHarnessItem from "@/lib/capabilities/templates/buildFallbackSubagentHarnessItem";
import buildDefaultOperatorHarnessItem from "@/lib/capabilities/templates/buildDefaultOperatorHarnessItem";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface TemplateHarnessContentInput {
  readonly id: string;
  readonly name: string;
  readonly type: CapabilityTypeValue;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
}

const buildTemplateHarnessItemContents = (
  input: TemplateHarnessContentInput,
): readonly CapabilityTemplateHarnessItem[] => {
  const isWorkflow = input.type === CapabilityType.WORKFLOW;
  const slug = `template-${input.id}`;

  return [
    buildFallbackRuleHarnessItem({
      id: input.id,
      name: input.name,
      category: input.category,
      exampleRequest: input.exampleRequest,
      isWorkflow,
    }),
    {
      id: `${input.id}-skill`,
      kind: "skill",
      title: `${input.name} playbook`,
      path: `skills/${input.id}/SKILL.md`,
      content: [
        `# ${input.name}`,
        "",
        input.description,
        "",
        "## When to use",
        `- ${input.category} work that matches this preset on a paired Mac.`,
        "",
        "## Steps",
        "1. Read the user inputs and any referenced local files.",
        "2. Apply the behavior rule and instruction defaults for this preset.",
        "3. Produce the deliverable in the format implied by the task.",
        "4. List assumptions, open questions, and suggested next actions.",
        "",
        "## Output quality",
        "- Lead with the answer or decision.",
        "- Use bullets for lists; keep paragraphs short.",
        "- Call out blockers, risks, and missing context explicitly.",
      ].join("\n"),
    },
    {
      id: `${input.id}-command`,
      kind: "command",
      title: `Run ${input.name}`,
      path: `commands/${input.id}.md`,
      content: [
        `# Run ${input.name}`,
        "",
        "Use this command when the user selects this preset from Library or Agent.",
        "",
        "```text",
        input.exampleRequest,
        "```",
        "",
        "After running:",
        "- Save outputs where the user asked (file, note, or chat reply).",
        "- If inputs are incomplete, ask one focused follow-up question.",
      ].join("\n"),
    },
    {
      id: `${input.id}-instruction`,
      kind: "instruction",
      title: `${input.name} defaults`,
      path: `instructions/${input.id}.md`,
      content: [
        `# ${input.name} default instruction`,
        "",
        input.exampleRequest,
        "",
        "Harness set slug:",
        slug,
        "",
        "Remind the agent that this preset is meant to run on the owner's Mac via Agent Witch.",
      ].join("\n"),
    },
    buildDefaultOperatorHarnessItem(input),
    buildFallbackSubagentHarnessItem(input),
  ];
};

export default buildTemplateHarnessItemContents;
