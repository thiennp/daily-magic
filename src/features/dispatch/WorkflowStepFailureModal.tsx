"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import type { WorkflowStepFailureRequest } from "@/lib/workflowOrchestration/types/WorkflowStepFailurePayload.type";

interface WorkflowStepFailureModalProps {
  readonly request: WorkflowStepFailureRequest;
  readonly isRetrying: boolean;
  readonly retryError: string | null;
  readonly onRetry: () => void;
  readonly onDismiss: () => void;
}

export default function WorkflowStepFailureModal({
  request,
  isRetrying,
  retryError,
  onRetry,
  onDismiss,
}: WorkflowStepFailureModalProps) {
  return (
    <Modal
      isOpen
      onClose={onDismiss}
      showCloseButton={false}
      className="max-w-lg p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Step failed: {request.title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Step {request.stepIndex + 1} stopped on your Mac. Earlier steps and your
        answers are kept, so a retry resumes from this step instead of the
        beginning.
      </p>
      <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
        {request.errorMessage}
      </p>
      {retryError !== null ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {retryError}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onDismiss}
          disabled={isRetrying}
          className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Dismiss
        </button>
        <Button disabled={isRetrying} onClick={onRetry}>
          {isRetrying ? "Retrying…" : "Retry this step"}
        </Button>
      </div>
    </Modal>
  );
}
