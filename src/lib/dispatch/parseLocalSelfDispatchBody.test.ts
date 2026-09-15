import { describe, expect, it } from "vitest";

import { parseLocalSelfDispatchBody } from "@/lib/dispatch/parseLocalSelfDispatchBody";

describe("parseLocalSelfDispatchBody", () => {
  it("parses a valid local self-dispatch payload", () => {
    expect(
      parseLocalSelfDispatchBody({
        agentRunId: "run-1",
        prompt: "Summarize README",
        writerAgent: "claude-cli",
      }),
    ).toEqual({
      agentRunId: "run-1",
      prompt: "Summarize README",
      writerAgent: "claude-cli",
    });
  });

  it("rejects cursor-cloud and invalid payloads", () => {
    expect(
      parseLocalSelfDispatchBody({
        agentRunId: "run-1",
        prompt: "x",
        writerAgent: "cursor-cloud",
      }),
    ).toBeNull();

    expect(parseLocalSelfDispatchBody({ prompt: "x" })).toBeNull();
  });
});
