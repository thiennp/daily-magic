import { buildWsTestSendDisabledState } from "@/features/agent/utils/buildWsTestSendDisabledState";
import type useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import type { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import type { useWsTestComposerWorkflowState } from "@/features/agent/hooks/useWsTestComposerWorkflowState";

export const buildWsTestComposerDispatchState = (input: {
  readonly selection: ReturnType<typeof useTeamDispatchSelection>;
  readonly macSelection: ReturnType<typeof useMacDeviceSelection>;
  readonly workflow: ReturnType<typeof useWsTestComposerWorkflowState>;
  readonly isTeamDispatch: boolean;
}): {
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
  readonly isSendDisabled: (
    connectionStatus: string,
    deviceId?: string,
  ) => boolean;
} => {
  const resolveSelectedDeviceIsOnline = (deviceId: string): boolean => {
    if (deviceId.length === 0) {
      return input.macSelection.hasOnlineMac;
    }

    return (
      input.macSelection.devices.find((device) => device.id === deviceId)
        ?.isOnline ?? false
    );
  };

  return {
    macDevices: input.macSelection.devices,
    macDisplayNameById: input.macSelection.displayNameById,
    selectedDeviceId: input.macSelection.selectedDeviceId,
    setSelectedDeviceId: input.macSelection.setSelectedDeviceId,
    isMacDevicesLoading: input.macSelection.isLoading,
    hasOnlineMac: input.macSelection.hasOnlineMac,
    onlineMacCount: input.macSelection.onlineCount,
    selectedDeviceIsOnline: resolveSelectedDeviceIsOnline(
      input.macSelection.selectedDeviceId,
    ),
    devicesHadLoadError: input.macSelection.devicesHadLoadError,
    refreshMacDevices: input.macSelection.refreshDevices,
    renameMacDevice: input.macSelection.renameDevice,
    isSendDisabled: (connectionStatus: string, deviceId?: string) =>
      buildWsTestSendDisabledState({
        connectionStatus,
        isWorkflowTask: input.workflow.isWorkflowTask,
        workflowValidationErrors: input.workflow.workflowValidationErrors,
        prompt: input.workflow.prompt,
        resolvedPrompt: input.workflow.resolvedPrompt,
        selectedGroupId: input.selection.selectedGroupId,
        selectedTargetUserId: input.selection.selectedTargetUserId,
        isTeamDispatch: input.isTeamDispatch,
        selectedCapabilityId: input.selection.selectedCapabilityId,
        isLibraryPlaybook: input.workflow.isLibraryPlaybook,
        hasOnlineMac: input.isTeamDispatch
          ? true
          : input.macSelection.hasOnlineMac,
        selectedDeviceIsOnline: input.isTeamDispatch
          ? true
          : resolveSelectedDeviceIsOnline(
              deviceId ?? input.macSelection.selectedDeviceId,
            ),
      }),
  };
};
