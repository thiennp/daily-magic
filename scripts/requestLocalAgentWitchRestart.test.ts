import { describe, expect, it } from "vitest";

import { resolveLocalAgentWitchRestartUrl } from "./requestLocalAgentWitchRestart";

describe("requestLocalAgentWitchRestart", () => {
  it("targets the local wake server restart endpoint", () => {
    expect(resolveLocalAgentWitchRestartUrl()).toMatch(
      /^http:\/\/127\.0\.0\.1:\d+\/restart$/,
    );
  });
});
