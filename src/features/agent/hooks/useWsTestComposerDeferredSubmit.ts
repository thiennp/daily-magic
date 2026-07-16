"use client";

import { useMemo, useState } from "react";

import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { resolveWsTestComposerSubmitValidationErrors } from "@/features/agent/utils/resolveWsTestComposerSubmitValidationErrors";

export const useWsTestComposerDeferredSubmit = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly enabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
}): {
  readonly visibleValidationErrors: readonly string[];
  readonly isSendDisabled: boolean;
  readonly sendLabel: string;
  readonly handleSend: () => void;
  readonly handleClear: () => void;
} => {
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const submitValidationErrors = useMemo(
    () =>
      resolveWsTestComposerSubmitValidationErrors({
        isWorkflowTask: input.composer.isWorkflowTask,
        workflowValidationErrors: input.composer.workflowValidationErrors,
        resolvedPrompt: input.composer.resolvedPrompt,
      }),
    [
      input.composer.isWorkflowTask,
      input.composer.workflowValidationErrors,
      input.composer.resolvedPrompt,
    ],
  );
  const visibleValidationErrors =
    input.enabled && hasAttemptedSubmit ? submitValidationErrors : [];

  return {
    visibleValidationErrors,
    isSendDisabled: false,
    sendLabel: "Start",
    handleSend: () => {
      if (!input.enabled) {
        input.onSend();
        return;
      }

      const errors = resolveWsTestComposerSubmitValidationErrors({
        isWorkflowTask: input.composer.isWorkflowTask,
        workflowValidationErrors: input.composer.workflowValidationErrors,
        resolvedPrompt: input.composer.resolvedPrompt,
      });

      setHasAttemptedSubmit(true);

      if (errors.length > 0) {
        return;
      }

      input.onSend();
    },
    handleClear: () => {
      setHasAttemptedSubmit(false);
      input.onClear();
    },
  };
};
