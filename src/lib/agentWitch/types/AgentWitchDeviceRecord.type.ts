export default interface AgentWitchDeviceRecord {
  readonly id: string;
  readonly userId: string;
  readonly tokenHash?: string | null;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly dispatchPolicy:
    import("@/lib/dispatch/DispatchPolicy.constant").DispatchPolicyValue | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly publicKey?: string | null;
  readonly preferredWriter?: string | null;
  readonly lastWakeError?: string | null;
  readonly lastWakeErrorAt?: string | null;
  readonly installBundleVersion?: string | null;
  readonly wakePort?: number | null;
}
