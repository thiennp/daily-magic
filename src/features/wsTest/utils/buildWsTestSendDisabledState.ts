import { isWsTestSendDisabled } from "@/features/wsTest/utils/isWsTestSendDisabled";

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
  readonly hasOnlineMac: boolean;
  readonly selectedDeviceIsOnline: boolean;
}): boolean => isWsTestSendDisabled(input);
