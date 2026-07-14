export const DispatchPolicy = {
  OPEN: "open",
  APPROVAL: "approval",
} as const;

export type DispatchPolicyValue =
  (typeof DispatchPolicy)[keyof typeof DispatchPolicy];

export const DEFAULT_DISPATCH_POLICY = DispatchPolicy.APPROVAL;

export const isDispatchPolicy = (value: string): value is DispatchPolicyValue =>
  value === DispatchPolicy.OPEN || value === DispatchPolicy.APPROVAL;
