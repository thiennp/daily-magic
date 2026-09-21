"use client";

import Label from "@/components/form/Label";
import WorkflowBuilderSelectOptionsField from "@/features/workflows/WorkflowBuilderSelectOptionsField";
import { WORKFLOW_BUILDER_QUESTIONS_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import { WORKFLOW_BUILDER_INPUT_TYPE_OPTIONS } from "@/features/workflows/workflowBuilderInputTypeOptions.constant";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { isAuthorableWorkflowFieldInputType } from "@/lib/workflows/isWorkflowFieldInputType";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

interface WorkflowBuilderFieldRowInputsProps {
  readonly field: DraftWorkflowField;
  readonly onChange: (id: string, patch: Partial<DraftWorkflowField>) => void;
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800";

export default function WorkflowBuilderFieldRowInputs({
  field,
  onChange,
}: WorkflowBuilderFieldRowInputsProps) {
  const isProjectField = field.type === WorkflowFieldInputType.PROJECT;

  return (
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
        {isProjectField ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Project folder (set when running)
          </p>
        ) : (
          <select
            id={`wf-type-${field.id}`}
            value={field.type}
            onChange={(event) => {
              const nextType = event.target.value;
              if (isAuthorableWorkflowFieldInputType(nextType)) {
                onChange(field.id, {
                  type: nextType,
                  options:
                    nextType === WorkflowFieldInputType.SELECT
                      ? field.options
                      : [],
                });
              }
            }}
            className={inputClass}
          >
            {WORKFLOW_BUILDER_INPUT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {field.type === WorkflowFieldInputType.SELECT ? (
        <WorkflowBuilderSelectOptionsField
          fieldId={field.id}
          options={field.options}
          onChange={(options) => {
            onChange(field.id, { options });
          }}
        />
      ) : null}
    </div>
  );
}
