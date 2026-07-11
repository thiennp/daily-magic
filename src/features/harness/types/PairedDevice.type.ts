export default interface PairedDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
}
