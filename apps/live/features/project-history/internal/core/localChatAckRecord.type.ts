/**
 * Per-device local computerAck (S5). Matches Mac `LocalChatAckRecord` on
 * origin/feat/awl-s5-local-store @ e6038a7c. History owns writers; Mac types it.
 */
export type LocalChatAckRecord = {
  readonly deviceId: string;
  readonly messageId: string;
  readonly ackedAt: string;
  readonly lastSeenAt: string;
};
