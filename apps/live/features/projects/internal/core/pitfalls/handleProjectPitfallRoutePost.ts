import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";

import {
  resolveAgentWitchCloudApiConfig,
  type AgentWitchCloudApiConfig,
} from "../agentWitchCloudApi";
import { fetchAgentWitchProjectsForLocalApp } from "../fetchAgentWitchProjectsForLocalApp";
import { findAgentWitchProjectById } from "../mapAgentWitchCloudProjectsToViews";
import type { AgentWitchProjectPitfallsStore } from "./agentWitchProjectPitfallsStore.type";
import createCloudAgentWitchProjectPitfallsStore from "./createCloudAgentWitchProjectPitfallsStore";
import handleProjectPitfallPost from "./handleProjectPitfallPost";
import type { ProjectPitfallPostAction } from "./projectPitfallPostPaths.constant";
import { invalidateProjectPitfallsListCache } from "./projectPitfallsListCache";

export type ProjectPitfallRoutePostResult =
  | { readonly kind: "not_found" }
  | { readonly kind: "redirect"; readonly location: string };

/**
 * AWL `/project/pitfalls/{save,retire,restore}` POST route — extracted from
 * `startAgentWitchLocalApp` alongside the other named project POST handlers.
 */
export const handleProjectPitfallRoutePost = async (input: {
  readonly rawBody: string;
  readonly action: ProjectPitfallPostAction;
  readonly layout: AgentWitchLocalLayout;
  /** Injectable store (tests / Mac SQLite cache). Default: cloud SoT client. */
  readonly createStore?: (
    config: AgentWitchCloudApiConfig,
  ) => AgentWitchProjectPitfallsStore;
}): Promise<ProjectPitfallRoutePostResult> => {
  const form = new URLSearchParams(input.rawBody);
  const projectId = form.get("projectId")?.trim() ?? "";

  const runConfig = readAgentWitchRunConfig();
  if (runConfig === null) {
    return { kind: "not_found" };
  }

  const cloudProjects = await fetchAgentWitchProjectsForLocalApp(
    runConfig,
    input.layout,
  );
  const project = findAgentWitchProjectById(cloudProjects.projects, projectId);
  if (project === null) {
    return { kind: "not_found" };
  }

  const cloudConfig = resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });
  const createStore =
    input.createStore ?? createCloudAgentWitchProjectPitfallsStore;
  const store = cloudConfig === null ? null : createStore(cloudConfig);

  const location = await handleProjectPitfallPost({
    action: input.action,
    form,
    projectId: project.id,
    store,
  });
  invalidateProjectPitfallsListCache(project.id);
  return { kind: "redirect", location };
};
