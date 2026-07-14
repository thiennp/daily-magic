import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

export const shouldRequireDispatchApproval = (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly dispatchPolicy: DispatchPolicyValue;
}): boolean =>
  input.dispatchPolicy === DispatchPolicy.APPROVAL &&
  input.requesterUserId !== input.executorUserId;
