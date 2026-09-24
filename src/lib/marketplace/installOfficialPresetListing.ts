import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import bindMarketplaceInstallToProject from "@/lib/marketplace/bindMarketplaceInstallToProject";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

const installOfficialPresetListing = async (
  actorUserId: string,
  templateId: string,
  deviceId: string,
  projectId: string,
): Promise<MarketplaceInstallResult> => {
  const template = findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return {
      ok: false,
      errorMessage: "Listing not found.",
      savedToLibrary: false,
      libraryCapabilityId: null,
      projectId: null,
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
      projectId: null,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const bound = await bindMarketplaceInstallToProject({
    ownerUserId: actorUserId,
    projectId,
    deviceId,
    libraryCapabilityId: result.capability.id,
    capabilityType: template.type,
    harness: result.harness,
  });

  if (!bound.ok) {
    return {
      ok: false,
      errorMessage: bound.errorMessage,
      savedToLibrary: true,
      libraryCapabilityId: result.capability.id,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
      projectId,
    };
  }

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: result.capability.id,
    harnessInstalled: false,
    harnessInstallMessage:
      "Linked to your project. On the Mac, open the project and pull playbook files into the repo.",
    localHarnessBundle: null,
    projectId,
  };
};

export default installOfficialPresetListing;
