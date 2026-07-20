import { useMemo } from "react";

import {
  buildWorkflowFieldValidationErrors,
  buildWorkflowPrompt,
} from "@/lib/workflows/buildWorkflowPrompt";
import { appendOperatorCheckpointsToPrompt } from "@/lib/workflows/buildOperatorCheckpointPromptSection";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export const useComposerResolvedPrompt = (input: {
  readonly isWorkflowTask: boolean;
  readonly playbookName: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly effectiveWorkflowFieldValues: Readonly<Record<string, string>>;
  readonly prompt: string;
  readonly operatorSteps: readonly OperatorStepDefinition[];
}): {
  readonly workflowFieldErrors: Readonly<Record<string, string>>;
  readonly workflowValidationErrors: readonly string[];
  readonly resolvedPrompt: string;
} => {
  const workflowFieldErrors = input.isWorkflowTask
    ? buildWorkflowFieldValidationErrors(
        input.workflowFields,
        input.effectiveWorkflowFieldValues,
      )
    : {};
  const workflowValidationErrors = Object.values(workflowFieldErrors);
  const resolvedPrompt = useMemo(
    () =>
      input.isWorkflowTask && input.playbookName.length > 0
        ? buildWorkflowPrompt(
            input.playbookName,
            input.workflowFields,
            input.effectiveWorkflowFieldValues,
            input.prompt,
            input.operatorSteps,
          )
        : appendOperatorCheckpointsToPrompt(input.prompt, input.operatorSteps),
    [
      input.effectiveWorkflowFieldValues,
      input.isWorkflowTask,
      input.operatorSteps,
      input.playbookName,
      input.prompt,
      input.workflowFields,
    ],
  );

  return { workflowFieldErrors, workflowValidationErrors, resolvedPrompt };
};
