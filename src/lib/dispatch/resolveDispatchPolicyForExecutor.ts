import { resolveEffectiveDispatchPolicy } from "@/lib/dispatch/resolveEffectiveDispatchPolicy";
import {
  getActiveDeviceIdForUser,
  getDeviceDispatchPolicy,
} from "@/lib/dispatch/deviceDispatchPolicyQueries";
import {
  getGroupDispatchPolicy,
  getUserAgentDispatchPolicy,
} from "@/lib/dispatch/groupUserDispatchPolicyQueries";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";

export interface ResolveDispatchPolicyInput {
  readonly executorUserId: string;
  readonly groupId?: string | null;
  readonly capabilityPolicyOverride?: DispatchPolicyValue | null;
  /** The computer the run goes to; without it the executor's most recently seen one is used. */
  readonly deviceId?: string | null;
}

export const resolveDispatchPolicyForExecutor = async (
  input: ResolveDispatchPolicyInput,
): Promise<DispatchPolicyValue> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return DispatchPolicy.OPEN;
  }

  if (input.capabilityPolicyOverride) {
    return input.capabilityPolicyOverride;
  }

  const deviceId =
    input.deviceId ?? (await getActiveDeviceIdForUser(input.executorUserId));
  const devicePolicy =
    deviceId !== null ? await getDeviceDispatchPolicy(deviceId) : null;
  const userPolicy = await getUserAgentDispatchPolicy(input.executorUserId);
  const groupPolicy =
    input.groupId !== undefined && input.groupId !== null
      ? await getGroupDispatchPolicy(input.groupId)
      : null;

  return resolveEffectiveDispatchPolicy({
    devicePolicy,
    userPolicy,
    groupPolicy,
  });
};
