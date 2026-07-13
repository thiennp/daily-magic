import { describe, expect, it } from "vitest";

import { resolveDelegatedWriterAgent } from "@/lib/dispatch/resolveDelegatedWriterAgent";

describe("resolveDelegatedWriterAgent", () => {
  it("defaults to claude-cli when writerAgent is missing", () => {
    expect(resolveDelegatedWriterAgent({ prompt: "run tests" })).toBe(
      "claude-cli",
    );
  });

  it("returns a valid writer agent from the payload", () => {
    expect(
      resolveDelegatedWriterAgent({ prompt: "run tests", writerAgent: "cursor" }),
    ).toBe("cursor");
  });
});
