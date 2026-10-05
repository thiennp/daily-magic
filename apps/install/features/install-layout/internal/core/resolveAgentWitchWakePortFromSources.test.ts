import { describe, expect, it } from "vitest";

import { resolveAgentWitchWakePortFromSources } from "./resolveAgentWitchWakePortFromSources";

describe("resolveAgentWitchWakePortFromSources", () => {
  it("prefers wake-port.json over the LaunchAgent env (drifted 49273 vs 61774)", () => {
    expect(
      resolveAgentWitchWakePortFromSources({
        filePort: 49273,
        envValue: "61774",
        defaultPort: 47892,
      }),
    ).toBe(49273);
  });

  it("falls back to AGENT_WITCH_WAKE_PORT when wake-port.json is missing", () => {
    expect(
      resolveAgentWitchWakePortFromSources({
        filePort: null,
        envValue: " 61774 ",
        defaultPort: 47892,
      }),
    ).toBe(61774);
  });

  it("falls back to the install-root default for a missing or invalid env value", () => {
    for (const envValue of [undefined, "", "abc", "0", "70000", "123abc"]) {
      expect(
        resolveAgentWitchWakePortFromSources({
          filePort: null,
          envValue,
          defaultPort: 47893,
        }),
      ).toBe(47893);
    }
  });
});
