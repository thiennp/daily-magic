import path from "node:path";

import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";
import readAgentWitchProjectMetaFile from "./knowledge/readAgentWitchProjectMetaFile";

/**
 * Walk cwd → parents for a saved project folder (`.agent-witch/project.json`
 * with a projectId). Returns null when no ancestor is a linked project.
 */
export const resolveAgentWitchProjectIdFromCwd = (
  cwd: string,
): string | null => {
  const start = path.resolve(expandAgentWitchProjectFolderPath(cwd));
  const walk = (folder: string): string | null => {
    const { projectId } = readAgentWitchProjectMetaFile(folder);
    if (projectId !== null) {
      return projectId;
    }
    const parent = path.dirname(folder);
    return parent === folder ? null : walk(parent);
  };
  return walk(start);
};
