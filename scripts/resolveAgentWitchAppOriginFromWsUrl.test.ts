import { describe, expect, it } from "vitest";

import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";

describe("resolveAgentWitchAppOriginFromWsUrl", () => {
  it("maps wss URLs to https origins without path", () => {
    expect(
      resolveAgentWitchAppOriginFromWsUrl(
        "wss://daily-magic.example/api/agent-witch/ws",
      ),
    ).toBe("https://daily-magic.example");
  });

  it("maps ws URLs to http origins", () => {
    expect(
      resolveAgentWitchAppOriginFromWsUrl(
        "ws://localhost:3000/api/agent-witch/ws",
      ),
    ).toBe("http://localhost:3000");
  });

  it("returns null for invalid URLs", () => {
    expect(resolveAgentWitchAppOriginFromWsUrl("not-a-url")).toBeNull();
  });
});
