import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { resolveSendTaskLinkWriterChoice } from "@/features/agent/utils/resolveSendTaskLinkWriterAgent";
import { resolvePreferredWriterAgent } from "@/features/agent/utils/resolvePreferredWriterAgent";

const writers = [
  { writerAgent: "claude-cli", ready: true, loggedIn: true },
  { writerAgent: "codex", ready: true, loggedIn: false },
] as Parameters<typeof resolvePreferredWriterAgent>[0]["writers"];

describe("resolveSendTaskLinkWriterChoice (9bad2e07)", () => {
  it("treats ?writerAgent= as explicit and a source run's writer as a preset", () => {
    expect(
      resolveSendTaskLinkWriterChoice({
        writerAgentFromUrl: "codex",
        writerAgentFromRun: "claude-cli",
      }),
    ).toEqual({ writerAgent: "codex", isExplicit: true });
    expect(
      resolveSendTaskLinkWriterChoice({
        writerAgentFromUrl: null,
        writerAgentFromRun: "codex",
      }),
    ).toEqual({ writerAgent: "codex", isExplicit: false });
    expect(
      resolveSendTaskLinkWriterChoice({
        writerAgentFromUrl: "nope",
        writerAgentFromRun: null,
      }),
    ).toBeNull();
  });

  it("keeps a not-signed-in Codex from a link, but not as a preset", () => {
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "codex",
        isExplicitPick: true,
        writers,
      }),
    ).toBe("codex");
    expect(
      resolvePreferredWriterAgent({
        writerAgent: "codex",
        isExplicitPick: false,
        writers,
      }),
    ).toBe("claude-cli");
  });

  it("routes the link writer through the honored path", () => {
    const source = readFileSync(
      "src/features/agent/hooks/useWsTestWriterAgentSelection.ts",
      "utf8",
    );
    expect(source).toContain(
      "honorLinkWriterAgent: delegated.honorLinkWriterAgent",
    );
  });
});
