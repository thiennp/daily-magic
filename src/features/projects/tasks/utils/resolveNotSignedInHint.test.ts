import { describe, expect, it } from "vitest";

import { resolveTaskResultBlock } from "@/features/projects/tasks/utils/resolveTaskResultBlock";

describe("not-signed-in hint", () => {
  it("names the tool from writerAgent", () => {
    const r = resolveTaskResultBlock({
      status: "failed",
      resultOutput: "Not logged in · Please run /login",
      writerAgent: "claude-cli",
    });
    expect(r?.hint).toBe(
      "Claude Code isn't signed in on this computer. Sign in to it in Terminal, or pick another coding tool and send the task again.",
    );
  });
  it("detects the machine code and falls back to a generic name", () => {
    const r = resolveTaskResultBlock({
      status: "failed",
      resultOutput: "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
    });
    expect(r?.hint).toMatch(/^The coding tool isn't signed in/);
  });
  it("has no hint for other failures", () => {
    const r = resolveTaskResultBlock({
      status: "failed",
      resultOutput: "boom",
    });
    expect(r?.hint).toBeNull();
  });
});
