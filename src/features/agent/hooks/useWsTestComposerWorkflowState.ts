"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import type { DispatchTargetCapability } from "@/features/dispatch/hooks/useDispatchTargets";
import {
  buildWorkflowPrompt,
  validateWorkflowFieldValues,
} from "@/lib/workflows/buildWorkflowPrompt";
import { appendOperatorCheckpointsToPrompt } from "@/lib/workflows/buildOperatorCheckpointPromptSection";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export function useWsTestComposerWorkflowState(
  selectedCapability: DispatchTargetCapability | null,
  libraryPlaybook: LibraryPlaybookTemplate | null,
  rerunPrompt: string,
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
  readonly operatorSteps: readonly OperatorStepDefinition[];
  readonly resolvedPrompt: string;
  readonly isLibraryPlaybook: boolean;
  readonly libraryCapabilityId: string;
} {
  const initialPrompt =
    rerunPrompt.length > 0
      ? rerunPrompt
      : libraryPlaybook?.type === CapabilityType.AGENT
        ? libraryPlaybook.exampleRequest
        : "";
  const [prompt, setPrompt] = useState(initialPrompt);
  const [workflowFieldValues, setWorkflowFieldValues] = useState<
    Record<string, string>
  >({});
  const isLibraryPlaybook = libraryPlaybook !== null;
  const playbookName = libraryPlaybook?.name ?? selectedCapability?.name ?? "";
  const playbookType =
    libraryPlaybook?.type ?? selectedCapability?.type ?? CapabilityType.AGENT;
  const isWorkflowTask = playbookType === CapabilityType.WORKFLOW;
  const workflowFields = useMemo(
    () =>
      libraryPlaybook?.workflowFields ??
      selectedCapability?.workflowFields ??
      [],
    [libraryPlaybook?.workflowFields, selectedCapability?.workflowFields],
  );
  const operatorSteps = useMemo(
    () =>
      libraryPlaybook?.operatorSteps ?? selectedCapability?.operatorSteps ?? [],
    [libraryPlaybook?.operatorSteps, selectedCapability?.operatorSteps],
  );
  const workflowValidationErrors = isWorkflowTask
    ? validateWorkflowFieldValues(workflowFields, workflowFieldValues)
    : [];
  const resolvedPrompt = useMemo(
    () =>
      isWorkflowTask && playbookName.length > 0
        ? buildWorkflowPrompt(
            playbookName,
            workflowFields,
            workflowFieldValues,
            prompt,
            operatorSteps,
          )
        : appendOperatorCheckpointsToPrompt(prompt, operatorSteps),
    [
      isWorkflowTask,
      playbookName,
      workflowFields,
      workflowFieldValues,
      prompt,
      operatorSteps,
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
    operatorSteps,
    resolvedPrompt,
    isLibraryPlaybook,
    libraryCapabilityId: libraryPlaybook?.id ?? "",
  };
}
