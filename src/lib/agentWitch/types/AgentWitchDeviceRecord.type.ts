export default interface AgentWitchDeviceRecord {
  readonly id: string;
  readonly userId: string;
  readonly deviceLabel: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
}
