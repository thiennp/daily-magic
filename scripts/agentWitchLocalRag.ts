import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const RAG_DIR_NAME = "rag";
const CHUNKS_FILE_NAME = "chunks.ndjson";
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_EMBED_MODEL = "nomic-embed-text";

export type AgentWitchRagChunk = {
  readonly id: string;
  readonly text: string;
  readonly embedding: number[];
  readonly createdAt: string;
  readonly source?: string;
};

const resolveRagDir = (layout: AgentWitchLocalLayout): string =>
  path.join(layout.installDir, RAG_DIR_NAME);

const resolveChunksPath = (layout: AgentWitchLocalLayout): string =>
  path.join(resolveRagDir(layout), CHUNKS_FILE_NAME);

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

export const chunkTextForRag = (text: string, maxChars = 800): string[] => {
  const cleaned = text.trim();
  if (cleaned.length === 0) {
    return [];
  }
  const chunks: string[] = [];
  let offset = 0;
  while (offset < cleaned.length) {
    chunks.push(cleaned.slice(offset, offset + maxChars));
    offset += maxChars;
  }
  return chunks;
};

export const embedTextWithOllama = async (
  text: string,
): Promise<number[] | null> => {
  const baseUrl =
    process.env.AGENT_WITCH_OLLAMA_URL?.trim() || DEFAULT_OLLAMA_URL;
  const model =
    process.env.AGENT_WITCH_EMBED_MODEL?.trim() || DEFAULT_EMBED_MODEL;
  try {
    const response = await fetch(`${baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: text }),
    });
    if (!response.ok) {
      return null;
    }
    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      "embedding" in body &&
      Array.isArray((body as { embedding: unknown }).embedding)
    ) {
      return (body as { embedding: number[] }).embedding;
    }
    return null;
  } catch {
    return null;
  }
};

export const readAgentWitchRagChunks = (
  layout: AgentWitchLocalLayout,
): AgentWitchRagChunk[] => {
  const chunksPath = resolveChunksPath(layout);
  if (!fs.existsSync(chunksPath)) {
    return [];
  }
  const lines = fs.readFileSync(chunksPath, "utf8").split("\n").filter(Boolean);
  const chunks: AgentWitchRagChunk[] = [];
  for (const line of lines) {
    try {
      chunks.push(JSON.parse(line) as AgentWitchRagChunk);
    } catch {
      // skip
    }
  }
  return chunks;
};

export const indexAgentWitchRagText = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly text: string;
  readonly source?: string;
}): Promise<number> => {
  const parts = chunkTextForRag(input.text);
  if (parts.length === 0) {
    return 0;
  }
  const ragDir = resolveRagDir(input.layout);
  fs.mkdirSync(ragDir, { recursive: true });
  const chunksPath = resolveChunksPath(input.layout);
  let indexed = 0;
  for (const part of parts) {
    const embedding = await embedTextWithOllama(part);
    if (embedding === null) {
      continue;
    }
    const chunk: AgentWitchRagChunk = {
      id: `${Date.now()}-${indexed}`,
      text: part,
      embedding,
      createdAt: new Date().toISOString(),
      ...(input.source !== undefined ? { source: input.source } : {}),
    };
    fs.appendFileSync(chunksPath, `${JSON.stringify(chunk)}\n`, "utf8");
    indexed += 1;
  }
  return indexed;
};

export const queryAgentWitchRag = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly query: string;
  readonly limit?: number;
}): Promise<AgentWitchRagChunk[]> => {
  const embedding = await embedTextWithOllama(input.query);
  if (embedding === null) {
    return [];
  }
  const chunks = readAgentWitchRagChunks(input.layout);
  const scored = chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(embedding, chunk.embedding),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, input.limit ?? 5);
  return scored.map((entry) => entry.chunk);
};

export const formatRagContextForPrompt = (
  chunks: AgentWitchRagChunk[],
): string => {
  if (chunks.length === 0) {
    return "";
  }
  const body = chunks
    .map((chunk, index) => `[${index + 1}] ${chunk.text}`)
    .join("\n\n");
  return `Local knowledge (from this Mac):\n\n${body}\n\n---\n\n`;
};
