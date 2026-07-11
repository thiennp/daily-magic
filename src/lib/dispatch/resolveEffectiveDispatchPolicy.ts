import {
  DEFAULT_DISPATCH_POLICY,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

export interface DispatchPolicyLevels {
  readonly devicePolicy?: DispatchPolicyValue | null;
  readonly userPolicy?: DispatchPolicyValue | null;
  readonly groupPolicy?: DispatchPolicyValue | null;
}

export const resolveEffectiveDispatchPolicy = (
  levels: DispatchPolicyLevels,
): DispatchPolicyValue => {
  if (levels.devicePolicy !== undefined && levels.devicePolicy !== null) {
    return levels.devicePolicy;
  }

  if (levels.userPolicy !== undefined && levels.userPolicy !== null) {
    return levels.userPolicy;
  }

  if (levels.groupPolicy !== undefined && levels.groupPolicy !== null) {
    return levels.groupPolicy;
  }

  return DEFAULT_DISPATCH_POLICY;
};
