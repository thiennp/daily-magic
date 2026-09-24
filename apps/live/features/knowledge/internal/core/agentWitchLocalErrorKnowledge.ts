import fs from "node:fs";
import path from "node:path";

import redactTextForProjectKnowledge from "../../../projects/internal/core/knowledge/redactTextForProjectKnowledge";
import resolveAgentWitchKnowledgeTelemetryPaths from "../../../projects/internal/core/knowledge/resolveAgentWitchKnowledgeTelemetryPaths";
import trimRagChunksToCeiling from "../../../projects/internal/core/knowledge/trimRagChunksToCeiling";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  chunkTextForRag,
  embedTextWithOllama,
  type AgentWitchRagChunk,
} from "./agentWitchLocalRag";

const readErrorChunks = (errorChunksFilePath: string): AgentWitchRagChunk[] => {
  if (!fs.existsSync(errorChunksFilePath)) {
    return [];
  }

  const lines = fs
    .readFileSync(errorChunksFilePath, "utf8")
    .split("\n")
    .filter(Boolean);
  const chunks: AgentWitchRagChunk[] = [];

  for (const line of lines) {
    try {
      chunks.push(JSON.parse(line) as AgentWitchRagChunk);
    } catch {
      // skip malformed lines
    }
  }

  return chunks;
};

const cosineSimilarity = (a: number[], b: number[]): number => {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let index = 0; index < length; index += 1) {
    const av = a[index] ?? 0;
    const bv = b[index] ?? 0;
    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

export const indexAgentWitchErrorKnowledgeText = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly text: string;
  readonly source?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): Promise<number> => {
  const telemetryPaths = resolveAgentWitchKnowledgeTelemetryPaths(input);
  if (telemetryPaths === null) {
    return 0;
  }

  const redacted = redactTextForProjectKnowledge(input.text);
  const parts = chunkTextForRag(redacted, 600);
  if (parts.length === 0) {
    return 0;
  }

  const errorChunksFilePath = telemetryPaths.errorChunksFilePath;
  fs.mkdirSync(path.dirname(errorChunksFilePath), { recursive: true });

  let indexed = 0;
  for (const part of parts.slice(0, 3)) {
    const embedding = await embedTextWithOllama(part);
    if (embedding === null) {
      continue;
    }

    const chunk: AgentWitchRagChunk = {
      id: `err-${Date.now()}-${indexed}`,
      text: part,
      embedding,
      createdAt: new Date().toISOString(),
      source: input.source ?? "run.failure",
    };
    fs.appendFileSync(
      errorChunksFilePath,
      `${JSON.stringify(chunk)}\n`,
      "utf8",
    );
    indexed += 1;
  }

  trimRagChunksToCeiling(errorChunksFilePath, 200);

  return indexed;
};

export const queryAgentWitchErrorKnowledge = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly query: string;
  readonly limit?: number;
  readonly minScore?: number;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): Promise<AgentWitchRagChunk[]> => {
  const telemetryPaths = resolveAgentWitchKnowledgeTelemetryPaths(input);
  if (telemetryPaths === null) {
    return [];
  }

  const embedding = await embedTextWithOllama(input.query);
  if (embedding === null) {
    return [];
  }

  const minScore = input.minScore ?? 0.3;
  const chunks = readErrorChunks(telemetryPaths.errorChunksFilePath);

  return chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(embedding, chunk.embedding),
    }))
    .filter((entry) => entry.score >= minScore)
    .sort((left, right) => right.score - left.score)
    .slice(0, input.limit ?? 3)
    .map((entry) => entry.chunk);
};

export const formatErrorKnowledgeContextForPrompt = (
  chunks: readonly AgentWitchRagChunk[],
): string => {
  if (chunks.length === 0) {
    return "";
  }

  const body = chunks
    .map((chunk, index) => `[${index + 1}] ${chunk.text}`)
    .join("\n\n");

  return `Past failures on this Mac (avoid repeating):\n\n${body}\n\n---\n\n`;
};
