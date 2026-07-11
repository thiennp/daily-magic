import {
  deleteHarnessCatalogSnapshot,
  upsertHarnessCatalogSnapshot,
} from "@/lib/harness/harnessCatalogMutations";
import { getUserHarnessSharingVisibility } from "@/lib/harness/harnessSharingVisibilityQueries";
import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import type { AgentWitchHarnessManifestReport } from "@/lib/agentWitch/types/AgentWitchHubStatus.type";

export const syncHarnessCatalogFromReport = async (
  report: AgentWitchHarnessManifestReport,
): Promise<void> => {
  if (report.userId === undefined) {
    return;
  }

  const visibility = await getUserHarnessSharingVisibility(report.userId);

  if (visibility === HarnessSharingVisibility.PRIVATE) {
    await deleteHarnessCatalogSnapshot(report.userId);
    return;
  }

  await upsertHarnessCatalogSnapshot({
    ownerUserId: report.userId,
    visibility,
    hostname: report.hostname,
    manifestJson: report.manifest,
    reportedAt: report.reportedAt,
  });
};
