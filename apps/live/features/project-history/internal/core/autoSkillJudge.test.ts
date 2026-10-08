import { describe, expect, it, vi } from "vitest";

import { createCompleterAutoSkillJudge } from "./autoSkillJudge";
import type { AutoSkillVerdict } from "./autoSkill.types";
import {
  createOllamaAutoSkillCompleter,
  probeAutoSkillOllamaModel,
} from "./autoSkillOllama";
import { prefilterAutoSkillCandidates } from "./autoSkillPromptSimilarity";

const reply = (id: string, verdict: string): string =>
  JSON.stringify({
    verdicts: [{ id, verdict, reason: "same flow", cluster: "Release Notes" }],
  });

const memoryCache = (): Parameters<typeof createCompleterAutoSkillJudge>[1] => {
  const map = new Map<string, AutoSkillVerdict>();
  return { get: (k) => map.get(k), set: (k, v) => void map.set(k, v) };
};

describe("createCompleterAutoSkillJudge", () => {
  it("parses strict JSON verdicts and normalizes the cluster id", async () => {
    const judge = createCompleterAutoSkillJudge(
      async () => ({ ok: true, text: `noise ${reply("a", "similar")} tail` }),
      memoryCache(),
    );
    const out = await judge({
      newPrompt: "x",
      candidates: [{ id: "a", prompt: "y" }],
    });
    expect(out).toEqual({
      ok: true,
      verdicts: [
        {
          candidateId: "a",
          verdict: "SIMILAR",
          reason: "same flow",
          clusterId: "release-notes",
        },
      ],
    });
  });

  it("retries once on unparseable output, then reports failure", async () => {
    const completer = vi.fn(async () => ({
      ok: true as const,
      text: "not json",
    }));
    const out = await createCompleterAutoSkillJudge(
      completer,
      memoryCache(),
    )({
      newPrompt: "x",
      candidates: [{ id: "a", prompt: "y" }],
    });
    expect(out.ok).toBe(false);
    expect(completer).toHaveBeenCalledTimes(2);
  });

  it("does not re-send cached prompt pairs", async () => {
    const completer = vi.fn(async () => ({
      ok: true as const,
      text: reply("a", "SAME"),
    }));
    const judge = createCompleterAutoSkillJudge(completer, memoryCache());
    const input = { newPrompt: "x", candidates: [{ id: "a", prompt: "y" }] };
    await judge(input);
    const second = await judge(input);
    expect(completer).toHaveBeenCalledTimes(1);
    expect(second.ok && second.verdicts[0]?.verdict).toBe("SAME");
  });
});

describe("Ollama adapter (mocked HTTP)", () => {
  it("picks an installed chat model, skipping embeddings", async () => {
    const fetchFn = vi.fn(async () =>
      Response.json({
        models: [{ name: "nomic-embed-text:latest" }, { name: "mistral:7b" }],
      }),
    ) as unknown as typeof fetch;
    expect(await probeAutoSkillOllamaModel(fetchFn)).toBe("mistral:7b");
  });

  it("returns null when Ollama is down or only has embeddings", async () => {
    const down = vi.fn(async () => {
      throw new Error("ECONNREFUSED");
    }) as unknown as typeof fetch;
    expect(await probeAutoSkillOllamaModel(down)).toBeNull();
    const onlyEmbed = vi.fn(async () =>
      Response.json({ models: [{ name: "nomic-embed-text:latest" }] }),
    ) as unknown as typeof fetch;
    expect(await probeAutoSkillOllamaModel(onlyEmbed)).toBeNull();
  });

  it("chats with temperature 0 and strict json format", async () => {
    const fetchFn = vi.fn(async () =>
      Response.json({ message: { content: reply("a", "SAME") } }),
    );
    const complete = createOllamaAutoSkillCompleter(
      "mistral:7b",
      fetchFn as unknown as typeof fetch,
    );
    const out = await complete({ prompt: "p", json: true, timeoutMs: 1000 });
    expect(out.ok).toBe(true);
    const body = JSON.parse(
      String(
        (fetchFn.mock.calls[0] as unknown[])[1] &&
          ((fetchFn.mock.calls[0] as unknown[])[1] as { body: string }).body,
      ),
    );
    expect(body).toMatchObject({
      model: "mistral:7b",
      format: "json",
      options: { temperature: 0 },
      stream: false,
    });
  });

  it("maps HTTP failure to a reason, never throws", async () => {
    const fetchFn = vi.fn(async () => new Response("x", { status: 500 }));
    const out = await createOllamaAutoSkillCompleter(
      "m",
      fetchFn as unknown as typeof fetch,
    )({
      prompt: "p",
      json: true,
      timeoutMs: 1000,
    });
    expect(out).toEqual({ ok: false, reason: "ollama_http_500" });
  });
});

describe("prefilterAutoSkillCandidates", () => {
  const run = (runId: string, prompt: string) => ({
    runId,
    prompt,
    resultSummary: "",
    completedAt: "2026-10-08T10:00:00Z",
    writerAgent: null,
  });

  it("keeps the closest earlier prompts and drops unrelated ones", () => {
    const out = prefilterAutoSkillCandidates(
      "write release notes for v2 changelog",
      [
        run("a", "write release notes for v1 changelog"),
        run("b", "fix the login button color"),
      ],
    );
    expect(out.map((c) => c.id)).toEqual(["a"]);
  });
});
