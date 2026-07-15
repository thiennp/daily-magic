import { describe, expect, it } from "vitest";

import { deriveInstructionsUrlFromWsUrl } from "@/lib/agentWitch/instructions/deriveInstructionsUrlFromWsUrl";

describe("deriveInstructionsUrlFromWsUrl", () => {
  it("maps ws app socket to instructions http endpoint", () => {
    expect(
      deriveInstructionsUrlFromWsUrl("ws://localhost:3000/api/agent-witch/ws"),
    ).toBe("http://localhost:3000/api/agent-witch/instructions");
  });

  it("maps wss production socket to https instructions endpoint", () => {
    expect(
      deriveInstructionsUrlFromWsUrl(
        "wss://daily.example.com/api/agent-witch/ws",
      ),
    ).toBe("https://daily.example.com/api/agent-witch/instructions");
  });
});
