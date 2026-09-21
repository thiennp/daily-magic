"use client";

import type { ReactElement } from "react";

import { workflowFieldInputClassName } from "@/features/workflows/utils/workflowFieldInputClassName";
import { workflowFieldHtmlInputType } from "@/features/workflows/workflowFieldHtmlInputType";
import {
  WORKFLOW_BOOLEAN_NO,
  WORKFLOW_BOOLEAN_YES,
} from "@/lib/workflows/isValidWorkflowBooleanValue";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldControlProps {
  readonly field: WorkflowFieldDefinition;
  readonly value: string;
  readonly hasError: boolean;
  readonly onChange: (value: string) => void;
}

export default function WorkflowTaskFieldControl({
  field,
  value,
  hasError,
  onChange,
}: WorkflowTaskFieldControlProps): ReactElement {
  const className = workflowFieldInputClassName(hasError);

  if (field.type === WorkflowFieldInputType.TEXTAREA) {
    return (
      <textarea
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        rows={4}
        aria-invalid={hasError}
        className={className}
      />
    );
  }

  if (field.type === WorkflowFieldInputType.BOOLEAN) {
    return (
      <div className="mt-2 flex gap-4 text-sm font-normal text-gray-700 dark:text-gray-300">
        <label className="flex items-center gap-2">
          <input
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

  if (field.type === WorkflowFieldInputType.SELECT) {
    return (
      <select
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        aria-invalid={hasError}
        className={className}
      >
        <option value="">Choose…</option>
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  const htmlType = workflowFieldHtmlInputType(field.type) ?? "text";

  return (
    <input
      type={htmlType}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      aria-invalid={hasError}
      className={className}
    />
  );
}
