import { describe, expect, it } from "vitest";

import { resolvePreferredWriterAgent } from "@/features/agent/utils/resolvePreferredWriterAgent";

/** Heartbeat from the 37874fdc QA box: Codex signed out, agy and Claude ready. */
const qaWriters = [
  { writerAgent: "claude-cli", ready: true, loggedIn: null },
  { writerAgent: "codex", ready: true, loggedIn: false },
  { writerAgent: "antigravity", ready: true, loggedIn: null },
];

describe("resolvePreferredWriterAgent (37874fdc)", () => {
  it("never defaults to a remembered writer that cannot run", () => {
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "codex",
        isExplicitPick: false,
        writers: qaWriters,
      }),
    ).toBe("claude-cli");
  });

  it("skips not-ready writers when choosing the default", () => {
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "codex",
        isExplicitPick: false,
        writers: [
          { writerAgent: "claude-cli", ready: false },
          { writerAgent: "codex", ready: false },
          { writerAgent: "antigravity", ready: true },
        ],
      }),
    ).toBe("antigravity");
  });

  it("keeps a remembered writer that can run", () => {
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "antigravity",
        isExplicitPick: false,
        writers: qaWriters,
      }),
    ).toBe("antigravity");
  });

  it("an explicit pick sticks even when that writer is not ready", () => {
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "codex",
        isExplicitPick: true,
        writers: qaWriters,
      }),
    ).toBe("codex");
  });

  it("keeps the remembered writer when readiness is unknown or none can run", () => {
    const base = { writerAgent: "codex", isExplicitPick: false } as const;
    expect(resolvePreferredWriterAgent({ ...base, writers: undefined })).toBe(
      "codex",
    );
    expect(
      resolvePreferredWriterAgent({
        ...base,
        writers: [{ writerAgent: "antigravity", ready: false }],
      }),
    ).toBe("codex");
  });

  it("72ae6076: a link / last-picked Codex (Not signed in) yields the first Ready writer", () => {
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "codex",
        isExplicitPick: false,
        writers: [
          { writerAgent: "claude-cli", ready: true, loggedIn: true },
          { writerAgent: "codex", ready: true, loggedIn: false },
          { writerAgent: "cursor", ready: false },
          { writerAgent: "antigravity", ready: true, loggedIn: null },
        ],
      }),
    ).toBe("claude-cli");
  });
});
