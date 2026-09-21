import { isNonNullObject, isString } from "guardz";

import {
  WorkflowFieldOutputKind,
  type WorkflowFieldOutputKind as WorkflowFieldOutputKindValue,
} from "@/lib/workflows/types/WorkflowFieldOutputKind.constant";
import type WorkflowOutputFieldDefinition from "@/lib/workflows/types/WorkflowOutputFieldDefinition.type";

const isOutputKind = (value: unknown): value is WorkflowFieldOutputKindValue =>
  typeof value === "string" &&
  (Object.values(WorkflowFieldOutputKind) as readonly string[]).includes(value);

export const parseWorkflowOutputFieldDefinitions = (
  value: unknown,
): readonly WorkflowOutputFieldDefinition[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!isNonNullObject(entry)) {
      return [];
    }

    const key = isString(entry.key) ? entry.key.trim() : "";
    const label = isString(entry.label) ? entry.label.trim() : "";
    const kind = isOutputKind(entry.kind)
      ? entry.kind
      : WorkflowFieldOutputKind.TEXT;

    if (key.length === 0 || label.length === 0) {
      return [];
    }

    return [
      {
        key,
        label,
        kind,
        required: entry.required === true,
      },
    ];
  });
};
