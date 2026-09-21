import type CreateGuestPlaybookPayload from "@/lib/library/guest/types/CreateGuestPlaybookPayload.type";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

const buildGuestLibraryDraftFromCreatePayload = (
  payload: CreateGuestPlaybookPayload,
): GuestLibraryDraft => {
  const now = new Date().toISOString();

  return {
    localId: crypto.randomUUID(),
    remoteCapabilityId: null,
    sourceTemplateId: null,
    type: payload.type,
    name: payload.name.trim(),
    description: payload.description,
    exampleRequest: payload.exampleRequest,
    workflowFields: payload.workflowFields ?? [],
    harnessItems: payload.harnessItems.map((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      content: item.content,
    })),
    harnessSetSlug: null,
    createdAt: now,
    updatedAt: now,
  };
};

export default buildGuestLibraryDraftFromCreatePayload;
