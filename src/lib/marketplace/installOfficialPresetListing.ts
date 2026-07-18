import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import buildHarnessInstallBundleFromTemplateHarness from "@/lib/agentWitch/harness/buildHarnessInstallBundleFromTemplateHarness";
import { pushHarnessInstallBundleToDevice } from "@/lib/marketplace/pushHarnessInstallBundleToDevice";
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
      libraryCapabilityId: null,
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
      libraryCapabilityId: null,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const bundle = buildHarnessInstallBundleFromTemplateHarness(result.harness);
  const push = await pushHarnessInstallBundleToDevice({
    userId: actorUserId,
    deviceId,
    bundle,
  });

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: result.capability.id,
    harnessInstalled: push.installed,
    harnessInstallMessage: push.installed
      ? null
      : (push.errorMessage ??
        "Saved to your library. Connect the Mac to install rules."),
    localHarnessBundle: null,
  };
};

export default installOfficialPresetListing;
