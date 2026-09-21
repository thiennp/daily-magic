import type useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import type { WorkflowTrialRunEligibility } from "@/lib/dispatch/resolveWorkflowTrialRunEligibility";

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
  readonly hasRememberedMacSelection: boolean;
  readonly isWorkflowTask: boolean;
  readonly isLibraryPlaybook: boolean;
  readonly isWorkflowCreateDraft: boolean;
  readonly workflowTrialRunEligibility: WorkflowTrialRunEligibility;
  readonly libraryCapabilityId: string;
  readonly harnessSetSlug: string | null;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly composerWorkflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowValidationErrors: readonly string[];
  readonly workflowFieldErrors: Readonly<Record<string, string>>;
  readonly operatorSteps: readonly OperatorStepDefinition[];
  readonly resolvedPrompt: string;
  readonly registerUploadExcerpt: (uploadId: string, excerpt: string) => void;
  readonly isSendDisabled: (
    connectionStatus: string,
    deviceId?: string,
  ) => boolean;
  readonly onWorkflowFieldChange: (key: string, value: string) => void;
  readonly resetComposer: () => void;
  readonly isPrefillLoading: boolean;
  readonly libraryCapabilities: readonly PublishedCapabilityRecord[];
  readonly removeLibraryCapability: (capabilityId: string) => void;
  readonly selectedLibraryCapabilityId: string;
  readonly setSelectedLibraryCapabilityId: (capabilityId: string) => void;
  readonly requiresProjectSelection: boolean;
  readonly projects: readonly UserProjectRecord[];
  readonly isProjectsLoading: boolean;
  readonly selectedProjectId: string;
  readonly selectedProject: UserProjectRecord | null;
  readonly setSelectedProjectId: (projectId: string) => void;
  readonly clearSelectedProject: () => void;
  readonly addSavedProject: (project: UserProjectRecord) => void;
  readonly removeSavedProject: (projectId: string) => void;
  readonly macDevices: ReturnType<typeof useMacDeviceSelection>["devices"];
  readonly macDisplayNameById: ReturnType<
    typeof useMacDeviceSelection
  >["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isMacDevicesLoading: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly hasCursorCloudConnection: boolean;
  readonly dispatchReadyMacCount: number;
  readonly selectedDeviceCanDispatch: boolean;
  readonly devicesHadLoadError: boolean;
  readonly serverInstallBundleVersion: string | null;
  readonly refreshMacDevices: () => Promise<void>;
  readonly renameMacDevice: ReturnType<
    typeof useMacDeviceSelection
  >["renameDevice"];
  readonly runScopedComponentIds: readonly string[];
  readonly toggleRunScopedComponentId: (componentId: string) => void;
  readonly clearRunScopedComponentIds: () => void;
}
