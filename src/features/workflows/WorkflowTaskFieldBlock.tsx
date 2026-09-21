"use client";

import type { ReactElement } from "react";

import WorkflowTaskFieldControl from "@/features/workflows/WorkflowTaskFieldControl";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldBlockProps {
  readonly field: WorkflowFieldDefinition;
  readonly value: string;
  readonly errorMessage?: string;
  readonly onChange: (value: string) => void;
}

export default function WorkflowTaskFieldBlock({
  field,
  value,
  errorMessage,
  onChange,
}: WorkflowTaskFieldBlockProps): ReactElement {
  const hasError = errorMessage !== undefined;

  return (
    <div className="block text-sm font-medium text-gray-800 dark:text-white/90">
      <p>
        {field.label}
        {field.required ? " *" : ""}
      </p>
      <WorkflowTaskFieldControl
        field={field}
        value={value}
        hasError={hasError}
        onChange={onChange}
      />
      {hasError ? (
        <span className="mt-1 block text-sm font-normal text-rose-600 dark:text-rose-400">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
