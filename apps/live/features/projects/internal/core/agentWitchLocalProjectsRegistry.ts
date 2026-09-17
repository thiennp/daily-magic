import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

export interface AgentWitchLocalProjectRegistryEntry {
  readonly id: string;
  readonly name: string;
  readonly projectFolderPath: string;
  readonly addedAt: string;
  readonly cloudProjectId?: string;
}

export interface CloudProjectRegistrySyncInput {
  readonly id: string;
  readonly name: string;
  readonly folderPath: string;
}

interface AgentWitchLocalProjectsRegistryFile {
  readonly version: 1;
  readonly projects: AgentWitchLocalProjectRegistryEntry[];
}

const registryFilePath = (layout: AgentWitchLocalLayout): string =>
  path.join(layout.harnessRootDir, "projects-registry.json");

const isRegistryFile = (
  value: unknown,
): value is AgentWitchLocalProjectsRegistryFile =>
  typeof value === "object" &&
  value !== null &&
  (value as { version?: unknown }).version === 1 &&
  Array.isArray((value as { projects?: unknown }).projects);

export const readAgentWitchLocalProjectsRegistry = (
  layout: AgentWitchLocalLayout,
): readonly AgentWitchLocalProjectRegistryEntry[] => {
  const filePath = registryFilePath(layout);
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

const writeAgentWitchLocalProjectsRegistry = (
  layout: AgentWitchLocalLayout,
  projects: readonly AgentWitchLocalProjectRegistryEntry[],
): void => {
  fs.mkdirSync(layout.harnessRootDir, { recursive: true });
  const payload: AgentWitchLocalProjectsRegistryFile = {
    version: 1,
    projects: [...projects],
  };
  fs.writeFileSync(
    registryFilePath(layout),
    `${JSON.stringify(payload, null, 2)}\n`,
  );
};

export const addAgentWitchLocalProjectToRegistry = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly projectFolderPath: string;
    readonly name?: string;
  },
): AgentWitchLocalProjectRegistryEntry => {
  const resolved = expandAgentWitchProjectFolderPath(input.projectFolderPath);
  const name = input.name?.trim() || path.basename(resolved) || "Project";

  const existing = readAgentWitchLocalProjectsRegistry(layout);
  const duplicate = existing.find(
    (entry) =>
      expandAgentWitchProjectFolderPath(entry.projectFolderPath) === resolved,
  );
  if (duplicate !== undefined) {
    return duplicate;
  }

  const created: AgentWitchLocalProjectRegistryEntry = {
    id: randomUUID(),
    name,
    projectFolderPath: input.projectFolderPath.trim(),
    addedAt: new Date().toISOString(),
  };

  writeAgentWitchLocalProjectsRegistry(layout, [...existing, created]);
  return created;
};

export const findAgentWitchLocalProjectById = (
  layout: AgentWitchLocalLayout,
  projectId: string,
): AgentWitchLocalProjectRegistryEntry | null =>
  readAgentWitchLocalProjectsRegistry(layout).find(
    (entry) => entry.id === projectId || entry.cloudProjectId === projectId,
  ) ?? null;

const normalizeProjectFolderPath = (projectFolderPath: string): string =>
  expandAgentWitchProjectFolderPath(projectFolderPath);

export const mergeCloudProjectsIntoLocalRegistry = (
  layout: AgentWitchLocalLayout,
  cloudProjects: readonly CloudProjectRegistrySyncInput[],
): { readonly added: number; readonly updated: number } => {
  const existing = readAgentWitchLocalProjectsRegistry(layout);
  const now = new Date().toISOString();
  let added = 0;
  let updated = 0;

  const nextEntries = [...existing];

  for (const cloudProject of cloudProjects) {
    const normalizedFolder = normalizeProjectFolderPath(
      cloudProject.folderPath,
    );
    const index = nextEntries.findIndex(
      (entry) =>
        entry.cloudProjectId === cloudProject.id ||
        entry.id === cloudProject.id ||
        normalizeProjectFolderPath(entry.projectFolderPath) ===
          normalizedFolder,
    );

    if (index === -1) {
      nextEntries.push({
        id: cloudProject.id,
        cloudProjectId: cloudProject.id,
        name: cloudProject.name,
        projectFolderPath: cloudProject.folderPath,
        addedAt: now,
      });
      added += 1;
      continue;
    }

    const previous = nextEntries[index];
    const merged: AgentWitchLocalProjectRegistryEntry = {
      ...previous,
      name: cloudProject.name,
      projectFolderPath: cloudProject.folderPath,
      cloudProjectId: cloudProject.id,
    };

    if (
      merged.name !== previous.name ||
      merged.projectFolderPath !== previous.projectFolderPath ||
      merged.cloudProjectId !== previous.cloudProjectId
    ) {
      updated += 1;
    }

    nextEntries[index] = merged;
  }

  writeAgentWitchLocalProjectsRegistry(layout, nextEntries);
  return { added, updated };
};
