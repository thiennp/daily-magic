import normalizePlaybookNameKey from "@/lib/library/guest/normalizePlaybookNameKey";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export const ReconcileGuestDraftActionType = {
  PUSH_LOCAL: "push_local",
  DROP_LOCAL: "drop_local",
} as const;

export type ReconcileGuestDraftActionTypeValue =
  (typeof ReconcileGuestDraftActionType)[keyof typeof ReconcileGuestDraftActionType];

export interface ReconcileGuestDraftAction {
  readonly type: ReconcileGuestDraftActionTypeValue;
  readonly localId: string;
  readonly remoteCapabilityId: string | null;
}

const parseTimestamp = (value: string): number => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const findCloudMatch = (
  draft: GuestLibraryDraft,
  cloud: readonly PublishedCapabilityRecord[],
): PublishedCapabilityRecord | null => {
  if (draft.remoteCapabilityId !== null) {
    const byId = cloud.find(
      (capability) => capability.id === draft.remoteCapabilityId,
    );
    if (byId !== undefined) {
      return byId;
    }
  }

  const nameKey = normalizePlaybookNameKey(draft.name);
  const byName = cloud.find(
    (capability) =>
      capability.type === draft.type &&
      normalizePlaybookNameKey(capability.name) === nameKey,
  );

  return byName ?? null;
};

export const planGuestLibraryReconciliation = (
  drafts: readonly GuestLibraryDraft[],
  cloud: readonly PublishedCapabilityRecord[],
): readonly ReconcileGuestDraftAction[] =>
  drafts.map((draft) => {
    const remote = findCloudMatch(draft, cloud);

    if (remote === null) {
      return {
        type: ReconcileGuestDraftActionType.PUSH_LOCAL,
        localId: draft.localId,
        remoteCapabilityId: null,
      };
    }

    const localUpdatedAt = parseTimestamp(draft.updatedAt);
    const cloudUpdatedAt = parseTimestamp(remote.updatedAt);

    if (localUpdatedAt > cloudUpdatedAt) {
      return {
        type: ReconcileGuestDraftActionType.PUSH_LOCAL,
        localId: draft.localId,
        remoteCapabilityId: remote.id,
      };
    }

    return {
      type: ReconcileGuestDraftActionType.DROP_LOCAL,
      localId: draft.localId,
      remoteCapabilityId: remote.id,
    };
  });

export default planGuestLibraryReconciliation;
