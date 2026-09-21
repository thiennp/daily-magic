import installOfficialPresetListing from "@/lib/marketplace/installOfficialPresetListing";
import installTeammateListing from "@/lib/marketplace/installTeammateListing";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";
import { validateMarketplaceInstallTarget } from "@/lib/marketplace/validateMarketplaceInstallTargetOnline";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

const installFailure = (errorMessage: string): MarketplaceInstallResult => ({
  ok: false,
  errorMessage,
  savedToLibrary: false,
  libraryCapabilityId: null,
  harnessInstalled: false,
  harnessInstallMessage: null,
  localHarnessBundle: null,
});

const installMarketplaceListing = async (input: {
  readonly actorUserId: string;
  readonly capabilityId: string;
  readonly deviceId: string;
}): Promise<MarketplaceInstallResult> => {
  const templateId = parsePresetMarketplaceTemplateId(input.capabilityId);

  if (templateId !== null) {
    const targetError = await validateMarketplaceInstallTarget(
      input.actorUserId,
      input.deviceId,
    );

    if (targetError !== null) {
      return installFailure(targetError);
    }

    return installOfficialPresetListing(
      input.actorUserId,
      templateId,
      input.deviceId,
    );
  }

  const targetError = await validateMarketplaceInstallTarget(
    input.actorUserId,
    input.deviceId,
  );

  if (targetError !== null) {
    return installFailure(targetError);
  }

  return installTeammateListing(
    input.actorUserId,
    input.capabilityId,
    input.deviceId,
  );
};

export default installMarketplaceListing;
