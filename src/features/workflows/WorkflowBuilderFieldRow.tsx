"use client";

import WorkflowBuilderFieldRowInputs from "@/features/workflows/WorkflowBuilderFieldRowInputs";
import { WORKFLOW_BUILDER_QUESTIONS_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import resolveWorkflowFieldRowTitle from "@/features/workflows/resolveWorkflowFieldRowTitle";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";

interface WorkflowBuilderFieldRowProps {
  readonly field: DraftWorkflowField;
  readonly index: number;
  readonly canRemove: boolean;
  readonly onChange: (id: string, patch: Partial<DraftWorkflowField>) => void;
  readonly onRemove: (id: string) => void;
}

export default function WorkflowBuilderFieldRow({
  field,
  index,
  canRemove,
  onChange,
  onRemove,
}: WorkflowBuilderFieldRowProps) {
  return (
    <div className="rounded-xl border border-awc-border bg-awc-surface-2/80 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-awc-fg dark:text-white/90">
          {resolveWorkflowFieldRowTitle(field.label, index)}
        </p>
        {canRemove ? (
          <button
            type="button"
            onClick={() => {
              onRemove(field.id);
            }}
            className="text-xs font-medium text-awc-fg-muted hover:text-error-600"
          >
            Remove
          </button>
        ) : null}
      </div>
      <WorkflowBuilderFieldRowInputs field={field} onChange={onChange} />
      <label className="mt-3 flex items-center gap-2 text-sm text-awc-fg dark:text-gray-300">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(event) => {
            onChange(field.id, { required: event.target.checked });
          }}
          className="rounded border-awc-border-strong"
        />
        {WORKFLOW_BUILDER_QUESTIONS_SECTION.requiredLabel}
      </label>
    </div>
  );
}
