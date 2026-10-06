import type { LocalChatAckRecord } from "./localChatAckRecord.type";

/**
 * Pure builder for a per-device local ack. `ackedAt` defaults to now;
 * `lastSeenAt` defaults to `ackedAt` on first ack (Lead GO shape).
 */
export const buildLocalChatAckRecord = (input: {
  readonly deviceId: string;
  readonly messageId: string;
  readonly ackedAt?: string;
  readonly lastSeenAt?: string;
}): LocalChatAckRecord => {
  const deviceId = input.deviceId.trim();
  const messageId = input.messageId.trim();
  if (deviceId.length === 0) {
    throw new Error("invalid_device_id");
  }
  if (messageId.length === 0) {
    throw new Error("invalid_message_id");
  }
  const ackedAt = input.ackedAt ?? new Date().toISOString();
  return {
    deviceId,
    messageId,
    ackedAt,
    lastSeenAt: input.lastSeenAt ?? ackedAt,
  };
};
