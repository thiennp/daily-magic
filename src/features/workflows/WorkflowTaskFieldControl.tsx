"use client";

import type { ReactElement } from "react";

import WorkflowTaskFieldBooleanControl from "@/features/workflows/WorkflowTaskFieldBooleanControl";
import WorkflowTaskFieldFileInput from "@/features/workflows/WorkflowTaskFieldFileInput";
import { workflowFieldInputClassName } from "@/features/workflows/utils/public-api/presentation";
import { workflowFieldHtmlInputType } from "@/features/workflows/workflowFieldHtmlInputType";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldControlProps {
  readonly field: WorkflowFieldDefinition;
  readonly value: string;
  readonly hasError: boolean;
  readonly controlId: string;
  readonly describedBy?: string;
  readonly onChange: (value: string) => void;
}

export default function WorkflowTaskFieldControl({
  field,
  value,
  hasError,
  controlId,
  describedBy,
  onChange,
}: WorkflowTaskFieldControlProps): ReactElement {
  const className = workflowFieldInputClassName(hasError);

  if (field.type === WorkflowFieldInputType.TEXTAREA) {
    return (
      <textarea
        id={controlId}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        rows={4}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={className}
      />
    );
  }

  if (field.type === WorkflowFieldInputType.BOOLEAN) {
    return (
      <WorkflowTaskFieldBooleanControl
        field={field}
        value={value}
        controlId={controlId}
        onChange={onChange}
      />
    );
  }

  if (field.type === WorkflowFieldInputType.SELECT) {
    return (
      <select
        id={controlId}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        aria-invalid={hasError}
        aria-describedby={describedBy}
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

  if (field.type === WorkflowFieldInputType.FILE) {
    return (
      <WorkflowTaskFieldFileInput
        field={field}
        value={value}
        hasError={hasError}
        controlId={controlId}
        onChange={onChange}
      />
    );
  }

  const htmlType = workflowFieldHtmlInputType(field.type) ?? "text";

  return (
    <input
      id={controlId}
      type={htmlType}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      aria-invalid={hasError}
      aria-describedby={describedBy}
      className={className}
    />
  );
}
