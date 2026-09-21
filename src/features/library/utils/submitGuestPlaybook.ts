import buildGuestLibraryDraftFromCreatePayload from "@/lib/library/guest/buildGuestLibraryDraftFromCreatePayload";
import { upsertGuestLibraryDraft } from "@/lib/library/guest/guestLibraryDraftStorage";
import type CreateGuestPlaybookPayload from "@/lib/library/guest/types/CreateGuestPlaybookPayload.type";
import type { CreatePlaybookResult } from "@/features/capabilities/submitCreatePlaybook";

export const submitGuestPlaybook = async (
  payload: CreateGuestPlaybookPayload,
): Promise<CreatePlaybookResult> => {
  const draft = buildGuestLibraryDraftFromCreatePayload(payload);
  upsertGuestLibraryDraft(draft);

  return {
    ok: true,
    capabilityId: draft.localId,
    harnessInstalled: false,
    harnessInstallMessage:
      "Saved on this browser. Sign in to sync to your account and Mac.",
  };
};
