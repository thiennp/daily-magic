import buildGuestLibraryDraftFromCreatePayload from "@/lib/library/guest/buildGuestLibraryDraftFromCreatePayload";
import { upsertGuestLibraryDraft } from "@/lib/library/guest/guestLibraryDraftStorage";
import type { CreatePlaybookPayload } from "@/features/capabilities/submitCreatePlaybook";
import type { CreatePlaybookResult } from "@/features/capabilities/submitCreatePlaybook";

export const submitGuestPlaybook = async (
  payload: CreatePlaybookPayload,
): Promise<CreatePlaybookResult> => {
  const draft = buildGuestLibraryDraftFromCreatePayload({
    type: payload.type,
    name: payload.name,
    description: payload.description,
    exampleRequest: payload.exampleRequest,
    workflowFields: payload.workflowFields,
    harnessItems: payload.harnessItems,
  });
  upsertGuestLibraryDraft(draft);

  return {
    ok: true,
    capabilityId: draft.localId,
    harnessInstalled: false,
    harnessInstallMessage:
      "Saved on this browser. Sign in to sync to your account and Mac.",
  };
};
