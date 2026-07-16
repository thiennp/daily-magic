import installOfficialPresetListing from "@/lib/marketplace/installOfficialPresetListing";
import installTeammateListing from "@/lib/marketplace/installTeammateListing";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";
import { validateMarketplaceInstallDeviceOwnership } from "@/lib/marketplace/validateMarketplaceInstallTarget";
import { validateMarketplaceInstallTarget } from "@/lib/marketplace/validateMarketplaceInstallTargetOnline";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

const installMarketplaceListing = async (input: {
  readonly actorUserId: string;
  readonly capabilityId: string;
  readonly deviceId: string;
}): Promise<MarketplaceInstallResult> => {
  const templateId = parsePresetMarketplaceTemplateId(input.capabilityId);

  if (templateId !== null) {
    const ownershipError = await validateMarketplaceInstallDeviceOwnership(
      input.actorUserId,
      input.deviceId,
    );

    if (ownershipError !== null) {
      return {
        ok: false,
        errorMessage: ownershipError,
        savedToLibrary: false,
        libraryCapabilityId: null,
        harnessInstalled: false,
        harnessInstallMessage: null,
        localHarnessBundle: null,
      };
    }

    return installOfficialPresetListing(input.actorUserId, templateId);
  }

  const targetError = await validateMarketplaceInstallTarget(
    input.actorUserId,
    input.deviceId,
  );

  if (targetError !== null) {
    return {
      ok: false,
      errorMessage: targetError,
      savedToLibrary: false,
      libraryCapabilityId: null,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  return installTeammateListing(
    input.actorUserId,
    input.capabilityId,
    input.deviceId,
  );
};

export default installMarketplaceListing;
