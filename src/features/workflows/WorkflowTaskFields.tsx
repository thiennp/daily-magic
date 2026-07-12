"use client";

import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldsProps {
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
  readonly onChange: (key: string, value: string) => void;
}

export default function WorkflowTaskFields({
  fields,
  values,
  onChange,
}: WorkflowTaskFieldsProps) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      {fields.map((field) => (
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
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
            />
          ) : (
            <input
              type="text"
              value={values[field.key] ?? ""}
              onChange={(event) => {
                onChange(field.key, event.target.value);
              }}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
            />
          )}
        </label>
      ))}
    </div>
  );
}
