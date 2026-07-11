export default interface AgentWitchClaimedPairing {
  readonly userId: string;
  readonly email: string;
  readonly claimedAt: string;
  readonly deviceId?: string;
}
