import { fetchCapabilityTemplateDetail } from "@/features/capabilities/utils/capabilityTemplatesApi";
import buildGuestLibraryDraftFromTemplate from "@/lib/library/guest/buildGuestLibraryDraftFromTemplate";
import { upsertGuestLibraryDraft } from "@/lib/library/guest/guestLibraryDraftStorage";

export interface SaveTemplateToGuestLibraryResult {
  readonly ok: boolean;
  readonly errorMessage: string | null;
}

export const saveTemplateToGuestLibrary = async (
  templateId: string,
): Promise<SaveTemplateToGuestLibraryResult> => {
  const template = await fetchCapabilityTemplateDetail(templateId);

  if (template === null) {
    return { ok: false, errorMessage: "Template not found." };
  }

  const draft = buildGuestLibraryDraftFromTemplate(template);
  upsertGuestLibraryDraft(draft);

  return { ok: true, errorMessage: null };
};
