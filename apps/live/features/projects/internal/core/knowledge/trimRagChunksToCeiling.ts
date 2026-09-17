import fs from "node:fs";

import { AGENT_WITCH_PROJECT_RAG_CHUNK_CEILING } from "./agentWitchProfileKnowledge.constants";

const trimRagChunksToCeiling = (
  chunksFilePath: string,
  ceiling: number = AGENT_WITCH_PROJECT_RAG_CHUNK_CEILING,
): void => {
  if (!fs.existsSync(chunksFilePath)) {
    return;
  }

  const lines = fs
    .readFileSync(chunksFilePath, "utf8")
    .split("\n")
    .filter(Boolean);

  if (lines.length <= ceiling) {
    return;
  }

  const trimmed = lines.slice(lines.length - ceiling);
  fs.writeFileSync(chunksFilePath, `${trimmed.join("\n")}\n`);
};

export default trimRagChunksToCeiling;
