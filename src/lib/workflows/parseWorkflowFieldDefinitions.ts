import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

const isWorkflowFieldInputType = (
  value: string,
): value is WorkflowFieldDefinition["type"] =>
  value === WorkflowFieldInputType.TEXT ||
  value === WorkflowFieldInputType.TEXTAREA;

export function parseWorkflowFieldDefinitions(
  value: unknown,
): readonly WorkflowFieldDefinition[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) {
      return [];
    }

    const record = entry as Record<string, unknown>;
    const key = typeof record.key === "string" ? record.key.trim() : "";
    const label = typeof record.label === "string" ? record.label.trim() : "";
    const type =
      typeof record.type === "string" && isWorkflowFieldInputType(record.type)
        ? record.type
        : WorkflowFieldInputType.TEXT;

    if (key.length === 0 || label.length === 0) {
      return [];
    }

    return [
      {
        key,
        label,
        type,
        required: record.required === true,
      },
    ];
  });
}
