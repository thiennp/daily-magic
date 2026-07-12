"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import type { DispatchTargetCapability } from "@/features/dispatch/hooks/useDispatchTargets";
import {
  buildWorkflowPrompt,
  validateWorkflowFieldValues,
} from "@/lib/workflows/buildWorkflowPrompt";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export function useWsTestComposerWorkflowState(
  selectedCapability: DispatchTargetCapability | null,
): {
  readonly prompt: string;
  readonly setPrompt: (value: string) => void;
  readonly workflowFieldValues: Readonly<Record<string, string>>;
  readonly setWorkflowFieldValues: Dispatch<
    SetStateAction<Record<string, string>>
  >;
  readonly isWorkflowTask: boolean;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowValidationErrors: readonly string[];
  readonly resolvedPrompt: string;
} {
  const demoPreview = useDemoPreview();
  const [prompt, setPrompt] = useState(demoPreview?.agentComposer.prompt ?? "");
  const [workflowFieldValues, setWorkflowFieldValues] = useState<
    Record<string, string>
  >({});
  const isWorkflowTask = selectedCapability?.type === "workflow";
  const workflowFields = selectedCapability?.workflowFields ?? [];
  const workflowValidationErrors = isWorkflowTask
    ? validateWorkflowFieldValues(workflowFields, workflowFieldValues)
    : [];
  const resolvedPrompt = useMemo(
    () =>
      isWorkflowTask && selectedCapability
        ? buildWorkflowPrompt(
            selectedCapability.name,
            workflowFields,
            workflowFieldValues,
            prompt,
          )
        : prompt,
    [
      isWorkflowTask,
      selectedCapability,
      workflowFields,
      workflowFieldValues,
      prompt,
    ],
  );

  return {
    prompt,
    setPrompt,
    workflowFieldValues,
    setWorkflowFieldValues,
    isWorkflowTask,
    workflowFields,
    workflowValidationErrors,
    resolvedPrompt,
  };
}
