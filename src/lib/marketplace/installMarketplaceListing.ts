import installOfficialPresetListing from "@/lib/marketplace/installOfficialPresetListing";
import installTeammateListing from "@/lib/marketplace/installTeammateListing";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";
import { validateMarketplaceInstallTarget } from "@/lib/marketplace/validateMarketplaceInstallTarget";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

const installMarketplaceListing = async (input: {
  readonly actorUserId: string;
  readonly capabilityId: string;
  readonly deviceId: string;
}): Promise<MarketplaceInstallResult> => {
  const targetError = await validateMarketplaceInstallTarget(
    input.actorUserId,
    input.deviceId,
  );

  if (targetError !== null) {
    return {
      ok: false,
      errorMessage: targetError,
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
    };
  }

  const templateId = parsePresetMarketplaceTemplateId(input.capabilityId);

  if (templateId !== null) {
    return installOfficialPresetListing(
      input.actorUserId,
      templateId,
      input.deviceId,
    );
  }

  return installTeammateListing(
    input.actorUserId,
    input.capabilityId,
    input.deviceId,
  );
};

export default installMarketplaceListing;
