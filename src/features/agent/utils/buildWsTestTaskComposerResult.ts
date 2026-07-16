import type { UseWsTestTaskComposerResult } from "@/features/agent/hooks/types/UseWsTestTaskComposerResult.type";
import type { buildWsTestComposerDispatchState } from "@/features/agent/utils/buildWsTestComposerDispatchState";
import type { createWsTestSelectionHandlers } from "@/features/agent/utils/createWsTestSelectionHandlers";
import type { useLibraryPlaybookSelection } from "@/features/agent/hooks/useLibraryPlaybookSelection";
import type { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import type { useWsTestComposerWorkflowState } from "@/features/agent/hooks/useWsTestComposerWorkflowState";

export const buildWsTestTaskComposerResult = (input: {
  readonly workflow: ReturnType<typeof useWsTestComposerWorkflowState>;
  readonly selection: ReturnType<typeof useTeamDispatchSelection>;
  readonly selectionHandlers: ReturnType<typeof createWsTestSelectionHandlers>;
  readonly librarySelection: ReturnType<typeof useLibraryPlaybookSelection>;
  readonly dispatchState: ReturnType<typeof buildWsTestComposerDispatchState>;
  readonly isTeamDispatch: boolean;
  readonly selectLibraryCapability: (capabilityId: string) => void;
  readonly clearWorkflowFields: () => void;
}): UseWsTestTaskComposerResult => ({
  prompt: input.workflow.prompt,
  setPrompt: input.workflow.setPrompt,
  workflowFieldValues: input.workflow.workflowFieldValues,
  selectedGroupId: input.selection.selectedGroupId,
  selectedTargetUserId: input.selection.selectedTargetUserId,
  selectedCapabilityId: input.selection.selectedCapabilityId,
  ...input.selectionHandlers,
  isTeamDispatch: input.isTeamDispatch,
  isWorkflowTask: input.workflow.isWorkflowTask,
  isLibraryPlaybook: input.workflow.isLibraryPlaybook,
  libraryCapabilityId: input.workflow.libraryCapabilityId,
  workflowFields: input.workflow.workflowFields,
  workflowValidationErrors: input.workflow.workflowValidationErrors,
  workflowFieldErrors: input.workflow.workflowFieldErrors,
  operatorSteps: input.workflow.operatorSteps,
  resolvedPrompt: input.workflow.resolvedPrompt,
  isPrefillLoading: input.librarySelection.isLoading,
  libraryCapabilities: input.librarySelection.libraryCapabilities,
  selectedLibraryCapabilityId:
    input.librarySelection.selectedLibraryCapabilityId,
  setSelectedLibraryCapabilityId: input.selectLibraryCapability,
  ...input.dispatchState,
  onWorkflowFieldChange: (key: string, value: string) => {
    input.workflow.setWorkflowFieldValues((current) => ({
      ...current,
      [key]: value,
    }));
  },
  resetComposer: () => {
    input.workflow.setPrompt("");
    input.clearWorkflowFields();
  },
});
