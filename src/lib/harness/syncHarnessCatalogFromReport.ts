import { upsertHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import type { AgentWitchHarnessManifestReport } from "@/lib/agentWitch/types/AgentWitchHubStatus.type";

export const syncHarnessCatalogFromReport = async (
  report: AgentWitchHarnessManifestReport,
): Promise<void> => {
  if (report.userId === undefined) {
    return;
  }

  await upsertHarnessCatalogSnapshot({
    ownerUserId: report.userId,
    visibility: HarnessSharingVisibility.PRIVATE,
    hostname: report.hostname,
    manifestJson: report.manifest,
    reportedAt: report.reportedAt,
  });
};
