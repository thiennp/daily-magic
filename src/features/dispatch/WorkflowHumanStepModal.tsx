"use client";

import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import WorkflowHumanStepModalFooter from "@/features/dispatch/WorkflowHumanStepModalFooter";
import WorkflowHumanStepPriorOutput from "@/features/dispatch/WorkflowHumanStepPriorOutput";
import WorkflowRunStepProgress from "@/features/dispatch/WorkflowRunStepProgress";
import WorkflowRunStepTimelineBlock from "@/features/dispatch/WorkflowRunStepTimelineBlock";
import type { WorkflowHumanStepRequest } from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";

interface WorkflowHumanStepModalProps {
  readonly request: WorkflowHumanStepRequest;
  readonly isSubmitting: boolean;
  readonly submitError: string | null;
  readonly onSubmit: (response: string) => void;
  readonly onSkip: () => void;
  readonly onDismiss: () => void;
}

export default function WorkflowHumanStepModal({
  request,
  isSubmitting,
  submitError,
  onSubmit,
  onSkip,
  onDismiss,
}: WorkflowHumanStepModalProps) {
  const [response, setResponse] = useState("");
  const trimmedResponse = response.trim();
  const canSubmit = trimmedResponse.length > 0 && !isSubmitting;

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
      <h2 className="mt-1 text-xl font-semibold text-awc-fg dark:text-white">
        {request.title}
      </h2>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        Your assistant paused here so you can review or answer. You can close
        this and come back anytime — we will keep your place.
      </p>
      <WorkflowRunStepProgress
        stepIndex={request.stepIndex}
        totalSteps={request.totalSteps}
      />
      <WorkflowRunStepTimelineBlock
        workflowRunId={request.workflowRunId}
        highlightStepIndex={request.stepIndex}
      />
      <div className="mt-5 rounded-xl border border-awc-border bg-white p-4 dark:border-gray-700 dark:bg-gray-900/30">
        <p className="text-sm font-medium text-awc-fg dark:text-white">
          What to do
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-awc-fg dark:text-gray-300">
          {request.instructions}
        </p>
      </div>
      {request.priorAgentOutputPreview !== undefined ? (
        <WorkflowHumanStepPriorOutput
          outputPreview={request.priorAgentOutputPreview}
        />
      ) : null}
      <label className="mt-5 block text-sm font-medium text-awc-fg dark:text-white">
        Your reply
        <textarea
          value={response}
          onChange={(event) => {
            setResponse(event.target.value);
          }}
          rows={4}
          placeholder="Type your answer here…"
          className="mt-2 w-full rounded-xl border border-awc-border px-3 py-2.5 text-sm text-awc-fg shadow-sm focus:border-awc-blue-300 focus:outline-none focus:ring-2 focus:ring-awc-blue-600/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </label>
      {submitError !== null ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {submitError}
        </p>
      ) : null}
      <WorkflowHumanStepModalFooter
        isSubmitting={isSubmitting}
        canSubmit={canSubmit}
        allowSkip={request.allowSkip === true}
        onSubmit={() => {
          onSubmit(trimmedResponse);
        }}
        onSkip={onSkip}
        onDismiss={onDismiss}
      />
    </Modal>
  );
}
