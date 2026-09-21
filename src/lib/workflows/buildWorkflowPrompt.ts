import { appendOperatorCheckpointsToPrompt } from "@/lib/workflows/buildOperatorCheckpointPromptSection";
import { buildWorkflowFieldValidationErrors } from "@/lib/workflows/buildWorkflowFieldValidationErrors";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export { buildWorkflowFieldValidationErrors } from "@/lib/workflows/buildWorkflowFieldValidationErrors";

export function validateWorkflowFieldValues(
  fields: readonly WorkflowFieldDefinition[],
  values: Readonly<Record<string, string>>,
): readonly string[] {
  return Object.values(buildWorkflowFieldValidationErrors(fields, values));
}

export function buildWorkflowPrompt(
  capabilityName: string,
  fields: readonly WorkflowFieldDefinition[],
  values: Readonly<Record<string, string>>,
  instructions: string,
  operatorSteps: readonly OperatorStepDefinition[] = [],
): string {
  const fieldLines = fields.map((field) => {
    const value = values[field.key]?.trim() ?? "";
    return `- ${field.label}: ${value.length > 0 ? value : "(empty)"}`;
  });

  const trimmedInstructions = instructions.trim();
  const workflowPrompt = [
    `Run workflow: ${capabilityName}`,
    "",
    "Inputs:",
    ...fieldLines,
    ...(trimmedInstructions.length > 0
      ? ["", "Additional instructions:", trimmedInstructions]
      : []),
  ].join("\n");

  return appendOperatorCheckpointsToPrompt(workflowPrompt, operatorSteps);
}
