"use client";

import { useSelectedDispatchCapability } from "@/features/dispatch/hooks/useSelectedDispatchCapability";
import { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import { useWsTestComposerWorkflowState } from "@/features/wsTest/hooks/useWsTestComposerWorkflowState";
import { isWsTestSendDisabled } from "@/features/wsTest/utils/isWsTestSendDisabled";
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
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowValidationErrors: readonly string[];
  readonly resolvedPrompt: string;
  readonly isSendDisabled: (connectionStatus: string) => boolean;
  readonly onWorkflowFieldChange: (key: string, value: string) => void;
  readonly resetComposer: () => void;
} {
  const selection = useTeamDispatchSelection();
  const selectedCapability = useSelectedDispatchCapability(
    selection.selectedGroupId,
    selection.selectedTargetUserId,
    selection.selectedCapabilityId,
  );
  const workflow = useWsTestComposerWorkflowState(selectedCapability);
  const isTeamDispatch =
    selection.selectedGroupId.length > 0 &&
    selection.selectedTargetUserId.length > 0;
  const clearWorkflowFields = () => {
    workflow.setWorkflowFieldValues({});
  };

  return {
    prompt: workflow.prompt,
    setPrompt: workflow.setPrompt,
    workflowFieldValues: workflow.workflowFieldValues,
    selectedGroupId: selection.selectedGroupId,
    selectedTargetUserId: selection.selectedTargetUserId,
    selectedCapabilityId: selection.selectedCapabilityId,
    setSelectedGroupId: (groupId: string) => {
      selection.setSelectedGroupId(groupId);
      clearWorkflowFields();
    },
    setSelectedTargetUserId: (userId: string) => {
      selection.setSelectedTargetUserId(userId);
      clearWorkflowFields();
    },
    setSelectedCapabilityId: (capabilityId: string) => {
      selection.setSelectedCapabilityId(capabilityId);
      clearWorkflowFields();
    },
    isTeamDispatch,
    isWorkflowTask: workflow.isWorkflowTask,
    workflowFields: workflow.workflowFields,
    workflowValidationErrors: workflow.workflowValidationErrors,
    resolvedPrompt: workflow.resolvedPrompt,
    isSendDisabled: (connectionStatus: string) =>
      isWsTestSendDisabled({
        connectionStatus,
        isWorkflowTask: workflow.isWorkflowTask,
        workflowValidationErrors: workflow.workflowValidationErrors,
        prompt: workflow.prompt,
        selectedGroupId: selection.selectedGroupId,
        selectedTargetUserId: selection.selectedTargetUserId,
        isTeamDispatch,
        selectedCapabilityId: selection.selectedCapabilityId,
      }),
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
