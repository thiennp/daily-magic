import { describe, expect, it, vi, afterEach } from "vitest";

import { requestOllamaTaskEstimate } from "./requestOllamaTaskEstimate";

describe("requestOllamaTaskEstimate", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.AGENT_WITCH_OLLAMA_URL;
    delete process.env.AGENT_WITCH_ESTIMATE_MODEL;
  });

  it("returns the chat message from Ollama", async () => {
    process.env.AGENT_WITCH_OLLAMA_URL = "http://127.0.0.1:11434";
    process.env.AGENT_WITCH_ESTIMATE_MODEL = "qwen2.5:7b";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          message: { content: "[[WORKING_ESTIMATE]]\n120" },
        }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const text = await requestOllamaTaskEstimate("estimate this", "qwen2.5:7b");

    expect(text).toBe("[[WORKING_ESTIMATE]]\n120");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:11434/api/chat",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"model":"qwen2.5:7b"'),
      }),
    );
  });

  it("returns null when Ollama is unreachable or the body has no content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("connect ECONNREFUSED")),
    );
    expect(
      await requestOllamaTaskEstimate("estimate this", "qwen2.5:7b"),
    ).toBeNull();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({}),
      }),
    );
    expect(
      await requestOllamaTaskEstimate("estimate this", "qwen2.5:7b"),
    ).toBeNull();

    const emptyBodies: unknown[] = [
      null,
      { error: "missing" },
      { message: null },
      { message: "nope" },
      { message: {} },
      { message: { content: 120 } },
      { message: { content: "  " } },
    ];
    for (const body of emptyBodies) {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(body),
        }),
      );
      expect(
        await requestOllamaTaskEstimate("estimate this", "qwen2.5:7b"),
      ).toBeNull();
    }
  });
});
