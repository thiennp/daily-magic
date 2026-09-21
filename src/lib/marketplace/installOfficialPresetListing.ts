import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import buildComponentSlugFromCapability from "@/lib/components/buildComponentSlugFromCapability";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { findOwnerLibraryCapabilityIdForComponentSlug } from "@/lib/capabilities/findOwnerLibraryCapabilityIdForComponentSlug";
import buildHarnessInstallBundleFromTemplateHarness from "@/lib/agentWitch/harness/buildHarnessInstallBundleFromTemplateHarness";
import { pushHarnessInstallBundleToDevice } from "@/lib/marketplace/pushHarnessInstallBundleToDevice";
import { saveMarketplacePresetToLibrary } from "@/lib/marketplace/saveMarketplacePresetToLibrary";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

const installFailure = (errorMessage: string): MarketplaceInstallResult => ({
  ok: false,
  errorMessage,
  savedToLibrary: false,
  libraryCapabilityId: null,
  harnessInstalled: false,
  harnessInstallMessage: null,
  localHarnessBundle: null,
});

const installOfficialPresetListing = async (
  actorUserId: string,
  templateId: string,
  deviceId: string,
): Promise<MarketplaceInstallResult> => {
  const template = findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return installFailure("Listing not found.");
  }

  const componentSlug = buildComponentSlugFromCapability({
    name: template.name,
    harnessSetSlug: template.harness.slug,
  });
  const componentKind =
    template.type === CapabilityType.WORKFLOW ? "workflow" : "agent";

  const existingLibraryCapabilityId =
    await findOwnerLibraryCapabilityIdForComponentSlug({
      ownerUserId: actorUserId,
      kind: componentKind,
      slug: componentSlug,
    });

  const librarySave =
    existingLibraryCapabilityId !== null
      ? {
          ok: true as const,
          libraryCapabilityId: existingLibraryCapabilityId,
          harness: template.harness,
        }
      : await saveMarketplacePresetToLibrary({ actorUserId, templateId });

  if (!librarySave.ok) {
    return installFailure(librarySave.errorMessage);
  }

  const bundle = buildHarnessInstallBundleFromTemplateHarness(
    librarySave.harness,
  );
  const push = await pushHarnessInstallBundleToDevice({
    userId: actorUserId,
    deviceId,
    bundle,
  });

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: librarySave.libraryCapabilityId,
    harnessInstalled: push.installed,
    harnessInstallMessage: push.installed
      ? null
      : (push.errorMessage ??
        "Saved to your library. Connect the Mac to install rules."),
    localHarnessBundle: null,
  };
};

export default installOfficialPresetListing;
