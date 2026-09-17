import type { AgentWitchCloudProject } from "./agentWitchCloudApi";
import type AgentWitchProjectView from "./agentWitchProjectView.type";

export const mapAgentWitchCloudProjectsToViews = (
  cloudProjects: readonly AgentWitchCloudProject[],
): readonly AgentWitchProjectView[] =>
  cloudProjects.map((project) => ({
    id: project.id,
    name: project.name,
    projectFolderPath: project.folderPath,
  }));

export const findAgentWitchProjectById = (
  projects: readonly AgentWitchProjectView[],
  projectId: string,
): AgentWitchProjectView | null =>
  projects.find((project) => project.id === projectId) ?? null;
