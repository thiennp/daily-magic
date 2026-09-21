import type CreateGuestPlaybookPayload from "@/lib/library/guest/types/CreateGuestPlaybookPayload.type";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

const guestLibraryDraftToCreatePlaybookPayload = (
  draft: GuestLibraryDraft,
): CreateGuestPlaybookPayload => ({
  type: draft.type,
  name: draft.name,
  description: draft.description,
  exampleRequest: draft.exampleRequest,
  workflowFields: draft.workflowFields,
  harnessItems: draft.harnessItems,
});

export default guestLibraryDraftToCreatePlaybookPayload;
