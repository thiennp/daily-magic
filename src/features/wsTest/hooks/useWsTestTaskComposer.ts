"use client";

import { useMemo, useState } from "react";

import { useSelectedDispatchCapability } from "@/features/dispatch/hooks/useSelectedDispatchCapability";
import { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import {
  buildWorkflowPrompt,
  validateWorkflowFieldValues,
} from "@/lib/workflows/buildWorkflowPrompt";
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
  const [prompt, setPrompt] = useState("");
  const [workflowFieldValues, setWorkflowFieldValues] = useState<
    Record<string, string>
  >({});
  const selection = useTeamDispatchSelection();
  const selectedCapability = useSelectedDispatchCapability(
    selection.selectedGroupId,
    selection.selectedTargetUserId,
    selection.selectedCapabilityId,
  );
  const isTeamDispatch =
    selection.selectedGroupId.length > 0 &&
    selection.selectedTargetUserId.length > 0;
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
    selectedGroupId: selection.selectedGroupId,
    selectedTargetUserId: selection.selectedTargetUserId,
    selectedCapabilityId: selection.selectedCapabilityId,
    setSelectedGroupId: (groupId: string) => {
      selection.setSelectedGroupId(groupId);
      setWorkflowFieldValues({});
    },
    setSelectedTargetUserId: (userId: string) => {
      selection.setSelectedTargetUserId(userId);
      setWorkflowFieldValues({});
    },
    setSelectedCapabilityId: (capabilityId: string) => {
      selection.setSelectedCapabilityId(capabilityId);
      setWorkflowFieldValues({});
    },
    isTeamDispatch,
    isWorkflowTask,
    workflowFields,
    workflowValidationErrors,
    resolvedPrompt,
    isSendDisabled: (connectionStatus: string) =>
      connectionStatus !== "connected" ||
      (isWorkflowTask
        ? workflowValidationErrors.length > 0
        : prompt.trim().length === 0) ||
      (selection.selectedGroupId.length > 0 &&
        selection.selectedTargetUserId.length === 0) ||
      (isTeamDispatch && selection.selectedCapabilityId.length === 0),
    onWorkflowFieldChange: (key: string, value: string) => {
      setWorkflowFieldValues((current) => ({
        ...current,
        [key]: value,
      }));
    },
    resetComposer: () => {
      setPrompt("");
      setWorkflowFieldValues({});
    },
  };
}
