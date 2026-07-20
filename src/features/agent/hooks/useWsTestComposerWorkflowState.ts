"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import type { DispatchTargetCapability } from "@/features/dispatch/hooks/useDispatchTargets";
import { useComposerResolvedPrompt } from "@/features/agent/hooks/useComposerResolvedPrompt";
import { useEffectiveWorkflowFieldValues } from "@/features/agent/hooks/useEffectiveWorkflowFieldValues";
import { resolveComposerPlaybookContext } from "@/features/agent/utils/resolveComposerPlaybookContext";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { filterNonProjectWorkflowFields } from "@/lib/workflows/workflowProjectFields";

export function useWsTestComposerWorkflowState(
  selectedCapability: DispatchTargetCapability | null,
  libraryPlaybook: LibraryPlaybookTemplate | null,
  rerunPrompt: string,
  projectFolderPath: string | null = null,
): {
  readonly prompt: string;
  readonly setPrompt: (value: string) => void;
  readonly workflowFieldValues: Readonly<Record<string, string>>;
  readonly setWorkflowFieldValues: Dispatch<
    SetStateAction<Record<string, string>>
  >;
  readonly isWorkflowTask: boolean;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly composerWorkflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowValidationErrors: readonly string[];
  readonly workflowFieldErrors: Readonly<Record<string, string>>;
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
  const { playbookName, isWorkflowTask } = resolveComposerPlaybookContext(
    selectedCapability,
    libraryPlaybook,
  );
  const workflowFields = useMemo(
    () =>
      libraryPlaybook?.workflowFields ??
      selectedCapability?.workflowFields ??
      [],
    [libraryPlaybook?.workflowFields, selectedCapability?.workflowFields],
  );
  const composerWorkflowFields = useMemo(
    () => filterNonProjectWorkflowFields(workflowFields),
    [workflowFields],
  );
  const effectiveWorkflowFieldValues = useEffectiveWorkflowFieldValues(
    workflowFields,
    workflowFieldValues,
    projectFolderPath,
  );
  const operatorSteps = useMemo(
    () =>
      libraryPlaybook?.operatorSteps ?? selectedCapability?.operatorSteps ?? [],
    [libraryPlaybook?.operatorSteps, selectedCapability?.operatorSteps],
  );
  const { workflowFieldErrors, workflowValidationErrors, resolvedPrompt } =
    useComposerResolvedPrompt({
      isWorkflowTask,
      playbookName,
      workflowFields,
      effectiveWorkflowFieldValues,
      prompt,
      operatorSteps,
    });

  return {
    prompt,
    setPrompt,
    workflowFieldValues,
    setWorkflowFieldValues,
    isWorkflowTask,
    workflowFields,
    composerWorkflowFields,
    workflowValidationErrors,
    workflowFieldErrors,
    operatorSteps,
    resolvedPrompt,
    isLibraryPlaybook,
    libraryCapabilityId: libraryPlaybook?.id ?? "",
  };
}
