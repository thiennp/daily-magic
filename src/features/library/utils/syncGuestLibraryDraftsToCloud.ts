import { pushGuestLibraryDraftToCloud } from "@/features/library/utils/pushGuestLibraryDraftToCloud";
import {
  readGuestLibraryDrafts,
  removeGuestLibraryDraft,
  writeGuestLibraryDrafts,
} from "@/lib/library/guest/guestLibraryDraftStorage";
import {
  planGuestLibraryReconciliation,
  ReconcileGuestDraftActionType,
} from "@/lib/library/guest/reconcileGuestLibraryDrafts";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export interface SyncGuestLibraryDraftsResult {
  readonly pushedCount: number;
  readonly droppedCount: number;
  readonly failedCount: number;
}

const fetchMyCapabilities = async (): Promise<
  readonly PublishedCapabilityRecord[]
> => {
  const response = await fetch("/api/capabilities/mine");
  if (!response.ok) {
    return [];
  }

  const data: unknown = await response.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "capabilities" in data &&
    Array.isArray((data as { capabilities: unknown }).capabilities)
  ) {
    return (data as { capabilities: PublishedCapabilityRecord[] }).capabilities;
  }

  return [];
};

const applyReconcileAction = async (
  draft: GuestLibraryDraft,
  action: ReturnType<typeof planGuestLibraryReconciliation>[number],
): Promise<
  | { readonly kind: "dropped" }
  | { readonly kind: "pushed" }
  | { readonly kind: "failed"; readonly draft: GuestLibraryDraft }
> => {
  if (action.type === ReconcileGuestDraftActionType.DROP_LOCAL) {
    removeGuestLibraryDraft(action.localId);
    return { kind: "dropped" };
  }

  const pushResult = await pushGuestLibraryDraftToCloud(
    draft,
    action.remoteCapabilityId,
  );

  if (pushResult.ok) {
    removeGuestLibraryDraft(action.localId);
    return { kind: "pushed" };
  }

  return {
    kind: "failed",
    draft: {
      ...draft,
      remoteCapabilityId: action.remoteCapabilityId ?? draft.remoteCapabilityId,
    },
  };
};

export const syncGuestLibraryDraftsToCloud =
  async (): Promise<SyncGuestLibraryDraftsResult> => {
    const drafts = readGuestLibraryDrafts();
    if (drafts.length === 0) {
      return { pushedCount: 0, droppedCount: 0, failedCount: 0 };
    }

    const cloud = await fetchMyCapabilities();
    const actions = planGuestLibraryReconciliation(drafts, cloud);
    const draftById = new Map(
      drafts.map((draft) => [draft.localId, draft] as const),
    );

    const outcomes = await Promise.all(
      actions.map(async (action) => {
        const draft = draftById.get(action.localId);
        if (draft === undefined) {
          return { kind: "skipped" as const };
        }

        return applyReconcileAction(draft, action);
      }),
    );

    const remainingDrafts = outcomes
      .filter(
        (
          outcome,
        ): outcome is {
          readonly kind: "failed";
          readonly draft: GuestLibraryDraft;
        } => outcome.kind === "failed",
      )
      .map((outcome) => outcome.draft);

    if (remainingDrafts.length > 0) {
      writeGuestLibraryDrafts(remainingDrafts);
    }

    const pushedCount = outcomes.filter(
      (outcome) => outcome.kind === "pushed",
    ).length;
    const droppedCount = outcomes.filter(
      (outcome) => outcome.kind === "dropped",
    ).length;
    const failedCount = outcomes.filter(
      (outcome) => outcome.kind === "failed",
    ).length;

    return { pushedCount, droppedCount, failedCount };
  };
