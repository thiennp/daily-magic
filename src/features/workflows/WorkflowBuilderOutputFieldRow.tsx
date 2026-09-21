"use client";

import Label from "@/components/form/Label";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";
import {
  WORKFLOW_BUILDER_OUTPUT_KIND_OPTIONS,
  WORKFLOW_BUILDER_OUTPUTS_SECTION,
} from "@/features/workflows/workflowBuilderOutputsCopy.constant";
import { isWorkflowFieldOutputKind } from "@/lib/workflows/isWorkflowFieldOutputKind";

interface WorkflowBuilderOutputFieldRowProps {
  readonly field: DraftWorkflowOutputField;
  readonly index: number;
  readonly onChange: (
    id: string,
    patch: Partial<DraftWorkflowOutputField>,
  ) => void;
  readonly onRemove: (id: string) => void;
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800";

export default function WorkflowBuilderOutputFieldRow({
  field,
  index,
  onChange,
  onRemove,
}: WorkflowBuilderOutputFieldRowProps) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Output {index + 1}
        </p>
        <button
          type="button"
          onClick={() => onRemove(field.id)}
          className="text-xs font-medium text-gray-500 hover:text-error-600"
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={`wf-out-label-${field.id}`}>
            {WORKFLOW_BUILDER_OUTPUTS_SECTION.outputLabel}
          </Label>
          <input
            id={`wf-out-label-${field.id}`}
            value={field.label}
            placeholder={WORKFLOW_BUILDER_OUTPUTS_SECTION.outputPlaceholder}
            onChange={(event) => {
              onChange(field.id, { label: event.target.value });
            }}
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor={`wf-out-kind-${field.id}`}>
            {WORKFLOW_BUILDER_OUTPUTS_SECTION.kindLabel}
          </Label>
          <select
            id={`wf-out-kind-${field.id}`}
            value={field.kind}
            onChange={(event) => {
              const nextKind = event.target.value;
              if (isWorkflowFieldOutputKind(nextKind)) {
                onChange(field.id, { kind: nextKind });
              }
            }}
            className={inputClass}
          >
            {WORKFLOW_BUILDER_OUTPUT_KIND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(event) => {
            onChange(field.id, { required: event.target.checked });
          }}
          className="rounded border-gray-300"
        />
        {WORKFLOW_BUILDER_OUTPUTS_SECTION.requiredLabel}
      </label>
    </div>
  );
}
