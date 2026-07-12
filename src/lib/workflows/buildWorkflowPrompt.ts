import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export function validateWorkflowFieldValues(
  fields: readonly WorkflowFieldDefinition[],
  values: Readonly<Record<string, string>>,
): readonly string[] {
  return fields.flatMap((field) => {
    const value = values[field.key]?.trim() ?? "";
    if (field.required && value.length === 0) {
      return [`${field.label} is required.`];
    }

    return [];
  });
}

export function buildWorkflowPrompt(
  capabilityName: string,
  fields: readonly WorkflowFieldDefinition[],
  values: Readonly<Record<string, string>>,
  instructions: string,
): string {
  const fieldLines = fields.map((field) => {
    const value = values[field.key]?.trim() ?? "";
    return `- ${field.label}: ${value.length > 0 ? value : "(empty)"}`;
  });

  const trimmedInstructions = instructions.trim();

  return [
    `Run workflow: ${capabilityName}`,
    "",
    "Inputs:",
    ...fieldLines,
    ...(trimmedInstructions.length > 0
      ? ["", "Additional instructions:", trimmedInstructions]
      : []),
  ].join("\n");
}
