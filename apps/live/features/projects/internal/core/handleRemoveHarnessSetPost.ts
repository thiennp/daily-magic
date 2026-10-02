import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import { readInstalledLocalHarnessSnapshot } from "@agent-witch/live-harness";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";

import {
  resolveAgentWitchCloudApiConfig,
  syncProjectHarnessBindingsToCloud,
} from "./agentWitchCloudApi";
import { buildAgentWitchLocalProjectEditorPageBody } from "./buildAgentWitchLocalProjectEditorPage";
import { ensureAgentWitchProjectFolder } from "./ensureAgentWitchProjectFolder";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";
import { fetchAgentWitchProjectsForLocalApp } from "./fetchAgentWitchProjectsForLocalApp";
import { findAgentWitchProjectById } from "./mapAgentWitchCloudProjectsToViews";
import {
  listLinkedHarnessSetSlugsFromMaterializationLedger,
  listLinkedHarnessSetSlugsFromProjectFolder,
} from "./listLinkedHarnessSetSlugsFromProjectFolder";
import { readAgentWitchMaterializationLedger } from "./readAgentWitchMaterializationLedger";
import { removeHarnessSetMaterializationFromLedger } from "./removeHarnessSetMaterialization";
import { resolveAgentWitchMaterializationPaths } from "./resolveAgentWitchMaterializationPaths";
import { writeAgentWitchMaterializationLedger } from "./writeAgentWitchMaterializationLedger";

export type RemoveHarnessSetPostResult =
  | { readonly kind: "not_found" }
  | { readonly kind: "redirect"; readonly location: string }
  | { readonly kind: "page"; readonly title: string; readonly body: string };

const failurePage = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly cloudAppOrigin: string;
  readonly project: {
    readonly id: string;
    readonly name: string;
    readonly projectFolderPath: string;
  };
  readonly errorMessage: string;
}): RemoveHarnessSetPostResult => ({
  kind: "page",
  title: input.project.name,
  body: buildAgentWitchLocalProjectEditorPageBody({
    project: input.project,
    cloudAppOrigin: input.cloudAppOrigin,
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

export const handleRemoveHarnessSetPost = async (input: {
  readonly rawBody: string;
  readonly layout: AgentWitchLocalLayout;
}): Promise<RemoveHarnessSetPostResult> => {
  const form = new URLSearchParams(input.rawBody);
  const projectId = form.get("projectId")?.trim() ?? "";
  const setSlug = form.get("setSlug")?.trim() ?? "";

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
  const cloudAppOrigin = cloudConfig?.appOrigin ?? AGENT_WITCH_DEFAULT_ORIGIN;

  if (setSlug.length === 0) {
    return failurePage({
      layout: input.layout,
      cloudAppOrigin,
      project,
      errorMessage: "Choose a harness set to remove from this repo.",
    });
  }

  const expandedProjectPath = expandAgentWitchProjectFolderPath(
    project.projectFolderPath,
  );
  const ensureResult = ensureAgentWitchProjectFolder({
    projectFolderPath: expandedProjectPath,
  });
  const { ledgerFilePath } = resolveAgentWitchMaterializationPaths(
    ensureResult.layout,
  );
  const ledger = readAgentWitchMaterializationLedger(ledgerFilePath);
  const previousSlugs =
    listLinkedHarnessSetSlugsFromMaterializationLedger(ledger);

  if (!previousSlugs.includes(setSlug)) {
    return failurePage({
      layout: input.layout,
      cloudAppOrigin,
      project,
      errorMessage: `Harness set "${setSlug}" is not materialized in this repo.`,
    });
  }

  const remainingSlugs = previousSlugs.filter((slug) => slug !== setSlug);
  const removal = removeHarnessSetMaterializationFromLedger({
    repoRoot: ensureResult.layout.resolvedProjectFolderPath,
    setSlugs: [setSlug],
    ledger,
  });
  writeAgentWitchMaterializationLedger(ledgerFilePath, removal.ledger);

  const bindingsSynced =
    cloudConfig === null
      ? false
      : await syncProjectHarnessBindingsToCloud(
          cloudConfig,
          project.id,
          remainingSlugs,
        );

  const redirectQuery = new URLSearchParams({
    linked: "1",
    removed: setSlug,
    files: String(removal.summary.removedPaths.length),
    bindingsSynced: bindingsSynced ? "1" : "0",
  });

  return {
    kind: "redirect",
    location: `/project?id=${encodeURIComponent(project.id)}&${redirectQuery.toString()}`,
  };
};
