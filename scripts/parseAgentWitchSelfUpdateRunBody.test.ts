import { describe, expect, it } from "vitest";

import { parseAgentWitchSelfUpdateRunBody } from "./parseAgentWitchSelfUpdateRunBody";

describe("parseAgentWitchSelfUpdateRunBody", () => {
  it("defaults force to false (AGENT-030)", () => {
    expect(parseAgentWitchSelfUpdateRunBody(null)).toEqual({ force: false });
    expect(parseAgentWitchSelfUpdateRunBody({})).toEqual({ force: false });
  });

  it("reads force true (AGENT-030)", () => {
    expect(parseAgentWitchSelfUpdateRunBody({ force: true })).toEqual({
      force: true,
    });
  });
});
