import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  AGENT_WITCH_PROFILE_KNOWLEDGE_ERROR_CHUNKS_FILE_NAME,
  AGENT_WITCH_PROFILE_KNOWLEDGE_USAGE_STATS_FILE_NAME,
} from "./agentWitchProfileKnowledge.constants";
import resolveAgentWitchProjectKnowledgePaths from "./resolveAgentWitchProjectKnowledgePaths";

export type AgentWitchKnowledgeTelemetryPaths = {
  readonly knowledgeDirPath: string;
  readonly usageStatsFilePath: string;
  readonly errorChunksFilePath: string;
};

const resolveAgentWitchKnowledgeTelemetryPaths = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): AgentWitchKnowledgeTelemetryPaths | null => {
  const knowledgePaths = resolveAgentWitchProjectKnowledgePaths(input);

  if (knowledgePaths === null) {
    return null;
  }

  const knowledgeDirPath = path.dirname(knowledgePaths.ragChunksFilePath);

  return {
    knowledgeDirPath,
    usageStatsFilePath: path.join(
      knowledgeDirPath,
      AGENT_WITCH_PROFILE_KNOWLEDGE_USAGE_STATS_FILE_NAME,
    ),
    errorChunksFilePath: path.join(
      knowledgeDirPath,
      AGENT_WITCH_PROFILE_KNOWLEDGE_ERROR_CHUNKS_FILE_NAME,
    ),
  };
};

export default resolveAgentWitchKnowledgeTelemetryPaths;
