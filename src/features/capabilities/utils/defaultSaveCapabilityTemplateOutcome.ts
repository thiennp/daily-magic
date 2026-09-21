import { saveCapabilityTemplateToLibrary } from "@/features/capabilities/utils/capabilityTemplatesApi";
import type SaveCapabilityTemplateOutcome from "@/features/capabilities/types/SaveCapabilityTemplateOutcome.type";

export const defaultSaveCapabilityTemplateOutcome = async (
  templateId: string,
): Promise<SaveCapabilityTemplateOutcome> => {
  const result = await saveCapabilityTemplateToLibrary(templateId);
  return {
    ok: result.ok,
    errorMessage: result.errorMessage,
    harnessInstalled: result.harnessInstalled,
    harnessInstallMessage: result.harnessInstallMessage,
  };
};

export const resolveCapabilityTemplateSaveHarnessMessage = (
  result: SaveCapabilityTemplateOutcome,
): string | null => {
  if (!result.ok) {
    return null;
  }

  if (result.harnessInstalled) {
    return "Install requested on your Mac.";
  }

  return (
    result.harnessInstallMessage ??
    "Saved to Library. Open Agent when your Mac is online to finish install."
  );
};
