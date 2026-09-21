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
  readonly skipHumanStep: () => Promise<void>;
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

  const submitHumanStep = useCallback(
    async (response: string, skipped: boolean) => {
      if (pendingHumanStep === null) {
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      const result = await postWorkflowHumanStepComplete({
        workflowRunId: pendingHumanStep.workflowRunId,
        stepRunId: pendingHumanStep.stepRunId,
        response,
        ...(skipped ? { skipped: true } : {}),
      });

      setIsSubmitting(false);
      setSubmitError(
        result.ok
          ? null
          : (result.errorMessage ?? "Could not submit your answer."),
      );
    },
    [pendingHumanStep],
  );

  const respondToHumanStep = useCallback(
    async (response: string) => {
      const trimmedResponse = response.trim();
      if (trimmedResponse.length === 0) {
        return;
      }
      await submitHumanStep(trimmedResponse, false);
    },
    [submitHumanStep],
  );

  const skipHumanStep = useCallback(async () => {
    if (pendingHumanStep?.allowSkip !== true) {
      return;
    }
    await submitHumanStep("", true);
  }, [pendingHumanStep, submitHumanStep]);

  const dismissHumanStep = useCallback(() => {
    setWorkflowHumanStepPending(null);
    setSubmitError(null);
  }, []);

  return {
    pendingHumanStep,
    isSubmitting,
    submitError,
    respondToHumanStep,
    skipHumanStep,
    dismissHumanStep,
  };
}
