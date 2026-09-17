import type { AgentWitchRunConfig } from "@agent-witch/install-runtime-client";

import {
  fetchAgentWitchCloudProjects,
  resolveAgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import { mapAgentWitchCloudProjectsToViews } from "./mapAgentWitchCloudProjectsToViews";
import type AgentWitchProjectView from "./agentWitchProjectView.type";

export interface FetchAgentWitchProjectsForLocalAppResult {
  readonly ok: boolean;
  readonly projects: readonly AgentWitchProjectView[];
  readonly message: string;
}

export const fetchAgentWitchProjectsForLocalApp = async (
  runConfig: AgentWitchRunConfig,
): Promise<FetchAgentWitchProjectsForLocalAppResult> => {
  const cloudConfig = resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });

  if (cloudConfig === null) {
    return {
      ok: false,
      projects: [],
      message:
        "Could not load projects — check pairing token and wsUrl in config.json.",
    };
  }

  const cloudProjects = await fetchAgentWitchCloudProjects(cloudConfig);

  if (cloudProjects === null) {
    return {
      ok: false,
      projects: [],
      message:
        "Could not reach Agent Witch Console. Check the Mac connection and try again.",
    };
  }

  const projects = mapAgentWitchCloudProjectsToViews(cloudProjects);

  return {
    ok: true,
    projects,
    message:
      projects.length === 0
        ? "No projects yet — create one in Agent Witch Console, then refresh this page."
        : `Loaded ${projects.length} project${projects.length === 1 ? "" : "s"} from Agent Witch Console.`,
  };
};
