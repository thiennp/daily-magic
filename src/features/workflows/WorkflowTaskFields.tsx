"use client";

import { workflowFieldInputClassName } from "@/features/workflows/utils/workflowFieldInputClassName";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldsProps {
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
  readonly fieldErrors?: Readonly<Record<string, string>>;
  readonly onChange: (key: string, value: string) => void;
}

export default function WorkflowTaskFields({
  fields,
  values,
  fieldErrors = {},
  onChange,
}: WorkflowTaskFieldsProps) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      {fields.map((field) => {
        const errorMessage = fieldErrors[field.key];

        return (
          <label
            key={field.key}
            className="block text-sm font-medium text-gray-800 dark:text-white/90"
          >
            {field.label}
            {field.required ? " *" : ""}
            {field.type === "textarea" ? (
              <textarea
                value={values[field.key] ?? ""}
                onChange={(event) => {
                  onChange(field.key, event.target.value);
                }}
                rows={4}
                aria-invalid={errorMessage !== undefined}
                className={workflowFieldInputClassName(
                  errorMessage !== undefined,
                )}
              />
            ) : (
              <input
                type="text"
                value={values[field.key] ?? ""}
                onChange={(event) => {
                  onChange(field.key, event.target.value);
                }}
                aria-invalid={errorMessage !== undefined}
                className={workflowFieldInputClassName(
                  errorMessage !== undefined,
                )}
              />
            )}
            {errorMessage !== undefined ? (
              <span className="mt-1 block text-sm text-rose-600 dark:text-rose-400">
                {errorMessage}
              </span>
            ) : null}
          </label>
        );
      })}
    </div>
  );
}
