import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

export interface AgentWitchLocalProjectRegistryEntry {
  readonly id: string;
  readonly name: string;
  readonly projectFolderPath: string;
  readonly addedAt: string;
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

    return parsed.projects.filter(
      (entry) =>
        typeof entry.id === "string" &&
        typeof entry.name === "string" &&
        typeof entry.projectFolderPath === "string",
    );
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
    (entry) => entry.id === projectId,
  ) ?? null;
