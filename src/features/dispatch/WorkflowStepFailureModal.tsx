"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { formatWorkflowStepFriendlyError } from "@/features/dispatch/utils/formatWorkflowStepFriendlyError";
import WorkflowRunStepProgress from "@/features/dispatch/WorkflowRunStepProgress";
import WorkflowRunStepTimelineBlock from "@/features/dispatch/WorkflowRunStepTimelineBlock";
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
  const friendly = formatWorkflowStepFriendlyError(request.errorMessage);

  return (
    <Modal
      isOpen
      onClose={onDismiss}
      showCloseButton
      className="max-w-lg p-6 sm:p-8"
    >
      {request.workflowLabel !== undefined ? (
        <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
          {request.workflowLabel}
        </p>
      ) : null}
      <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Step &ldquo;{request.title}&rdquo; did not finish. Nothing you already
        did was lost — trying again picks up from this step.
      </p>
      <WorkflowRunStepProgress stepIndex={request.stepIndex} />
      <WorkflowRunStepTimelineBlock
        workflowRunId={request.workflowRunId}
        highlightStepIndex={request.stepIndex}
        isWorking={isRetrying}
      />
      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
        {friendly.headline}
      </p>
      {friendly.detail !== null ? (
        <details className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">
            Technical details
          </summary>
          <p className="mt-2 whitespace-pre-wrap">{friendly.detail}</p>
        </details>
      ) : null}
      {retryError !== null ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {retryError}
        </p>
      ) : null}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onDismiss}
          disabled={isRetrying}
          className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Not now
        </button>
        <Button
          className="w-full sm:w-auto"
          disabled={isRetrying}
          onClick={onRetry}
        >
          {isRetrying ? "Trying again…" : "Try again"}
        </Button>
      </div>
    </Modal>
  );
}
