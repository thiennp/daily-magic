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
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onDismiss}
        disabled={isSubmitting}
        className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Not now
      </button>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
        <Button
          className="w-full sm:w-auto"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          {isSubmitting ? "Saving…" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
