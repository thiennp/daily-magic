"use client";

import Label from "@/components/form/Label";
import { WORKFLOW_BUILDER_QUESTIONS_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import resolveWorkflowFieldRowTitle from "@/features/workflows/resolveWorkflowFieldRowTitle";
import {
  WorkflowFieldInputType,
  type WorkflowFieldInputTypeValue,
} from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface DraftWorkflowField {
  readonly id: string;
  readonly label: string;
  readonly type: WorkflowFieldInputTypeValue;
  readonly required: boolean;
}

interface WorkflowBuilderFieldRowProps {
  readonly field: DraftWorkflowField;
  readonly index: number;
  readonly canRemove: boolean;
  readonly onChange: (id: string, patch: Partial<DraftWorkflowField>) => void;
  readonly onRemove: (id: string) => void;
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800";

export default function WorkflowBuilderFieldRow({
  field,
  index,
  canRemove,
  onChange,
  onRemove,
}: WorkflowBuilderFieldRowProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {resolveWorkflowFieldRowTitle(field.label, index)}
        </p>
        {canRemove ? (
          <button
            type="button"
            onClick={() => {
              onRemove(field.id);
            }}
            className="text-xs font-medium text-gray-500 hover:text-error-600"
          >
            Remove
          </button>
        ) : null}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={`wf-label-${field.id}`}>
            {WORKFLOW_BUILDER_QUESTIONS_SECTION.questionLabel}
          </Label>
          <input
            id={`wf-label-${field.id}`}
            value={field.label}
            placeholder={WORKFLOW_BUILDER_QUESTIONS_SECTION.questionPlaceholder}
            onChange={(event) => {
              onChange(field.id, { label: event.target.value });
            }}
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor={`wf-type-${field.id}`}>
            {WORKFLOW_BUILDER_QUESTIONS_SECTION.inputTypeLabel}
          </Label>
          <select
            id={`wf-type-${field.id}`}
            value={field.type}
            onChange={(event) => {
              const nextType = event.target.value;
              if (
                nextType === WorkflowFieldInputType.TEXT ||
                nextType === WorkflowFieldInputType.TEXTAREA
              ) {
                onChange(field.id, { type: nextType });
              }
            }}
            className={inputClass}
          >
            <option value={WorkflowFieldInputType.TEXT}>One line</option>
            <option value={WorkflowFieldInputType.TEXTAREA}>
              Multiple lines
            </option>
          </select>
        </div>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(event) => {
            onChange(field.id, { required: event.target.checked });
          }}
          className="rounded border-gray-300"
        />
        {WORKFLOW_BUILDER_QUESTIONS_SECTION.requiredLabel}
      </label>
    </div>
  );
}
