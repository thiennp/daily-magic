import type { AgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  createAgentWitchCloudProject,
  fetchAgentWitchCloudProjects,
  resolveAgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import {
  archiveLegacyAgentWitchProjectsRegistry,
  readLegacyAgentWitchProjectsRegistry,
} from "./readLegacyAgentWitchProjectsRegistry";
import { resolveLegacyRegistryProjectsToMigrate } from "./resolveLegacyRegistryProjectsToMigrate";

export interface MigrateLegacyProjectsRegistryResult {
  readonly migratedCount: number;
  readonly skippedCount: number;
  readonly failedCount: number;
}

export const migrateLegacyProjectsRegistryToCloud = async (
  layout: AgentWitchLocalLayout,
  runConfig: AgentWitchRunConfig,
): Promise<MigrateLegacyProjectsRegistryResult> => {
  const legacyEntries = readLegacyAgentWitchProjectsRegistry(layout);
  if (legacyEntries.length === 0) {
    return { migratedCount: 0, skippedCount: 0, failedCount: 0 };
  }

  const cloudConfig = resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });

  if (cloudConfig === null) {
    return {
      migratedCount: 0,
      skippedCount: legacyEntries.length,
      failedCount: 0,
    };
  }

  const cloudProjects = await fetchAgentWitchCloudProjects(cloudConfig);
  if (cloudProjects === null) {
    return {
      migratedCount: 0,
      skippedCount: legacyEntries.length,
      failedCount: 0,
    };
  }

  const toMigrate = resolveLegacyRegistryProjectsToMigrate(
    legacyEntries,
    cloudProjects,
  );
  const skippedCount = legacyEntries.length - toMigrate.length;

  let migratedCount = 0;
  let failedCount = 0;

  for (const candidate of toMigrate) {
    const created = await createAgentWitchCloudProject(cloudConfig, {
      name: candidate.name,
      folderPath: candidate.folderPath,
    });

    if (created) {
      migratedCount += 1;
    } else {
      failedCount += 1;
    }
  }

  if (failedCount === 0) {
    archiveLegacyAgentWitchProjectsRegistry(layout);
  }

  return { migratedCount, skippedCount, failedCount };
};
