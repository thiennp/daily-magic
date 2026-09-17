import type { AgentWitchCloudProject } from "./agentWitchCloudApi";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";
import type { LegacyAgentWitchProjectsRegistryEntry } from "./readLegacyAgentWitchProjectsRegistry";

export interface LegacyRegistryMigrationCandidate {
  readonly name: string;
  readonly folderPath: string;
}

const normalizeFolder = (folderPath: string): string =>
  expandAgentWitchProjectFolderPath(folderPath);

const cloudFolderSet = (
  cloudProjects: readonly AgentWitchCloudProject[],
): ReadonlySet<string> =>
  new Set(cloudProjects.map((project) => normalizeFolder(project.folderPath)));

const cloudIdSet = (
  cloudProjects: readonly AgentWitchCloudProject[],
): ReadonlySet<string> => new Set(cloudProjects.map((project) => project.id));

export const resolveLegacyRegistryProjectsToMigrate = (
  legacyEntries: readonly LegacyAgentWitchProjectsRegistryEntry[],
  cloudProjects: readonly AgentWitchCloudProject[],
): readonly LegacyRegistryMigrationCandidate[] => {
  const folders = cloudFolderSet(cloudProjects);
  const cloudIds = cloudIdSet(cloudProjects);
  const pending: LegacyRegistryMigrationCandidate[] = [];
  const seenFolders = new Set<string>();

  for (const entry of legacyEntries) {
    const normalized = normalizeFolder(entry.projectFolderPath);
    if (normalized.length === 0) {
      continue;
    }

    if (folders.has(normalized) || seenFolders.has(normalized)) {
      continue;
    }

    if (
      entry.cloudProjectId !== undefined &&
      cloudIds.has(entry.cloudProjectId)
    ) {
      continue;
    }

    seenFolders.add(normalized);
    pending.push({
      name: entry.name.trim(),
      folderPath: entry.projectFolderPath.trim(),
    });
  }

  return pending;
};
