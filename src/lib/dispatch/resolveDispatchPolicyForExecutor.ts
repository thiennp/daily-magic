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

export interface ResolveDispatchPolicyInput {
  readonly executorUserId: string;
  readonly groupId?: string | null;
  readonly capabilityPolicyOverride?: DispatchPolicyValue | null;
}

export const resolveDispatchPolicyForExecutor = async (
  input: ResolveDispatchPolicyInput,
): Promise<DispatchPolicyValue> => {
  if (input.capabilityPolicyOverride) {
    return input.capabilityPolicyOverride;
  }

  const deviceId = await getActiveDeviceIdForUser(input.executorUserId);
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
