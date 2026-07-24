import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME } from "./agentWitchProjectStorage.constants";
import {
  resolveAgentWitchProjectStorageLayout,
  type AgentWitchProjectStorageLayout,
} from "./resolveAgentWitchProjectStorageLayout";

export type EnsureAgentWitchProjectFolderInput = {
  readonly projectFolderPath: string;
  readonly projectId?: string;
  readonly projectName?: string;
};

export type EnsureAgentWitchProjectFolderResult = {
  readonly ok: true;
  readonly layout: AgentWitchProjectStorageLayout;
};

const writeProjectMetaIfMissing = (
  layout: AgentWitchProjectStorageLayout,
  input: EnsureAgentWitchProjectFolderInput,
): void => {
  if (fs.existsSync(layout.metaFilePath)) {
    return;
  }

  const meta = {
    projectFolderPath: layout.projectFolderPath,
    ...(input.projectId !== undefined ? { projectId: input.projectId } : {}),
    ...(input.projectName !== undefined ? { name: input.projectName } : {}),
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(layout.metaFilePath, `${JSON.stringify(meta, null, 2)}\n`);
};

const touchProjectStorageFiles = (
  layout: AgentWitchProjectStorageLayout,
): void => {
  if (!fs.existsSync(layout.ragChunksFilePath)) {
    fs.writeFileSync(layout.ragChunksFilePath, "");
  }

  const memoryRunsPath = path.join(
    layout.memoryDirPath,
    AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME,
  );

  if (!fs.existsSync(memoryRunsPath)) {
    fs.writeFileSync(memoryRunsPath, "");
  }
};

export const ensureAgentWitchProjectFolder = (
  input: EnsureAgentWitchProjectFolderInput,
): EnsureAgentWitchProjectFolderResult => {
  const layout = resolveAgentWitchProjectStorageLayout(input.projectFolderPath);

  fs.mkdirSync(layout.resolvedProjectFolderPath, { recursive: true });
  fs.mkdirSync(layout.ragDirPath, { recursive: true });
  fs.mkdirSync(layout.memoryDirPath, { recursive: true });
  writeProjectMetaIfMissing(layout, input);
  touchProjectStorageFiles(layout);

  return { ok: true, layout };
};
