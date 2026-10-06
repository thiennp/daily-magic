import type {
  MessengerChatStoreAdapter,
  MessengerKeptRecipient,
} from "@/features/projects/messenger/types/messengerChatStore.type";
import { messengerKeptRecipientKey } from "@/features/projects/messenger/utils/messengerChatKey";

type KeptScope = {
  readonly store: MessengerChatStoreAdapter;
  readonly projectId: string;
  /** Viewer identity (membership or user id) — one kept value per member. */
  readonly memberKey: string;
};

/** Browser cache read. Server value (Dispatch, later) wins on load. */
export const readMessengerKeptRecipient = async (
  scope: KeptScope,
): Promise<MessengerKeptRecipient | null> => {
  const row = await scope.store
    .readKept(messengerKeptRecipientKey(scope))
    .catch(() => null);
  return row?.recipient ?? null;
};

/** Upsert; clearing writes `recipient: null` (EVERYONE) — no delete path. */
export const writeMessengerKeptRecipient = async (
  scope: KeptScope & {
    readonly recipient: MessengerKeptRecipient | null;
    readonly now: number;
  },
): Promise<boolean> =>
  scope.store
    .writeKept({
      keptKey: messengerKeptRecipientKey(scope),
      projectId: scope.projectId,
      memberKey: scope.memberKey,
      recipient: scope.recipient,
      updatedAt: new Date(scope.now).toISOString(),
      schemaVersion: 1,
    })
    .catch(() => false);
