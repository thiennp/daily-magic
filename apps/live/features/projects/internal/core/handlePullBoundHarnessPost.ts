import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import {
  pullBoundHarnessBundlesIntoProjectCursor,
  readInstalledLocalHarnessSnapshot,
} from "@agent-witch/live-harness";

import { buildAgentWitchLocalProjectEditorPageBody } from "./buildAgentWitchLocalProjectEditorPage";
import { fetchAgentWitchProjectsForLocalApp } from "./fetchAgentWitchProjectsForLocalApp";
import fetchBoundHarnessBundlesFromCloud from "./fetchBoundHarnessBundlesFromCloud";
import { findAgentWitchProjectById } from "./mapAgentWitchCloudProjectsToViews";
import { listLinkedHarnessSetSlugsFromProjectFolder } from "./listLinkedHarnessSetSlugsFromProjectFolder";
import {
  resolveAgentWitchCloudApiConfig,
  syncProjectHarnessBindingsToCloud,
} from "./agentWitchCloudApi";

export type PullBoundHarnessPostResult =
  | { readonly kind: "not_found" }
  | { readonly kind: "redirect"; readonly location: string }
  | { readonly kind: "page"; readonly title: string; readonly body: string };

const failurePage = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly project: {
    readonly id: string;
    readonly name: string;
    readonly projectFolderPath: string;
  };
  readonly errorMessage: string;
}): PullBoundHarnessPostResult => ({
  kind: "page",
  title: input.project.name,
  body: buildAgentWitchLocalProjectEditorPageBody({
    project: input.project,
    installed: readInstalledLocalHarnessSnapshot(input.layout),
    linkedSetSlugs: listLinkedHarnessSetSlugsFromProjectFolder(
      input.project.projectFolderPath,
    ),
    composition: null,
    knowledgeCandidateCount: 0,
    activeTab: "harness",
    flashError: input.errorMessage,
  }),
});

export const handlePullBoundHarnessPost = async (input: {
  readonly rawBody: string;
  readonly layout: AgentWitchLocalLayout;
}): Promise<PullBoundHarnessPostResult> => {
  const projectId =
    new URLSearchParams(input.rawBody).get("projectId")?.trim() ?? "";
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
  const bundles =
    cloudConfig === null
      ? null
      : await fetchBoundHarnessBundlesFromCloud(cloudConfig, project.id);

  if (bundles === null) {
    return failurePage({
      layout: input.layout,
      project,
      errorMessage:
        "Could not load the linked playbook from Agent Witch Console.",
    });
  }

  const applyResult = pullBoundHarnessBundlesIntoProjectCursor({
    layout: input.layout,
    projectFolderPath: project.projectFolderPath,
    bundles,
  });

  if (!applyResult.ok) {
    return failurePage({
      layout: input.layout,
      project,
      errorMessage: applyResult.errorMessage,
    });
  }

  const bindingsSynced =
    cloudConfig === null
      ? false
      : await syncProjectHarnessBindingsToCloud(
          cloudConfig,
          project.id,
          applyResult.appliedSetSlugs,
        );
  const redirectQuery = new URLSearchParams({
    linked: "1",
    files: String(applyResult.writtenFileCount),
    bindingsSynced: bindingsSynced ? "1" : "0",
  });

  return {
    kind: "redirect",
    location: `/project?id=${encodeURIComponent(project.id)}&${redirectQuery.toString()}`,
  };
};
