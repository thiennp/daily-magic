import fs from "node:fs";

import { AGENT_WITCH_REPO_KNOWLEDGE_POINTER_FILE_NAME } from "./agentWitchProfileKnowledge.constants";
import { resolveAgentWitchProjectStorageLayout } from "../resolveAgentWitchProjectStorageLayout";

const writeRepoKnowledgeLocationPointer = (input: {
  readonly projectFolderPath: string;
  readonly projectId: string;
}): void => {
  const storage = resolveAgentWitchProjectStorageLayout(
    input.projectFolderPath,
  );
  const pointerPath = `${storage.metaDirPath}/${AGENT_WITCH_REPO_KNOWLEDGE_POINTER_FILE_NAME}`;

  const payload = {
    schemaVersion: 1,
    projectId: input.projectId,
    message:
      "Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",
    profileKnowledgePath: `projects/${input.projectId}/knowledge`,
  };

  fs.mkdirSync(storage.metaDirPath, { recursive: true });
  fs.writeFileSync(pointerPath, `${JSON.stringify(payload, null, 2)}\n`);
};

export default writeRepoKnowledgeLocationPointer;
