"use client";

import WorkflowHumanStepModal from "@/features/dispatch/WorkflowHumanStepModal";
import { useWorkflowHumanStepListener } from "@/features/dispatch/hooks/useWorkflowHumanStepListener";

export default function WorkflowHumanStepListener() {
  const {
    pendingHumanStep,
    isSubmitting,
    submitError,
    respondToHumanStep,
    dismissHumanStep,
  } = useWorkflowHumanStepListener();

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
      onDismiss={dismissHumanStep}
    />
  );
}
