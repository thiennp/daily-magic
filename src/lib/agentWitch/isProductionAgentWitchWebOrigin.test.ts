import { describe, expect, it } from "vitest";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { isProductionAgentWitchWebOrigin } from "@/lib/agentWitch/isProductionAgentWitchWebOrigin";

describe("isProductionAgentWitchWebOrigin", () => {
  it("matches canonical production origin", () => {
    expect(isProductionAgentWitchWebOrigin(AGENT_WITCH_DEFAULT_ORIGIN)).toBe(
      true,
    );
    expect(isProductionAgentWitchWebOrigin("https://agentwitch.com")).toBe(
      true,
    );
  });

  it("does not match local dev origins", () => {
    expect(isProductionAgentWitchWebOrigin("http://localhost:3000")).toBe(
      false,
    );
    expect(isProductionAgentWitchWebOrigin("http://127.0.0.1:3000")).toBe(
      false,
    );
  });
});
