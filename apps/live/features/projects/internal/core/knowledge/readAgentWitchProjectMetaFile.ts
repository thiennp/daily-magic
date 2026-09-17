import fs from "node:fs";

import { resolveAgentWitchProjectStorageLayout } from "../resolveAgentWitchProjectStorageLayout";

export type AgentWitchProjectMetaFile = {
  readonly projectId: string | null;
  readonly projectFolderPath: string | null;
};

const readAgentWitchProjectMetaFile = (
  projectFolderPath: string,
): AgentWitchProjectMetaFile => {
  const layout = resolveAgentWitchProjectStorageLayout(projectFolderPath);

  if (!fs.existsSync(layout.metaFilePath)) {
    return { projectId: null, projectFolderPath: layout.projectFolderPath };
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.metaFilePath, "utf8"),
    );

    if (typeof parsed !== "object" || parsed === null) {
      return { projectId: null, projectFolderPath: layout.projectFolderPath };
    }

    const record = parsed as {
      projectId?: unknown;
      projectFolderPath?: unknown;
    };
    const projectId =
      typeof record.projectId === "string" && record.projectId.trim().length > 0
        ? record.projectId.trim()
        : null;

    return { projectId, projectFolderPath: layout.projectFolderPath };
  } catch {
    return { projectId: null, projectFolderPath: layout.projectFolderPath };
  }
};

export default readAgentWitchProjectMetaFile;
