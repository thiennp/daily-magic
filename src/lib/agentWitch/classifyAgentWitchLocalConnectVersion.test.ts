import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { classifyAgentWitchLocalConnectVersion } from "@/lib/agentWitch/classifyAgentWitchLocalConnectVersion";

describe("classifyAgentWitchLocalConnectVersion", () => {
  it.each([
    [null, "too_old"],
    [undefined, "too_old"],
    ["", "too_old"],
    ["   ", "too_old"],
    ["abc", "too_old"],
    ["v260", "too_old"],
    ["26x", "too_old"],
    ["12.5", "too_old"],
    ["-1", "too_old"],
    ["0", "too_old"],
    ["34", "too_old"],
    [AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION, "ok"],
    ["36", "ok"],
    ["260", "ok"],
    [" 35 ", "ok"],
  ] as const)("classifies %j as %s (default min)", (version, expected) => {
    expect(classifyAgentWitchLocalConnectVersion(version)).toBe(expected);
  });

  it("honors an explicit min override", () => {
    expect(classifyAgentWitchLocalConnectVersion("99", "100")).toBe("too_old");
    expect(classifyAgentWitchLocalConnectVersion("100", "100")).toBe("ok");
    expect(classifyAgentWitchLocalConnectVersion(" 260 ", "100")).toBe("ok");
  });
});
