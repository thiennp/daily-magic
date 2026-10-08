const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_EMBED_MODEL = "nomic-embed-text";
const QUERY_CACHE_LIMIT = 64;

export const KNOWLEDGE_INDEX_EMBED_TIMEOUT_MS = 5_000;

const queryVectorCache = new Map<string, Float32Array>();

export const resolveKnowledgeEmbedModel = (): string =>
  process.env.AGENT_WITCH_EMBED_MODEL?.trim() || DEFAULT_EMBED_MODEL;

const readEmbeddingFromBody = (body: unknown): number[] | null => {
  if (typeof body !== "object" || body === null || !("embeddings" in body)) {
    return null;
  }
  const { embeddings } = body as { embeddings: unknown };
  if (!Array.isArray(embeddings) || !Array.isArray(embeddings[0])) {
    return null;
  }
  return embeddings[0] as number[];
};

/** Ollama `/api/embed`; null on any failure or timeout (callers degrade). */
export const embedKnowledgeText = async (
  text: string,
  timeoutMs: number,
): Promise<number[] | null> => {
  const baseUrl =
    process.env.AGENT_WITCH_OLLAMA_URL?.trim() || DEFAULT_OLLAMA_URL;
  try {
    const response = await fetch(`${baseUrl}/api/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: resolveKnowledgeEmbedModel(),
        input: text,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    return response.ok ? readEmbeddingFromBody(await response.json()) : null;
  } catch {
    return null;
  }
};

/** Query embedding with a small LRU cache (same prompt re-sent, retries). */
export const embedKnowledgeQuery = async (
  text: string,
  timeoutMs: number,
): Promise<Float32Array | null> => {
  const cached = queryVectorCache.get(text);
  if (cached !== undefined) {
    queryVectorCache.delete(text);
    queryVectorCache.set(text, cached);
    return cached;
  }
  const embedding = await embedKnowledgeText(text, timeoutMs);
  if (embedding === null) {
    return null;
  }
  const vector = new Float32Array(embedding);
  queryVectorCache.set(text, vector);
  if (queryVectorCache.size > QUERY_CACHE_LIMIT) {
    const oldest = queryVectorCache.keys().next().value;
    if (oldest !== undefined) {
      queryVectorCache.delete(oldest);
    }
  }
  return vector;
};
