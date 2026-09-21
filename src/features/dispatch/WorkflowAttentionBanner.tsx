"use client";

import { useSyncExternalStore } from "react";

import Button from "@/components/ui/button/Button";
import {
  clearSnoozedWorkflowFailureAttention,
  clearSnoozedWorkflowHumanAttention,
  getWorkflowAttentionSnoozeSnapshot,
  subscribeWorkflowAttentionSnooze,
} from "@/features/dispatch/utils/workflowAttentionSnoozeStore";
import {
  getWorkflowHumanStepPendingSnapshot,
  setWorkflowHumanStepPending,
  subscribeWorkflowHumanStepPending,
} from "@/features/dispatch/utils/workflowHumanStepPendingStore";
import {
  getWorkflowStepFailurePendingSnapshot,
  setWorkflowStepFailurePending,
  subscribeWorkflowStepFailurePending,
} from "@/features/dispatch/utils/workflowStepFailurePendingStore";

export default function WorkflowAttentionBanner() {
  const snooze = useSyncExternalStore(
    subscribeWorkflowAttentionSnooze,
    getWorkflowAttentionSnoozeSnapshot,
    () => ({ human: null, failure: null }),
  );
  const pendingHuman = useSyncExternalStore(
    subscribeWorkflowHumanStepPending,
    getWorkflowHumanStepPendingSnapshot,
    () => null,
  );
  const pendingFailure = useSyncExternalStore(
    subscribeWorkflowStepFailurePending,
    getWorkflowStepFailurePendingSnapshot,
    () => null,
  );

  if (pendingFailure !== null || pendingHuman !== null) {
    return null;
  }

  const snoozedFailure = snooze.failure;
  if (snoozedFailure !== null) {
    const label = snoozedFailure.workflowLabel ?? "Your workflow";
    return (
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-500/30 dark:bg-amber-500/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-amber-950 dark:text-amber-100">
            <span className="font-medium">{label}</span> hit a snag on step{" "}
            {snoozedFailure.stepIndex + 1}. Your progress is saved.
          </p>
          <Button
            size="sm"
            onClick={() => {
              setWorkflowStepFailurePending(snoozedFailure);
              clearSnoozedWorkflowFailureAttention();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const snoozedHuman = snooze.human;
  if (snoozedHuman !== null) {
    const label = snoozedHuman.workflowLabel ?? "Your workflow";
    return (
      <div className="border-b border-brand-200 bg-brand-50 px-4 py-3 dark:border-brand-500/30 dark:bg-brand-500/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-brand-950 dark:text-brand-100">
            <span className="font-medium">{label}</span> is waiting for your
            reply.
          </p>
          <Button
            size="sm"
            onClick={() => {
              setWorkflowHumanStepPending(snoozedHuman);
              clearSnoozedWorkflowHumanAttention();
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
