const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_EMBED_MODEL = "nomic-embed-text";

const readEmbedding = (body: unknown): number[] | null => {
  if (typeof body !== "object" || body === null || !("embedding" in body)) {
    return null;
  }

  const embedding = (body as { embedding: unknown }).embedding;
  if (!Array.isArray(embedding) || embedding.length === 0) {
    return null;
  }

  const numbers = embedding.filter(
    (value): value is number =>
      typeof value === "number" && Number.isFinite(value),
  );
  return numbers.length === embedding.length ? numbers : null;
};

/** Ollama embeddings for estimate-history retrieval. Null when Ollama is down. */
export const requestOllamaEmbedding = async (
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
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      return null;
    }
    return readEmbedding(await response.json());
  } catch {
    return null;
  }
};
