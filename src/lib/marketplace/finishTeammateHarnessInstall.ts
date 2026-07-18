import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import { resolveTeammateHarnessInstallBundle } from "@/lib/marketplace/resolveTeammateHarnessInstallBundle";
import { pushHarnessInstallBundleToDevice } from "@/lib/marketplace/pushHarnessInstallBundleToDevice";
import type { MarketplaceInstallResult } from "@/lib/marketplace/types/MarketplaceInstallResult.type";

export const finishTeammateHarnessInstall = async (input: {
  readonly actorUserId: string;
  readonly deviceId: string;
  readonly libraryCapabilityId: string;
  readonly ownerUserId: string;
  readonly harnessSetSlug: string;
}): Promise<MarketplaceInstallResult> => {
  const canViewSet = await canViewHarnessSet(
    input.actorUserId,
    input.ownerUserId,
    input.harnessSetSlug,
  );

  if (!canViewSet) {
    return {
      ok: true,
      errorMessage: null,
      savedToLibrary: true,
      libraryCapabilityId: input.libraryCapabilityId,
      harnessInstalled: false,
      harnessInstallMessage:
        "Saved to your library. Rules bundle is not available to install.",
      localHarnessBundle: null,
    };
  }

  const harness = await resolveTeammateHarnessInstallBundle({
    actorUserId: input.actorUserId,
    ownerUserId: input.ownerUserId,
    harnessSetSlug: input.harnessSetSlug,
  });

  if (harness.localHarnessBundle === null) {
    return {
      ok: true,
      errorMessage: null,
      savedToLibrary: true,
      libraryCapabilityId: input.libraryCapabilityId,
      harnessInstalled: false,
      harnessInstallMessage: harness.harnessInstallMessage,
      localHarnessBundle: null,
    };
  }

  const push = await pushHarnessInstallBundleToDevice({
    userId: input.actorUserId,
    deviceId: input.deviceId,
    bundle: harness.localHarnessBundle,
  });

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary: true,
    libraryCapabilityId: input.libraryCapabilityId,
    harnessInstalled: push.installed,
    harnessInstallMessage: push.installed
      ? null
      : (push.errorMessage ?? harness.harnessInstallMessage),
    localHarnessBundle: null,
  };
};
