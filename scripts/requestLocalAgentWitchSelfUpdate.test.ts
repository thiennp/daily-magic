import { describe, expect, it } from "vitest";

import { resolveLocalAgentWitchSelfUpdateUrl } from "./requestLocalAgentWitchSelfUpdate";

describe("requestLocalAgentWitchSelfUpdate", () => {
  it("targets the local wake server update endpoint (AGENT-030)", () => {
    expect(resolveLocalAgentWitchSelfUpdateUrl()).toMatch(
      /^http:\/\/127\.0\.0\.1:\d+\/update\/run$/,
    );
  });
});
