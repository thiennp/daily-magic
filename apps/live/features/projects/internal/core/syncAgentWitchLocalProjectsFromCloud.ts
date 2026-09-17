import type { AgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  fetchAgentWitchCloudProjects,
  resolveAgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import { mergeCloudProjectsIntoLocalRegistry } from "./agentWitchLocalProjectsRegistry";

export interface SyncAgentWitchLocalProjectsResult {
  readonly ok: boolean;
  readonly syncedCount: number;
  readonly message: string;
}

export const syncAgentWitchLocalProjectsFromCloud = async (
  layout: AgentWitchLocalLayout,
  runConfig: AgentWitchRunConfig,
): Promise<SyncAgentWitchLocalProjectsResult> => {
  const cloudConfig = resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });

  if (cloudConfig === null) {
    return {
      ok: false,
      syncedCount: 0,
      message: "Could not sync — check pairing token and wsUrl in config.json.",
    };
  }

  const cloudProjects = await fetchAgentWitchCloudProjects(cloudConfig);

  if (cloudProjects === null) {
    return {
      ok: false,
      syncedCount: 0,
      message:
        "Could not reach Agent Witch Live. Repositories may be Mac-only until the Mac client reconnects.",
    };
  }

  const { added, updated } = mergeCloudProjectsIntoLocalRegistry(
    layout,
    cloudProjects,
  );

  return {
    ok: true,
    syncedCount: cloudProjects.length,
    message:
      cloudProjects.length === 0
        ? "Synced with Agent Witch Live — no repositories yet. Add one in the task composer on the website."
        : `Synced ${cloudProjects.length} repositor${cloudProjects.length === 1 ? "y" : "ies"} from Agent Witch Live${added + updated > 0 ? ` (${added} new, ${updated} updated on this Mac)` : ""}.`,
  };
};
