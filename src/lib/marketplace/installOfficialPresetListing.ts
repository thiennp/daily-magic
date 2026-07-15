import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

const installOfficialPresetListing = async (
  actorUserId: string,
  templateId: string,
  deviceId: string,
): Promise<MarketplaceInstallResult> => {
  const template = findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return {
      ok: false,
      errorMessage: "Listing not found.",
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
    };
  }

  const result = await createCapabilityFromTemplate(
    actorUserId,
    templateId,
    deviceId,
  );

  if (result === null) {
    return {
      ok: false,
      errorMessage: "Could not save this starter.",
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
    };
  }

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    harnessInstalled: result.harnessInstalled,
    harnessInstallMessage: result.harnessInstallMessage,
  };
};

export default installOfficialPresetListing;
