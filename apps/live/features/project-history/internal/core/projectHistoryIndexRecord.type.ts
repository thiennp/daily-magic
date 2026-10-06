import type { HistoryStoreRecordKind } from "./historyStore.constants";
import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";

/**
 * Record v2 shape History will land later: top-level `threadKey` + `createdAt`.
 * `message` stays opaque. Current on-disk v1 omits those fields.
 */
export type ProjectHistoryMessageRecordV2 = ProjectHistoryMessageRecord & {
  readonly threadKey?: string | null;
  readonly createdAt?: string;
};

/** Anything ingest accepts: durable v1 or v2-shaped. */
export type ProjectHistoryIndexableRecord =
  | ProjectHistoryMessageRecord
  | ProjectHistoryMessageRecordV2;

export type ProjectHistoryIndexRow = {
  readonly messageId: string;
  readonly projectId: string;
  readonly kind: HistoryStoreRecordKind;
  readonly threadKey: string | null;
  readonly createdAt: string;
  readonly savedAt: string;
};

/**
 * Per-device ack local side (History owns writers). Stub for S5 store surface.
 * History fills the durable/ack contract; Mac half only types it.
 */
export type LocalChatAckRecord = {
  readonly deviceId: string;
  readonly messageId: string;
  readonly ackedAt: string;
  readonly lastSeenAt: string;
};
