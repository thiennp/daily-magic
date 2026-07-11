import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";

export const listOnlineHarnessOwnerIds = (): ReadonlySet<string> => {
  const reports = getAgentWitchHub().listHarnessManifestReports();
  const ownerIds = reports
    .map((report) => report.userId)
    .filter((userId): userId is string => typeof userId === "string");

  return new Set(ownerIds);
};
