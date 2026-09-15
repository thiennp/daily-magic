import { describe, expect, it } from "vitest";

import { runLocalSelfDelegatedTask } from "./runLocalSelfDelegatedTask";

describe("runLocalSelfDelegatedTask", () => {
  it("rejects empty prompt without touching cloud", async () => {
    const result = await runLocalSelfDelegatedTask({
      prompt: "   ",
      writerAgent: "claude-cli",
    });

    expect(result.ok).toBe(false);
    expect(result.errorMessage).toContain("required");
  });

  it("rejects unsupported writer agents", async () => {
    const result = await runLocalSelfDelegatedTask({
      prompt: "hello",
      writerAgent: "cursor-cloud",
    });

    expect(result.ok).toBe(false);
    expect(result.errorMessage).toContain("Unsupported");
  });
});
