"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
import { postWorkflowRunStepRetry } from "@/features/agent/utils/postWorkflowRunStepRetry";
import { parseWorkflowStepFailedSocketMessage } from "@/features/dispatch/utils/workflowHumanStepSocket";
import { snoozeWorkflowFailureAttention } from "@/features/dispatch/utils/workflowAttentionSnoozeStore";
import {
  getWorkflowStepFailurePendingSnapshot,
  setWorkflowStepFailurePending,
  subscribeWorkflowStepFailurePending,
} from "@/features/dispatch/utils/workflowStepFailurePendingStore";
import type { WorkflowStepFailureRequest } from "@/lib/workflowOrchestration/types/WorkflowStepFailurePayload.type";

export function useWorkflowStepFailureListener(): {
  readonly pendingFailure: WorkflowStepFailureRequest | null;
  readonly isRetrying: boolean;
  readonly retryError: string | null;
  readonly retryFailedStep: () => Promise<void>;
  readonly dismissFailure: () => void;
} {
  const pendingFailure = useSyncExternalStore(
    subscribeWorkflowStepFailurePending,
    getWorkflowStepFailurePendingSnapshot,
    () => null,
  );
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  const handleDashboardMessage = useCallback((raw: string) => {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null) {
        return;
      }
      parseWorkflowStepFailedSocketMessage(
        parsed as Record<string, unknown>,
        setWorkflowStepFailurePending,
      );
    } catch {
      return;
    }
  }, []);

  useAgentWitchDashboardSubscription(handleDashboardMessage);

  const retryFailedStep = useCallback(async () => {
    if (pendingFailure === null) {
      return;
    }

    setIsRetrying(true);
    setRetryError(null);

    const result = await postWorkflowRunStepRetry({
      workflowRunId: pendingFailure.workflowRunId,
    });

    setIsRetrying(false);

    if (!result.ok) {
      setRetryError(
        result.errorMessage ?? "Could not try again. Check your Mac.",
      );
      return;
    }

    setWorkflowStepFailurePending(null);
  }, [pendingFailure]);

  const dismissFailure = useCallback(() => {
    if (pendingFailure !== null) {
      snoozeWorkflowFailureAttention(pendingFailure);
    }
    setWorkflowStepFailurePending(null);
    setRetryError(null);
  }, [pendingFailure]);

  return {
    pendingFailure,
    isRetrying,
    retryError,
    retryFailedStep,
    dismissFailure,
  };
}
