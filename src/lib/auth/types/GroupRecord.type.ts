export default interface GroupRecord {
  readonly id: string;
  readonly name: string;
  readonly dispatchPolicy: import("@/lib/dispatch/DispatchPolicy.constant").DispatchPolicyValue;
  readonly createdAt: string;
}
