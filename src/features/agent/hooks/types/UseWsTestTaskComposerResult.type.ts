import type useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export interface UseWsTestTaskComposerResult {
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
  readonly isOwnDeviceDispatch: boolean;
  readonly isWorkflowTask: boolean;
  readonly isLibraryPlaybook: boolean;
  readonly libraryCapabilityId: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowValidationErrors: readonly string[];
  readonly operatorSteps: readonly OperatorStepDefinition[];
  readonly resolvedPrompt: string;
  readonly isSendDisabled: (
    connectionStatus: string,
    deviceId?: string,
  ) => boolean;
  readonly onWorkflowFieldChange: (key: string, value: string) => void;
  readonly resetComposer: () => void;
  readonly isPrefillLoading: boolean;
  readonly libraryCapabilities: readonly PublishedCapabilityRecord[];
  readonly selectedLibraryCapabilityId: string;
  readonly setSelectedLibraryCapabilityId: (capabilityId: string) => void;
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
}
