"use client";

import { useSelectedDispatchCapability } from "@/features/dispatch/hooks/useSelectedDispatchCapability";
import { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import { useAgentComposerPrefill } from "@/features/agent/hooks/useAgentComposerPrefill";
import useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import { useWsTestComposerWorkflowState } from "@/features/agent/hooks/useWsTestComposerWorkflowState";
import { buildWsTestComposerDispatchState } from "@/features/agent/utils/buildWsTestComposerDispatchState";
import { createWsTestSelectionHandlers } from "@/features/agent/utils/createWsTestSelectionHandlers";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export function useWsTestTaskComposer(): {
  readonly prompt: string;
  readonly setPrompt: (value: string) => void;
  readonly workflowFieldValues: Readonly<Record<string, string>>;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly selectedCapabilityId: string;
  readonly setSelectedGroupId: (value: string) => void;
  readonly setSelectedTargetUserId: (value: string) => void;
  readonly setSelectedCapabilityId: (value: string) => void;
  readonly isTeamDispatch: boolean;
  readonly isWorkflowTask: boolean;
  readonly isLibraryPlaybook: boolean;
  readonly libraryCapabilityId: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowValidationErrors: readonly string[];
  readonly resolvedPrompt: string;
  readonly isSendDisabled: (connectionStatus: string) => boolean;
  readonly onWorkflowFieldChange: (key: string, value: string) => void;
  readonly resetComposer: () => void;
  readonly isPrefillLoading: boolean;
  readonly macDevices: ReturnType<typeof useMacDeviceSelection>["devices"];
  readonly macDisplayNameById: ReturnType<
    typeof useMacDeviceSelection
  >["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isMacDevicesLoading: boolean;
  readonly hasOnlineMac: boolean;
  readonly onlineMacCount: number;
  readonly selectedDeviceIsOnline: boolean;
  readonly devicesHadLoadError: boolean;
  readonly refreshMacDevices: () => Promise<void>;
  readonly renameMacDevice: ReturnType<
    typeof useMacDeviceSelection
  >["renameDevice"];
} {
  const prefill = useAgentComposerPrefill();
  const selection = useTeamDispatchSelection();
  const macSelection = useMacDeviceSelection();
  const selectedCapability = useSelectedDispatchCapability(
    selection.selectedGroupId,
    selection.selectedTargetUserId,
    selection.selectedCapabilityId,
  );
  const workflow = useWsTestComposerWorkflowState(
    selectedCapability,
    prefill.libraryPlaybook,
    prefill.rerunPrompt,
  );
  const isTeamDispatch =
    !workflow.isLibraryPlaybook &&
    selection.selectedGroupId.length > 0 &&
    selection.selectedTargetUserId.length > 0;
  const clearWorkflowFields = () => {
    workflow.setWorkflowFieldValues({});
  };
  const dispatchState = buildWsTestComposerDispatchState({
    selection,
    macSelection,
    workflow,
    isTeamDispatch,
  });
  const selectionHandlers = createWsTestSelectionHandlers(
    selection,
    clearWorkflowFields,
  );

  return {
    prompt: workflow.prompt,
    setPrompt: workflow.setPrompt,
    workflowFieldValues: workflow.workflowFieldValues,
    selectedGroupId: selection.selectedGroupId,
    selectedTargetUserId: selection.selectedTargetUserId,
    selectedCapabilityId: selection.selectedCapabilityId,
    ...selectionHandlers,
    isTeamDispatch,
    isWorkflowTask: workflow.isWorkflowTask,
    isLibraryPlaybook: workflow.isLibraryPlaybook,
    libraryCapabilityId: workflow.libraryCapabilityId,
    workflowFields: workflow.workflowFields,
    workflowValidationErrors: workflow.workflowValidationErrors,
    resolvedPrompt: workflow.resolvedPrompt,
    isPrefillLoading: prefill.isLoading,
    ...dispatchState,
    onWorkflowFieldChange: (key: string, value: string) => {
      workflow.setWorkflowFieldValues((current) => ({
        ...current,
        [key]: value,
      }));
    },
    resetComposer: () => {
      workflow.setPrompt("");
      clearWorkflowFields();
    },
  };
}
