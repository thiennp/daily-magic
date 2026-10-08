import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  embedKnowledgeText,
  isKnowledgeEmbedBackingOff,
  resetKnowledgeEmbedBreakerForTests,
} from "./embedKnowledgeText";

beforeEach(() => {
  resetKnowledgeEmbedBreakerForTests();
});

afterEach(() => {
  vi.unstubAllGlobals();
  resetKnowledgeEmbedBreakerForTests();
});

describe("embedKnowledgeText", () => {
  it("backs off after a failure so a down Ollama costs one attempt per minute", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("down"));
    vi.stubGlobal("fetch", fetchMock);
    expect(await embedKnowledgeText("a", 400)).toBeNull();
    expect(await embedKnowledgeText("b", 400)).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(isKnowledgeEmbedBackingOff()).toBe(true);
    expect(isKnowledgeEmbedBackingOff(Date.now() + 61_000)).toBe(false);
  });

  it("reads the first embedding and clears the back-off on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ embeddings: [[0.1, 0.2]] }),
      }),
    );
    expect(await embedKnowledgeText("a", 400)).toEqual([0.1, 0.2]);
    expect(isKnowledgeEmbedBackingOff()).toBe(false);
  });

  it("treats a malformed body as a failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
    );
    expect(await embedKnowledgeText("a", 400)).toBeNull();
    expect(isKnowledgeEmbedBackingOff()).toBe(true);
  });
});
