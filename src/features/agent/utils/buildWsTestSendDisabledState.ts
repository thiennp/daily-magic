import { isWsTestSendDisabled } from "@/features/agent/utils/isWsTestSendDisabled";

export const buildWsTestSendDisabledState = (input: {
  readonly connectionStatus: string;
  readonly isWorkflowTask: boolean;
  readonly workflowValidationErrors: readonly string[];
  readonly prompt: string;
  readonly resolvedPrompt: string;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly isTeamDispatch: boolean;
  readonly selectedCapabilityId: string;
  readonly isLibraryPlaybook: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly selectedDeviceCanDispatch: boolean;
}): boolean => isWsTestSendDisabled(input);
