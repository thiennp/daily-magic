"use client";

import WorkflowTaskFieldBlock from "@/features/workflows/WorkflowTaskFieldBlock";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

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
  const visibleFields = fields.filter(
    (field) => field.type !== WorkflowFieldInputType.PROJECT,
  );

  if (visibleFields.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      {visibleFields.map((field) => (
        <WorkflowTaskFieldBlock
          key={field.key}
          field={field}
          value={values[field.key] ?? ""}
          errorMessage={fieldErrors[field.key]}
          onChange={(value) => {
            onChange(field.key, value);
          }}
        />
      ))}
    </div>
  );
}
