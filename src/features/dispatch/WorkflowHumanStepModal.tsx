"use client";

import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import WorkflowHumanStepModalFooter from "@/features/dispatch/WorkflowHumanStepModalFooter";
import WorkflowHumanStepPriorOutput from "@/features/dispatch/WorkflowHumanStepPriorOutput";
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
      showCloseButton={false}
      className="max-w-xl p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
        {request.totalSteps !== undefined
          ? `Step ${request.stepIndex + 1} of ${request.totalSteps}`
          : `Step ${request.stepIndex + 1}`}
      </p>
      <h2 className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">
        {request.title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        This workflow paused until you complete this step. The run stays{" "}
        <span className="font-medium">running</span> in job history.
      </p>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900/40">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Instructions
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm text-gray-800 dark:text-white/90">
          {request.instructions}
        </p>
      </div>
      {request.priorAgentOutputPreview !== undefined ? (
        <WorkflowHumanStepPriorOutput
          outputPreview={request.priorAgentOutputPreview}
        />
      ) : null}
      <label className="mt-4 block text-sm text-gray-700 dark:text-gray-300">
        Your response
        <textarea
          value={response}
          onChange={(event) => {
            setResponse(event.target.value);
          }}
          rows={4}
          placeholder="Type your response…"
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      {submitError !== null ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
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
