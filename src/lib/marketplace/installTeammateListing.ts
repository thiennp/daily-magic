import { forkPublishedCapability } from "@/lib/capabilities/forkPublishedCapability";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { dispatchHarnessBorrowExportAsync } from "@/lib/agentWitch/dispatchHarnessBorrowExportAsync";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

const installTeammateListing = async (
  actorUserId: string,
  capabilityId: string,
  deviceId: string,
): Promise<MarketplaceInstallResult> => {
  const capability = await getPublishedCapabilityById(capabilityId);

  if (capability === null || capability.harnessSetSlug === null) {
    return {
      ok: false,
      errorMessage: "Listing not found.",
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const canView = await canViewPublishedCapability(
    actorUserId,
    capability.ownerUserId,
    capability.visibility,
    capability.groupId,
  );

  if (!canView) {
    return {
      ok: false,
      errorMessage: "You cannot install this listing.",
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const forkResult = await forkPublishedCapability(capabilityId, actorUserId);

  if (!forkResult.ok) {
    const errorMessage =
      forkResult.reason === "own_capability"
        ? "This is already yours."
        : "Could not save this listing to your library.";

    return {
      ok: false,
      errorMessage,
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const hub = getAgentWitchHub();
  const ownerAgent = hub.findAgentClientForUser(capability.ownerUserId);

  if (ownerAgent === undefined) {
    return {
      ok: true,
      errorMessage: null,
      savedToLibrary: true,
      harnessInstalled: false,
      harnessInstallMessage:
        "Saved to your library. Owner must be online to install rules on your Mac.",
      localHarnessBundle: null,
    };
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
      harnessInstalled: false,
      harnessInstallMessage:
        "Saved to your library. Rules bundle is not available to install.",
      localHarnessBundle: null,
    };
  }

  await dispatchHarnessBorrowExportAsync({
    runtime: hub,
    ownerAgent,
    borrowerUserId: actorUserId,
    ownerUserId: capability.ownerUserId,
    setSlugs: [capability.harnessSetSlug],
    targetDeviceId: deviceId,
  });

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    harnessInstalled: true,
    harnessInstallMessage: "Installing rules on your Mac.",
    localHarnessBundle: null,
  };
};

export default installTeammateListing;
