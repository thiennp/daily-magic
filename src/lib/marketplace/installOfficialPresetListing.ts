import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import buildHarnessInstallBundleFromTemplateHarness from "@/lib/agentWitch/harness/buildHarnessInstallBundleFromTemplateHarness";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

const installOfficialPresetListing = async (
  actorUserId: string,
  templateId: string,
): Promise<MarketplaceInstallResult> => {
  const template = findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return {
      ok: false,
      errorMessage: "Listing not found.",
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const result = await createCapabilityFromTemplate(
    actorUserId,
    templateId,
    undefined,
    { deferHarnessInstall: true },
  );

  if (result === null) {
    return {
      ok: false,
      errorMessage: "Could not save this starter.",
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    harnessInstalled: false,
    harnessInstallMessage: null,
    localHarnessBundle: buildHarnessInstallBundleFromTemplateHarness(
      result.harness,
    ),
  };
};

export default installOfficialPresetListing;
