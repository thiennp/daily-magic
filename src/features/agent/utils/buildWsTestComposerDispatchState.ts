import { canDispatchToMac } from "@/features/agent-witch/online-wake";
import { buildWsTestSendDisabledState } from "@/features/agent/utils/buildWsTestSendDisabledState";
import { isCursorCloudExecutorDeviceId } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import type useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import type { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";
import type { useWsTestComposerWorkflowState } from "@/features/agent/hooks/useWsTestComposerWorkflowState";

export const buildWsTestComposerDispatchState = (input: {
  readonly selection: ReturnType<typeof useTeamDispatchSelection>;
  readonly macSelection: ReturnType<typeof useMacDeviceSelection>;
  readonly workflow: ReturnType<typeof useWsTestComposerWorkflowState>;
  readonly isTeamDispatch: boolean;
  readonly hasCursorCloudConnection?: boolean;
}): {
  readonly macDevices: ReturnType<typeof useMacDeviceSelection>["devices"];
  readonly macDisplayNameById: ReturnType<
    typeof useMacDeviceSelection
  >["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isMacDevicesLoading: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly dispatchReadyMacCount: number;
  readonly selectedDeviceCanDispatch: boolean;
  readonly devicesHadLoadError: boolean;
  readonly refreshMacDevices: () => Promise<void>;
  readonly renameMacDevice: ReturnType<
    typeof useMacDeviceSelection
  >["renameDevice"];
  readonly isOwnDeviceDispatch: boolean;
  readonly hasRememberedMacSelection: boolean;
  readonly isSendDisabled: (
    connectionStatus: string,
    deviceId?: string,
  ) => boolean;
} => {
  const resolveSelectedDeviceCanDispatch = (deviceId: string): boolean => {
    if (
      isCursorCloudExecutorDeviceId(deviceId) &&
      input.hasCursorCloudConnection === true
    ) {
      return true;
    }

    if (deviceId.length === 0) {
      return (
        input.macSelection.hasDispatchReadyMac ||
        input.hasCursorCloudConnection === true
      );
    }

    const selectedDevice = input.macSelection.devices.find(
      (device) => device.id === deviceId,
    );
    return selectedDevice === undefined
      ? false
      : canDispatchToMac(selectedDevice);
  };

  return {
    macDevices: input.macSelection.devices,
    macDisplayNameById: input.macSelection.displayNameById,
    selectedDeviceId: input.macSelection.selectedDeviceId,
    setSelectedDeviceId: input.macSelection.setSelectedDeviceId,
    isMacDevicesLoading: input.macSelection.isLoading,
    hasDispatchReadyMac:
      input.macSelection.hasDispatchReadyMac ||
      input.hasCursorCloudConnection === true,
    dispatchReadyMacCount: input.macSelection.dispatchReadyMacCount,
    selectedDeviceCanDispatch: resolveSelectedDeviceCanDispatch(
      input.macSelection.selectedDeviceId,
    ),
    devicesHadLoadError: input.macSelection.devicesHadLoadError,
    refreshMacDevices: input.macSelection.refreshDevices,
    renameMacDevice: input.macSelection.renameDevice,
    isOwnDeviceDispatch: input.macSelection.isOwnDeviceDispatch,
    hasRememberedMacSelection: input.macSelection.hasRememberedMacSelection,
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
        hasDispatchReadyMac: input.isTeamDispatch
          ? true
          : input.macSelection.hasDispatchReadyMac ||
            input.hasCursorCloudConnection === true,
        selectedDeviceCanDispatch: input.isTeamDispatch
          ? true
          : resolveSelectedDeviceCanDispatch(
              deviceId ?? input.macSelection.selectedDeviceId,
            ),
      }),
  };
};
