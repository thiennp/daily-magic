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
  readonly visibleWorkflowFieldErrors: Readonly<Record<string, string>>;
  readonly promptValidationError?: string;
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
  const visibleWorkflowFieldErrors =
    input.enabled && hasAttemptedSubmit && input.composer.isWorkflowTask
      ? input.composer.workflowFieldErrors
      : {};
  const promptValidationError =
    input.enabled &&
    hasAttemptedSubmit &&
    !input.composer.isWorkflowTask &&
    submitValidationErrors.length > 0
      ? submitValidationErrors[0]
      : undefined;

  return {
    visibleWorkflowFieldErrors,
    promptValidationError,
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
