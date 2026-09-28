import { forkPublishedCapability } from "@/lib/capabilities/forkPublishedCapability";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import bindPublishedCapabilityHarnessToProject from "@/lib/marketplace/bindPublishedCapabilityHarnessToProject";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

const installFailure = (errorMessage: string): MarketplaceInstallResult => ({
  ok: false,
  errorMessage,
  savedToLibrary: false,
  libraryCapabilityId: null,
  projectId: null,
  harnessInstalled: false,
  harnessInstallMessage: null,
  localHarnessBundle: null,
});

const installTeammateListing = async (
  actorUserId: string,
  capabilityId: string,
  deviceId: string,
  projectId: string,
): Promise<MarketplaceInstallResult> => {
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

  const bound = await bindPublishedCapabilityHarnessToProject({
    ownerUserId: actorUserId,
    projectId,
    deviceId,
    libraryCapabilityId: forkResult.capability.id,
    capabilityType: capability.type,
    harnessSetSlug: capability.harnessSetSlug,
    harnessSetName: capability.name,
  });

  if (!bound.ok) {
    return installFailure(bound.errorMessage);
  }

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: forkResult.capability.id,
    projectId,
    harnessInstalled: false,
    harnessInstallMessage:
      "Linked to your project. Pull playbook files into the repo from Agent Witch on your Mac.",
    localHarnessBundle: null,
  };
};

export default installTeammateListing;
