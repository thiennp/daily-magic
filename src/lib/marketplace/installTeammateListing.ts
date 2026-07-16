import { forkPublishedCapability } from "@/lib/capabilities/forkPublishedCapability";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import { resolveTeammateHarnessInstallBundle } from "@/lib/marketplace/resolveTeammateHarnessInstallBundle";
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

const installTeammateListing = async (
  actorUserId: string,
  capabilityId: string,
  deviceId: string,
): Promise<MarketplaceInstallResult> => {
  void deviceId;

  const capability = await getPublishedCapabilityById(capabilityId);

  if (capability === null || capability.harnessSetSlug === null) {
    return installFailure("Listing not found.");
  }

  const canView = await canViewPublishedCapability(
    actorUserId,
    capability.ownerUserId,
    capability.visibility,
    capability.groupId,
  );

  if (!canView) {
    return installFailure("You cannot install this listing.");
  }

  const forkResult = await forkPublishedCapability(capabilityId, actorUserId);

  if (!forkResult.ok) {
    return installFailure(
      forkResult.reason === "own_capability"
        ? "This is already yours."
        : "Could not save this listing to your library.",
    );
  }

  const canViewSet = await canViewHarnessSet(
    actorUserId,
    capability.ownerUserId,
    capability.harnessSetSlug,
  );

  if (!canViewSet) {
    return {
      ok: true,
      errorMessage: null,
      savedToLibrary: true,
      libraryCapabilityId: forkResult.capability.id,
      harnessInstalled: false,
      harnessInstallMessage:
        "Saved to your library. Rules bundle is not available to install.",
      localHarnessBundle: null,
    };
  }

  const harness = await resolveTeammateHarnessInstallBundle({
    actorUserId,
    ownerUserId: capability.ownerUserId,
    harnessSetSlug: capability.harnessSetSlug,
  });

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: forkResult.capability.id,
    harnessInstalled: false,
    harnessInstallMessage: harness.harnessInstallMessage,
    localHarnessBundle: harness.localHarnessBundle,
  };
};

export default installTeammateListing;
