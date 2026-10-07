"use client";

import type { ReactElement } from "react";

import WorkflowTaskFieldControl from "@/features/workflows/WorkflowTaskFieldControl";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldBlockProps {
  readonly field: WorkflowFieldDefinition;
  readonly value: string;
  readonly errorMessage?: string;
  readonly controlIdPrefix?: string;
  readonly onChange: (value: string) => void;
}

export default function WorkflowTaskFieldBlock({
  field,
  value,
  errorMessage,
  controlIdPrefix = "workflow-field",
  onChange,
}: WorkflowTaskFieldBlockProps): ReactElement {
  const hasError = errorMessage !== undefined;
  const controlId = `${controlIdPrefix}-${field.key}`;
  const errorId = `${controlId}-error`;

  return (
    <div className="text-sm font-medium text-awc-fg dark:text-white/90">
      <label htmlFor={controlId} className="block">
        {field.label}
        {field.required ? " *" : ""}
      </label>
      <WorkflowTaskFieldControl
        field={field}
        value={value}
        hasError={hasError}
        controlId={controlId}
        describedBy={hasError ? errorId : undefined}
        onChange={onChange}
      />
      {hasError ? (
        <span
          id={errorId}
          className="mt-1 block text-sm font-normal text-rose-600 dark:text-rose-400"
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
