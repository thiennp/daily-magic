import { describe, expect, it } from "vitest";

import { buildMacBootstrapSchemeRedirectUrl } from "@/lib/agentWitch/macBootstrap/buildMacBootstrapSchemeRedirectUrl";

describe("buildMacBootstrapSchemeRedirectUrl", () => {
  it("builds success and error scheme URLs", () => {
    expect(
      buildMacBootstrapSchemeRedirectUrl({ state: "s1", code: "c1" }),
    ).toBe("agentwitch-local://install?state=s1&code=c1");
    expect(
      buildMacBootstrapSchemeRedirectUrl({
        state: "s1",
        error: "expired",
      }),
    ).toBe("agentwitch-local://install?state=s1&error=expired");
  });
});
