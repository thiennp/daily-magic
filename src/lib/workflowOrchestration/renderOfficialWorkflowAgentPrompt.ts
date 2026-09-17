import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type { OfficialWorkflowAgentNode } from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

export const renderOfficialWorkflowAgentPrompt = (input: {
  readonly definition: OfficialWorkflowDefinition;
  readonly node: OfficialWorkflowAgentNode;
  readonly stepIndex: number;
  readonly totalSteps: number;
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly priorHumanResponses: Readonly<Record<string, string>>;
}): string => {
  const fieldLines = input.fields.map((field) => {
    const value = input.fieldValues[field.key]?.trim() ?? "";
    return `- ${field.label}: ${value.length > 0 ? value : "(empty)"}`;
  });

  const priorLines = Object.entries(input.priorHumanResponses).map(
    ([stepKey, response]) => `- ${stepKey}: ${response.trim()}`,
  );

  return [
    `Official workflow: ${input.definition.capabilityName}`,
    `Orchestrated step ${input.stepIndex + 1} of ${input.totalSteps}: ${input.node.title}`,
    "",
    "You are executing ONE orchestrated agent step only. Do not skip ahead to later workflow phases.",
    "Do not emit [[AWAITING_INPUT]] for workflow human checkpoints — the platform will pause the workflow between steps.",
    "",
    "Daily-use rules:",
    "- Use only real values from the workflow form and prior checkpoint replies — never invent companies, people, metrics, or thread text.",
    "- If a required input is empty, say what is missing in [[PROGRESS]] and stop this step; the operator will fix it at the next checkpoint.",
    "",
    "Workflow form inputs:",
    ...fieldLines,
    ...(priorLines.length > 0
      ? ["", "Prior operator checkpoint responses:", ...priorLines]
      : []),
    "",
    "Step instructions:",
    input.node.promptSection.trim(),
  ].join("\n");
};

export default renderOfficialWorkflowAgentPrompt;
