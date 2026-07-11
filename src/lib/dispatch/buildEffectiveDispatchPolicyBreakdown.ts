import {
  DEFAULT_DISPATCH_POLICY,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";
import type { DispatchPolicyLevels } from "@/lib/dispatch/resolveEffectiveDispatchPolicy";

export type DispatchPolicyWinningSource =
  "device" | "user" | "group" | "default";

export interface EffectiveDispatchPolicyBreakdown {
  readonly effective: DispatchPolicyValue;
  readonly winningSource: DispatchPolicyWinningSource;
  readonly devicePolicy: DispatchPolicyValue | null;
  readonly userPolicy: DispatchPolicyValue | null;
  readonly groupPolicy: DispatchPolicyValue | null;
  readonly defaultPolicy: DispatchPolicyValue;
}

export const buildEffectiveDispatchPolicyBreakdown = (
  levels: DispatchPolicyLevels,
): EffectiveDispatchPolicyBreakdown => {
  const devicePolicy = levels.devicePolicy ?? null;
  const userPolicy = levels.userPolicy ?? null;
  const groupPolicy = levels.groupPolicy ?? null;
  const base = {
    devicePolicy,
    userPolicy,
    groupPolicy,
    defaultPolicy: DEFAULT_DISPATCH_POLICY,
  };

  if (devicePolicy !== null) {
    return { ...base, effective: devicePolicy, winningSource: "device" };
  }

  if (userPolicy !== null) {
    return { ...base, effective: userPolicy, winningSource: "user" };
  }

  if (groupPolicy !== null) {
    return { ...base, effective: groupPolicy, winningSource: "group" };
  }

  return {
    ...base,
    effective: DEFAULT_DISPATCH_POLICY,
    winningSource: "default",
  };
};
