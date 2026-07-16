"use client";

import WorkflowTaskFields from "@/features/workflows/WorkflowTaskFields";
import MobileWorkflowStepper from "@/features/workflows/MobileWorkflowStepper";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WsTestTaskInputsSectionProps {
  readonly isWorkflowTask: boolean;
  readonly useMobileStepper: boolean;
  readonly prompt: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowFieldValues: Readonly<Record<string, string>>;
  readonly workflowFieldErrors: Readonly<Record<string, string>>;
  readonly promptValidationError?: string;
  readonly onPromptChange: (value: string) => void;
  readonly onWorkflowFieldChange: (key: string, value: string) => void;
}

export default function WsTestTaskInputsSection({
  isWorkflowTask,
  useMobileStepper,
  prompt,
  workflowFields,
  workflowFieldValues,
  workflowFieldErrors,
  promptValidationError,
  onPromptChange,
  onWorkflowFieldChange,
}: WsTestTaskInputsSectionProps) {
  if (isWorkflowTask) {
    return (
      <>
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Workflow inputs
        </h2>
        {useMobileStepper ? (
          <MobileWorkflowStepper
            fields={workflowFields}
            values={workflowFieldValues}
            fieldErrors={workflowFieldErrors}
            onChange={onWorkflowFieldChange}
          />
        ) : null}
        <div className={useMobileStepper ? "hidden md:block" : undefined}>
          <WorkflowTaskFields
            fields={workflowFields}
            values={workflowFieldValues}
            fieldErrors={workflowFieldErrors}
            onChange={onWorkflowFieldChange}
          />
        </div>
        <label
          htmlFor="agent-witch-workflow-notes"
          className="mt-4 block text-sm font-medium text-gray-800 dark:text-white/90"
        >
          Additional instructions (optional)
        </label>
        <textarea
          id="agent-witch-workflow-notes"
          value={prompt}
          onChange={(event) => {
            onPromptChange(event.target.value);
          }}
          rows={4}
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </>
    );
  }

  const hasPromptError = promptValidationError !== undefined;

  return (
    <>
      <label
        htmlFor="agent-witch-prompt"
        className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90"
      >
        Task instructions
      </label>
      <textarea
        id="agent-witch-prompt"
        value={prompt}
        onChange={(event) => {
          onPromptChange(event.target.value);
        }}
        rows={8}
        placeholder="Describe what you want done on the computer…"
        aria-invalid={hasPromptError}
        className={
          hasPromptError
            ? "w-full rounded-lg border border-rose-500 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10 dark:border-rose-500 dark:bg-gray-800 dark:text-white/90"
            : "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
        }
      />
      {hasPromptError ? (
        <span className="mt-1 block text-sm text-rose-600 dark:text-rose-400">
          {promptValidationError}
        </span>
      ) : null}
    </>
  );
}
