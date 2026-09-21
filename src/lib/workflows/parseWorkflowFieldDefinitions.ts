import { isNonNullObject, isString } from "guardz";

import { isWorkflowFieldInputType } from "@/lib/workflows/isWorkflowFieldInputType";
import { parseWorkflowFieldSelectOptions } from "@/lib/workflows/parseWorkflowFieldSelectOptions";
import { parseWorkflowFieldAccept } from "@/lib/workflows/parseWorkflowFieldAccept";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export function parseWorkflowFieldDefinitions(
  value: unknown,
): readonly WorkflowFieldDefinition[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!isNonNullObject(entry)) {
      return [];
    }

    const key = isString(entry.key) ? entry.key.trim() : "";
    const label = isString(entry.label) ? entry.label.trim() : "";
    const type = isWorkflowFieldInputType(entry.type)
      ? entry.type
      : WorkflowFieldInputType.TEXT;
    const options = parseWorkflowFieldSelectOptions(entry.options);
    const accept = parseWorkflowFieldAccept(entry.accept);

    if (key.length === 0 || label.length === 0) {
      return [];
    }

    return [
      {
        key,
        label,
        type,
        required: entry.required === true,
        ...(type === WorkflowFieldInputType.SELECT && options.length > 0
          ? { options }
          : {}),
        ...(type === WorkflowFieldInputType.FILE && accept.length > 0
          ? { accept }
          : type === WorkflowFieldInputType.FILE
            ? { accept: ["pdf", "image"] as const }
            : {}),
      },
    ];
  });
}
