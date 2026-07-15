import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import buildHarnessInstallBundleFromExportSets from "@/lib/harness/buildHarnessInstallBundleFromExportSets";
import { requestHarnessExportSetsFromOwner } from "@/lib/harness/requestHarnessExportSetsFromOwner";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export const resolveTeammateHarnessInstallBundle = async (input: {
  readonly actorUserId: string;
  readonly ownerUserId: string;
  readonly harnessSetSlug: string;
}): Promise<{
  readonly localHarnessBundle: HarnessInstallBundle | null;
  readonly harnessInstallMessage: string | null;
}> => {
  const hub = getAgentWitchHub();
  const ownerAgent = hub.findAgentClientForUser(input.ownerUserId);

  if (ownerAgent === undefined) {
    return {
      localHarnessBundle: null,
      harnessInstallMessage:
        "Saved to your library. Owner must be online to install rules on your Mac.",
    };
  }

  try {
    const exportSets = await requestHarnessExportSetsFromOwner({
      ownerAgent,
      borrowerUserId: input.actorUserId,
      setSlugs: [input.harnessSetSlug],
    });
    const localHarnessBundle =
      buildHarnessInstallBundleFromExportSets(exportSets);

    if (localHarnessBundle === null) {
      return {
        localHarnessBundle: null,
        harnessInstallMessage:
          "Saved to your library. No readable harness items were exported.",
      };
    }

    return {
      localHarnessBundle,
      harnessInstallMessage: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Harness export failed.";

    return {
      localHarnessBundle: null,
      harnessInstallMessage: `Saved to your library. ${message}`,
    };
  }
};
