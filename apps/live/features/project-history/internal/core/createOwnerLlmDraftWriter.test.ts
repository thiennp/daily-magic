import { describe, expect, it, vi } from "vitest";

import {
  createOwnerLlmDraftWriter,
  type OwnerLlmCliRunner,
} from "./createOwnerLlmDraftWriter";

const skillMd = `---
name: deploy-staging
description: Deploy and verify.
version: 0.1.0
source_message_ids: []
status: draft
---
## Steps
1. Build
2. Deploy
`;

describe("createOwnerLlmDraftWriter", () => {
  it("dry-run returns a stub skill without calling CLI", async () => {
    const runCli = vi.fn<OwnerLlmCliRunner>();
    const writer = createOwnerLlmDraftWriter({ dryRun: true, runCli });
    const result = await writer({
      scrubbedTranscript: "x",
      similarDraftHints: [],
      mode: "write",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.skillMarkdown).toContain("history-skill-dry-run");
    }
    expect(runCli).not.toHaveBeenCalled();
  });

  it("one write call uses Cursor then succeeds", async () => {
    const runCli: OwnerLlmCliRunner = vi.fn(async (input) => {
      expect(input.writerAgent).toBe("cursor");
      return {
        ok: true as const,
        text: `\`\`\`markdown\n${skillMd}\n\`\`\``,
        tokensUsed: 10,
      };
    });
    const writer = createOwnerLlmDraftWriter({ runCli, dryRun: false });
    const result = await writer({
      scrubbedTranscript: "tests green",
      similarDraftHints: [],
      mode: "write",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.skillMarkdown).toContain("deploy-staging");
      expect(result.tokensUsed).toBe(10);
    }
    expect(runCli).toHaveBeenCalledTimes(1);
  });

  it("falls back to Codex when Cursor fails", async () => {
    const runCli: OwnerLlmCliRunner = vi.fn(async (input) => {
      if (input.writerAgent === "cursor") {
        return {
          ok: false as const,
          reason: "writer_start_failed",
          tokensUsed: 1,
        };
      }
      return { ok: true as const, text: skillMd, tokensUsed: 5 };
    });
    const writer = createOwnerLlmDraftWriter({ runCli, dryRun: false });
    const result = await writer({
      scrubbedTranscript: "tests green",
      similarDraftHints: [],
      mode: "write",
    });
    expect(result.ok).toBe(true);
    expect(runCli).toHaveBeenCalledTimes(2);
  });

  it("reflect_then_write makes reflect then write (with Codex fallback on reflect)", async () => {
    const calls: string[] = [];
    const runCli: OwnerLlmCliRunner = vi.fn(async (input) => {
      calls.push(`${input.writerAgent}:${input.prompt.slice(0, 20)}`);
      if (input.prompt.includes("Do NOT invent secrets")) {
        if (input.writerAgent === "cursor") {
          return { ok: false as const, reason: "usage_limit", tokensUsed: 2 };
        }
        return { ok: true as const, text: "reflection outline", tokensUsed: 3 };
      }
      return { ok: true as const, text: skillMd, tokensUsed: 7 };
    });
    const writer = createOwnerLlmDraftWriter({ runCli, dryRun: false });
    const result = await writer({
      scrubbedTranscript: "long transcript",
      similarDraftHints: [{ name: "a", description: "b" }],
      mode: "reflect_then_write",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.tokensUsed).toBe(3 + 7); // successful turns only
    }
    expect(calls.some((c) => c.startsWith("cursor:"))).toBe(true);
    expect(calls.some((c) => c.startsWith("codex:"))).toBe(true);
  });

  it("returns failure when both writers fail", async () => {
    const runCli: OwnerLlmCliRunner = vi.fn(async () => ({
      ok: false as const,
      reason: "writer_timeout",
      tokensUsed: 0,
    }));
    const writer = createOwnerLlmDraftWriter({ runCli, dryRun: false });
    const result = await writer({
      scrubbedTranscript: "x",
      similarDraftHints: [],
      mode: "write",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toContain("cursor:");
      expect(result.reason).toContain("codex:");
    }
  });

  it("returns failure when output is unparseable", async () => {
    const runCli: OwnerLlmCliRunner = vi.fn(async () => ({
      ok: true as const,
      text: "no skill here",
      tokensUsed: 4,
    }));
    const writer = createOwnerLlmDraftWriter({ runCli, dryRun: false });
    const result = await writer({
      scrubbedTranscript: "x",
      similarDraftHints: [],
      mode: "write",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("empty_or_unparseable_skill_markdown");
    }
  });

  it("fails reflect_then_write when reflect fails on both agents", async () => {
    const runCli: OwnerLlmCliRunner = vi.fn(async () => ({
      ok: false as const,
      reason: "writer_start_failed",
      tokensUsed: 1,
    }));
    const writer = createOwnerLlmDraftWriter({ runCli, dryRun: false });
    const result = await writer({
      scrubbedTranscript: "x",
      similarDraftHints: [],
      mode: "reflect_then_write",
    });
    expect(result.ok).toBe(false);
  });
});
