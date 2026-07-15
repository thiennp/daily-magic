"use client";

import { useSearchParams } from "next/navigation";

import type { UseWsTestTaskComposerResult } from "@/features/agent/hooks/types/UseWsTestTaskComposerResult.type";
import { useLibraryPlaybookSelection } from "@/features/agent/hooks/useLibraryPlaybookSelection";
import { useSelectedDispatchCapability } from "@/features/dispatch/hooks/useSelectedDispatchCapability";
import { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import { useWsTestComposerWorkflowState } from "@/features/agent/hooks/useWsTestComposerWorkflowState";
import { buildLibraryCapabilitySelectionUpdate } from "@/features/agent/utils/buildLibraryCapabilitySelectionUpdate";
import { buildWsTestComposerDispatchState } from "@/features/agent/utils/buildWsTestComposerDispatchState";
import { buildWsTestTaskComposerResult } from "@/features/agent/utils/buildWsTestTaskComposerResult";
import { createWsTestSelectionHandlers } from "@/features/agent/utils/createWsTestSelectionHandlers";

export function useWsTestTaskComposer(): UseWsTestTaskComposerResult {
  const searchParams = useSearchParams();
  const urlCapabilityId = searchParams.get("libraryCapabilityId") ?? "";
  const librarySelection = useLibraryPlaybookSelection();
  const selection = useTeamDispatchSelection();
  const macSelection = useMacDeviceSelection();
  const selectedCapability = useSelectedDispatchCapability(
    selection.selectedGroupId,
    selection.selectedTargetUserId,
    selection.selectedCapabilityId,
  );
  const workflow = useWsTestComposerWorkflowState(
    selectedCapability,
    librarySelection.libraryPlaybook,
    librarySelection.rerunPrompt,
  );
  const isTeamDispatch =
    !workflow.isLibraryPlaybook &&
    selection.selectedGroupId.length > 0 &&
    selection.selectedTargetUserId.length > 0;
  const clearWorkflowFields = () => {
    workflow.setWorkflowFieldValues({});
  };

  return buildWsTestTaskComposerResult({
    workflow,
    selection,
    selectionHandlers: createWsTestSelectionHandlers(
      selection,
      clearWorkflowFields,
    ),
    librarySelection,
    dispatchState: buildWsTestComposerDispatchState({
      selection,
      macSelection,
      workflow,
      isTeamDispatch,
    }),
    isTeamDispatch,
    clearWorkflowFields,
    selectLibraryCapability: (capabilityId: string) => {
      librarySelection.setSelectedLibraryCapabilityId(capabilityId);
      const { nextPrompt } = buildLibraryCapabilitySelectionUpdate({
        capabilityId,
        libraryCapabilities: librarySelection.libraryCapabilities,
        rerunPrompt: librarySelection.rerunPrompt,
        urlCapabilityId,
        fallbackPrompt: "",
      });
      workflow.setPrompt(nextPrompt);
      clearWorkflowFields();
    },
  });
}
