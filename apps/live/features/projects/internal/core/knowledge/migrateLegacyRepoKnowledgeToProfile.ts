import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME } from "../agentWitchProjectStorage.constants";
import { resolveAgentWitchProjectStorageLayout } from "../resolveAgentWitchProjectStorageLayout";
import resolveProfileProjectKnowledgeLayout from "./resolveProfileProjectKnowledgeLayout";
import writeRepoKnowledgeLocationPointer from "./writeRepoKnowledgeLocationPointer";

const copyFileIfSourceExistsAndTargetEmpty = (
  sourcePath: string,
  targetPath: string,
): void => {
  if (!fs.existsSync(sourcePath)) {
    return;
  }

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
};

const migrateLegacyRepoKnowledgeToProfile = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath: string;
  readonly projectId: string;
}): void => {
  const repo = resolveAgentWitchProjectStorageLayout(input.projectFolderPath);
  const profile = resolveProfileProjectKnowledgeLayout(
    input.layout,
    input.projectId,
  );
  const legacyMemoryPath = `${repo.memoryDirPath}/${AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME}`;

  copyFileIfSourceExistsAndTargetEmpty(
    repo.ragChunksFilePath,
    profile.ragChunksFilePath,
  );
  copyFileIfSourceExistsAndTargetEmpty(
    legacyMemoryPath,
    profile.memoryRunsFilePath,
  );

  writeRepoKnowledgeLocationPointer({
    projectFolderPath: input.projectFolderPath,
    projectId: input.projectId,
  });
};

export default migrateLegacyRepoKnowledgeToProfile;
