import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type AgentWitchProjectView from "./agentWitchProjectView.type";

/** @deprecated Use `AgentWitchProjectView` — project metadata lives in AWC DB only. */
export type AgentWitchLocalProjectRegistryEntry = AgentWitchProjectView;

/**
 * @deprecated Removed `projects-registry.json`. Load projects with
 * `fetchAgentWitchProjectsForLocalApp` instead.
 */
export const readAgentWitchLocalProjectsRegistry = (
  layout: AgentWitchLocalLayout,
): readonly AgentWitchLocalProjectRegistryEntry[] => {
  void layout;
  return [];
};

/**
 * @deprecated Create projects in Agent Witch Console (`/projects`).
 */
export const addAgentWitchLocalProjectToRegistry = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly projectFolderPath: string;
    readonly name?: string;
  },
): AgentWitchLocalProjectRegistryEntry => {
  void layout;
  void input;
  throw new Error(
    "Local-only project registry was removed. Create the project in Agent Witch Console.",
  );
};

/**
 * @deprecated Pass the in-memory list from `fetchAgentWitchProjectsForLocalApp`
 * and use `findAgentWitchProjectById`.
 */
export const findAgentWitchLocalProjectById = (
  layout: AgentWitchLocalLayout,
  projectId: string,
): AgentWitchLocalProjectRegistryEntry | null => {
  void layout;
  void projectId;
  return null;
};

/**
 * @deprecated No-op — cloud DB is the source of truth.
 */
export const mergeCloudProjectsIntoLocalRegistry = (
  layout: AgentWitchLocalLayout,
  cloudProjects: readonly {
    readonly id: string;
    readonly name: string;
    readonly folderPath: string;
  }[],
): { readonly added: number; readonly updated: number } => {
  void layout;
  void cloudProjects;
  return { added: 0, updated: 0 };
};
