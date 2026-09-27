import { afterEach, describe, expect, it, vi } from "vitest";

import { requestOllamaChat } from "./requestOllamaChat";

describe("requestOllamaChat", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.AGENT_WITCH_OLLAMA_URL;
  });

  it("returns the chat message for a named model", async () => {
    process.env.AGENT_WITCH_OLLAMA_URL = "http://127.0.0.1:11434";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: { content: "Improved prompt" } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const text = await requestOllamaChat({
      model: "qwen2.5:7b",
      prompt: "Rewrite this",
    });

    expect(text).toBe("Improved prompt");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:11434/api/chat",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"num_predict":1200'),
      }),
    );
  });

  it("returns null for an empty call, a failed response, or a body without text", async () => {
    expect(await requestOllamaChat({ model: " ", prompt: "x" })).toBeNull();
    expect(await requestOllamaChat({ model: "qwen", prompt: " " })).toBeNull();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("connect ECONNREFUSED")),
    );
    expect(
      await requestOllamaChat({ model: "qwen2.5:7b", prompt: "Judge" }),
    ).toBeNull();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({}),
      }),
    );
    expect(
      await requestOllamaChat({ model: "qwen2.5:7b", prompt: "Judge" }),
    ).toBeNull();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: { content: "  " } }),
      }),
    );
    expect(
      await requestOllamaChat({ model: "qwen2.5:7b", prompt: "Judge" }),
    ).toBeNull();
  });
});
