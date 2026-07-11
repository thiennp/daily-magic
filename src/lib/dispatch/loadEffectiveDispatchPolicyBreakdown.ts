import {
  buildEffectiveDispatchPolicyBreakdown,
  type EffectiveDispatchPolicyBreakdown,
} from "@/lib/dispatch/buildEffectiveDispatchPolicyBreakdown";
import { getDeviceDispatchPolicy } from "@/lib/dispatch/deviceDispatchPolicyQueries";
import {
  getGroupDispatchPolicy,
  getUserAgentDispatchPolicy,
} from "@/lib/dispatch/groupUserDispatchPolicyQueries";

export async function loadEffectiveDispatchPolicyBreakdown(input: {
  readonly executorUserId: string;
  readonly deviceId?: string | null;
  readonly groupId?: string | null;
}): Promise<EffectiveDispatchPolicyBreakdown> {
  const devicePolicy =
    input.deviceId !== undefined && input.deviceId !== null
      ? await getDeviceDispatchPolicy(input.deviceId)
      : null;
  const userPolicy = await getUserAgentDispatchPolicy(input.executorUserId);
  const groupPolicy =
    input.groupId !== undefined && input.groupId !== null
      ? await getGroupDispatchPolicy(input.groupId)
      : null;

  return buildEffectiveDispatchPolicyBreakdown({
    devicePolicy,
    userPolicy,
    groupPolicy,
  });
}
