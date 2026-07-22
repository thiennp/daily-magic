import path from "node:path";

import {
  AGENT_WITCH_PROJECT_MEMORY_DIR_NAME,
  AGENT_WITCH_PROJECT_META_DIR_NAME,
  AGENT_WITCH_PROJECT_META_FILE_NAME,
  AGENT_WITCH_PROJECT_RAG_CHUNKS_FILE_NAME,
  AGENT_WITCH_PROJECT_RAG_DIR_NAME,
} from "../src/lib/projects/agentWitchProjectStorage.constants";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

export type AgentWitchProjectStorageLayout = {
  readonly projectFolderPath: string;
  readonly resolvedProjectFolderPath: string;
  readonly metaDirPath: string;
  readonly ragDirPath: string;
  readonly memoryDirPath: string;
  readonly metaFilePath: string;
  readonly ragChunksFilePath: string;
};

export const resolveAgentWitchProjectStorageLayout = (
  projectFolderPath: string,
): AgentWitchProjectStorageLayout => {
  const resolvedProjectFolderPath =
    expandAgentWitchProjectFolderPath(projectFolderPath);
  const metaDirPath = path.join(
    resolvedProjectFolderPath,
    AGENT_WITCH_PROJECT_META_DIR_NAME,
  );

  return {
    projectFolderPath,
    resolvedProjectFolderPath,
    metaDirPath,
    ragDirPath: path.join(metaDirPath, AGENT_WITCH_PROJECT_RAG_DIR_NAME),
    memoryDirPath: path.join(metaDirPath, AGENT_WITCH_PROJECT_MEMORY_DIR_NAME),
    metaFilePath: path.join(metaDirPath, AGENT_WITCH_PROJECT_META_FILE_NAME),
    ragChunksFilePath: path.join(
      metaDirPath,
      AGENT_WITCH_PROJECT_RAG_DIR_NAME,
      AGENT_WITCH_PROJECT_RAG_CHUNKS_FILE_NAME,
    ),
  };
};
