import { describe, expect, it } from "vitest";

import { parseAgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

describe("parseAgentRunDispatchBody", () => {
  it("parses a minimal dispatch body", () => {
    expect(parseAgentRunDispatchBody({ prompt: " run lint " })).toEqual({
      prompt: "run lint",
      groupId: null,
      capabilityId: null,
    });
  });

  it("parses delegated dispatch fields", () => {
    expect(
      parseAgentRunDispatchBody({
        prompt: "ship it",
        writerAgent: "codex",
        targetUserId: "user-2",
        groupId: "group-1",
        capabilityId: "cap-1",
        targetDeviceId: "device-1",
      }),
    ).toEqual({
      prompt: "ship it",
      writerAgent: "codex",
      targetUserId: "user-2",
      groupId: "group-1",
      capabilityId: "cap-1",
      targetDeviceId: "device-1",
    });
  });

  it("rejects empty prompts", () => {
    expect(parseAgentRunDispatchBody({ prompt: "   " })).toBeNull();
    expect(parseAgentRunDispatchBody(null)).toBeNull();
  });
});
