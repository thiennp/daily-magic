export default interface AgentWitchDeviceRecord {
  readonly id: string;
  readonly userId: string;
  readonly deviceLabel: string | null;
  readonly dispatchPolicy:
    import("@/lib/dispatch/DispatchPolicy.constant").DispatchPolicyValue | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
}
