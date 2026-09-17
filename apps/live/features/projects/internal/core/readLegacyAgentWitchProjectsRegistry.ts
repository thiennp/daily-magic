import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

export interface LegacyAgentWitchProjectsRegistryEntry {
  readonly id: string;
  readonly name: string;
  readonly projectFolderPath: string;
  readonly addedAt: string;
  readonly cloudProjectId?: string;
}

interface AgentWitchLocalProjectsRegistryFile {
  readonly version: 1;
  readonly projects: LegacyAgentWitchProjectsRegistryEntry[];
}

export const legacyAgentWitchProjectsRegistryPath = (
  layout: AgentWitchLocalLayout,
): string => path.join(layout.harnessRootDir, "projects-registry.json");

const isRegistryFile = (
  value: unknown,
): value is AgentWitchLocalProjectsRegistryFile =>
  typeof value === "object" &&
  value !== null &&
  (value as { version?: unknown }).version === 1 &&
  Array.isArray((value as { projects?: unknown }).projects);

export const readLegacyAgentWitchProjectsRegistry = (
  layout: AgentWitchLocalLayout,
): readonly LegacyAgentWitchProjectsRegistryEntry[] => {
  const filePath = legacyAgentWitchProjectsRegistryPath(layout);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!isRegistryFile(parsed)) {
      return [];
    }

    return parsed.projects
      .filter(
        (entry) =>
          typeof entry.id === "string" &&
          typeof entry.name === "string" &&
          typeof entry.projectFolderPath === "string",
      )
      .map((entry) => ({
        id: entry.id,
        name: entry.name,
        projectFolderPath: entry.projectFolderPath,
        addedAt:
          typeof entry.addedAt === "string"
            ? entry.addedAt
            : new Date().toISOString(),
        ...(typeof entry.cloudProjectId === "string" &&
        entry.cloudProjectId.length > 0
          ? { cloudProjectId: entry.cloudProjectId }
          : {}),
      }));
  } catch {
    return [];
  }
};

export const archiveLegacyAgentWitchProjectsRegistry = (
  layout: AgentWitchLocalLayout,
): void => {
  const filePath = legacyAgentWitchProjectsRegistryPath(layout);
  if (!fs.existsSync(filePath)) {
    return;
  }

  const archivedPath = `${filePath}.migrated`;
  if (fs.existsSync(archivedPath)) {
    fs.unlinkSync(filePath);
    return;
  }

  fs.renameSync(filePath, archivedPath);
};
