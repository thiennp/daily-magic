import type SaveCapabilityTemplateOutcome from "@/features/capabilities/types/SaveCapabilityTemplateOutcome.type";
import { saveTemplateToGuestLibrary } from "@/features/capabilities/utils/saveTemplateToGuestLibrary";

export const guestSaveCapabilityTemplateOutcome = async (
  templateId: string,
): Promise<SaveCapabilityTemplateOutcome> => {
  const result = await saveTemplateToGuestLibrary(templateId);

  return {
    ok: result.ok,
    errorMessage: result.errorMessage,
    harnessInstalled: false,
    harnessInstallMessage: result.ok
      ? "Saved on this browser. Sign in to sync to your account and Mac."
      : null,
  };
};
