import { describe, expect, it } from "vitest";

import { classifyAgentWitchLocalConnectVersion } from "@/lib/agentWitch/classifyAgentWitchLocalConnectVersion";

describe("classifyAgentWitchLocalConnectVersion", () => {
  it.each([null, undefined, "", "   ", "abc", "v260", "26x"])(
    "treats %j as too_old",
    (version) => {
      expect(classifyAgentWitchLocalConnectVersion(version, "100")).toBe(
        "too_old",
      );
    },
  );

  it("is too_old below the min bundle and ok at/above it", () => {
    expect(classifyAgentWitchLocalConnectVersion("99", "100")).toBe("too_old");
    expect(classifyAgentWitchLocalConnectVersion("100", "100")).toBe("ok");
    expect(classifyAgentWitchLocalConnectVersion(" 260 ", "100")).toBe("ok");
  });

  it("uses the shared min constant by default", () => {
    expect(classifyAgentWitchLocalConnectVersion("260")).toBe("ok");
    expect(classifyAgentWitchLocalConnectVersion(null)).toBe("too_old");
  });
});
