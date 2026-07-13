export default interface ConnectedClient {
  readonly id: string;
  readonly role: string;
  readonly connectedAt: string;
  readonly userId?: string;
  readonly deviceId?: string;
  readonly deviceLabel?: string;
  readonly lastHeartbeatAt?: string;
}
