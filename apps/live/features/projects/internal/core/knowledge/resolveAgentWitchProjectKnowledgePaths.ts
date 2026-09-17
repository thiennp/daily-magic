import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME } from "../agentWitchProjectStorage.constants";
import { resolveAgentWitchProjectStorageLayout } from "../resolveAgentWitchProjectStorageLayout";
import migrateLegacyRepoKnowledgeToProfile from "./migrateLegacyRepoKnowledgeToProfile";
import readAgentWitchProjectMetaFile from "./readAgentWitchProjectMetaFile";
import resolveProfileProjectKnowledgeLayout from "./resolveProfileProjectKnowledgeLayout";

export type AgentWitchProjectKnowledgePaths = {
  readonly ragChunksFilePath: string;
  readonly memoryRunsFilePath: string;
  readonly projectId: string | null;
};

const resolveAgentWitchProjectKnowledgePaths = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): AgentWitchProjectKnowledgePaths | null => {
  const folder = input.projectFolderPath?.trim() ?? "";

  if (folder.length === 0) {
    return null;
  }

  const meta = readAgentWitchProjectMetaFile(folder);
  const resolvedProjectId =
    input.projectId?.trim() || meta.projectId?.trim() || "";

  if (resolvedProjectId.length > 0) {
    migrateLegacyRepoKnowledgeToProfile({
      layout: input.layout,
      projectFolderPath: folder,
      projectId: resolvedProjectId,
    });

    const profile = resolveProfileProjectKnowledgeLayout(
      input.layout,
      resolvedProjectId,
    );

    return {
      ragChunksFilePath: profile.ragChunksFilePath,
      memoryRunsFilePath: profile.memoryRunsFilePath,
      projectId: resolvedProjectId,
    };
  }

  const repo = resolveAgentWitchProjectStorageLayout(folder);

  return {
    ragChunksFilePath: repo.ragChunksFilePath,
    memoryRunsFilePath: path.join(
      repo.memoryDirPath,
      AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME,
    ),
    projectId: null,
  };
};

export default resolveAgentWitchProjectKnowledgePaths;
