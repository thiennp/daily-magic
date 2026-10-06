import buildHarnessInstallBundleFromTemplateHarness from "@/lib/agentWitch/harness/buildHarnessInstallBundleFromTemplateHarness";
import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import requestCapabilityTemplateHarnessInstall from "@/lib/capabilities/requestCapabilityTemplateHarnessInstall";
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

  const result = await createCapabilityFromTemplate({
    ownerUserId: actorUserId,
    templateId,
    projectId,
    deviceId,
    deferHarnessInstall: true,
  });

  if (!result.ok) {
    return {
      ok: false,
      errorMessage: result.error,
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

  const localHarnessBundle = buildHarnessInstallBundleFromTemplateHarness(
    result.harness,
  );
  const pushed = await requestCapabilityTemplateHarnessInstall(
    actorUserId,
    result.harness,
    deviceId,
  );

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: result.capability.id,
    harnessInstalled: pushed.installed,
    harnessInstallMessage: pushed.installed
      ? "Linked to your project. On the computer, open the project and pull playbook files into the repo."
      : "Linked to your project. Open the project on the computer and pull playbook files into the repo.",
    localHarnessBundle,
    projectId,
  };
};

export default installOfficialPresetListing;
