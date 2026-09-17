"use client";

import { useCallback, useSyncExternalStore, useState } from "react";

import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
import { postWorkflowHumanStepComplete } from "@/features/agent/utils/postWorkflowHumanStepComplete";
import { parseWorkflowHumanStepSocketMessage } from "@/features/dispatch/utils/workflowHumanStepSocket";
import {
  getWorkflowHumanStepPendingSnapshot,
  setWorkflowHumanStepPending,
  subscribeWorkflowHumanStepPending,
} from "@/features/dispatch/utils/workflowHumanStepPendingStore";
import type { WorkflowHumanStepRequest } from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";

export function useWorkflowHumanStepListener(): {
  readonly pendingHumanStep: WorkflowHumanStepRequest | null;
  readonly isSubmitting: boolean;
  readonly submitError: string | null;
  readonly respondToHumanStep: (response: string) => Promise<void>;
  readonly dismissHumanStep: () => void;
} {
  const pendingHumanStep = useSyncExternalStore(
    subscribeWorkflowHumanStepPending,
    getWorkflowHumanStepPendingSnapshot,
    () => null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleDashboardMessage = useCallback((raw: string) => {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("type" in parsed)
      ) {
        return;
      }

      parseWorkflowHumanStepSocketMessage(
        parsed as Record<string, unknown>,
        setWorkflowHumanStepPending,
      );
    } catch {
      return;
    }
  }, []);

  useAgentWitchDashboardSubscription(handleDashboardMessage);

  const respondToHumanStep = useCallback(
    async (response: string) => {
      const trimmedResponse = response.trim();
      if (pendingHumanStep === null || trimmedResponse.length === 0) {
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      const result = await postWorkflowHumanStepComplete({
        workflowRunId: pendingHumanStep.workflowRunId,
        stepRunId: pendingHumanStep.stepRunId,
        response: trimmedResponse,
      });

      setIsSubmitting(false);

      if (!result.ok) {
        setSubmitError(result.errorMessage ?? "Could not submit your answer.");
        return;
      }

      setSubmitError(null);
    },
    [pendingHumanStep],
  );

  const dismissHumanStep = useCallback(() => {
    setWorkflowHumanStepPending(null);
    setSubmitError(null);
  }, []);

  return {
    pendingHumanStep,
    isSubmitting,
    submitError,
    respondToHumanStep,
    dismissHumanStep,
  };
}
