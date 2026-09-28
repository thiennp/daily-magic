"use client";

import type { ReactElement } from "react";

import {
  WORKFLOW_BOOLEAN_NO,
  WORKFLOW_BOOLEAN_YES,
} from "@/lib/workflows/isValidWorkflowBooleanValue";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldBooleanControlProps {
  readonly field: WorkflowFieldDefinition;
  readonly value: string;
  readonly controlId: string;
  readonly onChange: (value: string) => void;
}

export default function WorkflowTaskFieldBooleanControl({
  field,
  value,
  controlId,
  onChange,
}: WorkflowTaskFieldBooleanControlProps): ReactElement {
  return (
    <div className="mt-2 flex gap-4 text-sm font-normal text-gray-700 dark:text-gray-300">
      <label className="flex items-center gap-2">
        <input
          id={controlId}
          type="radio"
          name={field.key}
          checked={value === WORKFLOW_BOOLEAN_YES}
          onChange={() => {
            onChange(WORKFLOW_BOOLEAN_YES);
          }}
        />
        Yes
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name={field.key}
          checked={value === WORKFLOW_BOOLEAN_NO}
          onChange={() => {
            onChange(WORKFLOW_BOOLEAN_NO);
          }}
        />
        No
      </label>
    </div>
  );
}
