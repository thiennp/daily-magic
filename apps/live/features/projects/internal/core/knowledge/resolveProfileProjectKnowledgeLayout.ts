import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  AGENT_WITCH_PROFILE_KNOWLEDGE_CHUNKS_FILE_NAME,
  AGENT_WITCH_PROFILE_KNOWLEDGE_DIR_NAME,
  AGENT_WITCH_PROFILE_KNOWLEDGE_LESSONS_FILE_NAME,
  AGENT_WITCH_PROFILE_PROJECTS_DIR_NAME,
} from "./agentWitchProfileKnowledge.constants";

export type ProfileProjectKnowledgeLayout = {
  readonly projectId: string;
  readonly knowledgeDirPath: string;
  readonly ragChunksFilePath: string;
  readonly memoryRunsFilePath: string;
};

const resolveProfileProjectKnowledgeLayout = (
  layout: AgentWitchLocalLayout,
  projectId: string,
): ProfileProjectKnowledgeLayout => {
  const trimmedId = projectId.trim();
  const knowledgeDirPath = path.join(
    layout.installDir,
    AGENT_WITCH_PROFILE_PROJECTS_DIR_NAME,
    trimmedId,
    AGENT_WITCH_PROFILE_KNOWLEDGE_DIR_NAME,
  );

  return {
    projectId: trimmedId,
    knowledgeDirPath,
    ragChunksFilePath: path.join(
      knowledgeDirPath,
      AGENT_WITCH_PROFILE_KNOWLEDGE_CHUNKS_FILE_NAME,
    ),
    memoryRunsFilePath: path.join(
      knowledgeDirPath,
      AGENT_WITCH_PROFILE_KNOWLEDGE_LESSONS_FILE_NAME,
    ),
  };
};

export default resolveProfileProjectKnowledgeLayout;
