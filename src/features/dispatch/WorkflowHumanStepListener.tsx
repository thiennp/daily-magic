"use client";

import WorkflowHumanStepModal from "@/features/dispatch/WorkflowHumanStepModal";
import WorkflowStepFailureModal from "@/features/dispatch/WorkflowStepFailureModal";
import { useWorkflowHumanStepListener } from "@/features/dispatch/hooks/useWorkflowHumanStepListener";
import { useWorkflowStepFailureListener } from "@/features/dispatch/hooks/useWorkflowStepFailureListener";

export default function WorkflowHumanStepListener() {
  const {
    pendingHumanStep,
    isSubmitting,
    submitError,
    respondToHumanStep,
    skipHumanStep,
    dismissHumanStep,
  } = useWorkflowHumanStepListener();
  const {
    pendingFailure,
    isRetrying,
    retryError,
    retryFailedStep,
    dismissFailure,
  } = useWorkflowStepFailureListener();

  if (pendingFailure !== null) {
    return (
      <WorkflowStepFailureModal
        request={pendingFailure}
        isRetrying={isRetrying}
        retryError={retryError}
        onRetry={() => {
          void retryFailedStep();
        }}
        onDismiss={dismissFailure}
      />
    );
  }

  if (pendingHumanStep === null) {
    return null;
  }

  return (
    <WorkflowHumanStepModal
      request={pendingHumanStep}
      isSubmitting={isSubmitting}
      submitError={submitError}
      onSubmit={(response) => {
        void respondToHumanStep(response);
      }}
      onSkip={() => {
        void skipHumanStep();
      }}
      onDismiss={dismissHumanStep}
    />
  );
}
