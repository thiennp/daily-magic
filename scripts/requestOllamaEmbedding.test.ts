import { afterEach, describe, expect, it, vi } from "vitest";

import { requestOllamaEmbedding } from "./requestOllamaEmbedding";

describe("requestOllamaEmbedding", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.AGENT_WITCH_OLLAMA_URL;
    delete process.env.AGENT_WITCH_EMBED_MODEL;
  });

  it("returns the embedding vector from Ollama", async () => {
    process.env.AGENT_WITCH_OLLAMA_URL = "http://127.0.0.1:11434";
    process.env.AGENT_WITCH_EMBED_MODEL = "nomic-embed-text";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ embedding: [0.1, 0.2] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const embedding = await requestOllamaEmbedding("fix the login form");

    expect(embedding).toEqual([0.1, 0.2]);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:11434/api/embeddings",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("returns null when Ollama is unreachable or the body is not a vector", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("connect ECONNREFUSED")),
    );
    expect(await requestOllamaEmbedding("fix the login form")).toBeNull();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ embedding: ["nope"] }),
      }),
    );
    expect(await requestOllamaEmbedding("fix the login form")).toBeNull();
  });
});
