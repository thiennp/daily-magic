"use client";

import Button from "@/components/ui/button/Button";

interface WorkflowHumanStepModalFooterProps {
  readonly isSubmitting: boolean;
  readonly canSubmit: boolean;
  readonly allowSkip: boolean;
  readonly onSubmit: () => void;
  readonly onSkip: () => void;
  readonly onDismiss: () => void;
}

export default function WorkflowHumanStepModalFooter({
  isSubmitting,
  canSubmit,
  allowSkip,
  onSubmit,
  onSkip,
  onDismiss,
}: WorkflowHumanStepModalFooterProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={onDismiss}
        disabled={isSubmitting}
        className="text-left text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <span className="font-medium">Remind me later</span>
        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-500">
          Workflow stays paused — answer from job history anytime.
        </span>
      </button>
      <div className="flex items-center gap-3">
        {allowSkip ? (
          <button
            type="button"
            onClick={onSkip}
            disabled={isSubmitting}
            className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Skip this step
          </button>
        ) : null}
        <Button disabled={!canSubmit} onClick={onSubmit}>
          {isSubmitting ? "Sending…" : "Send and continue"}
        </Button>
      </div>
    </div>
  );
}
