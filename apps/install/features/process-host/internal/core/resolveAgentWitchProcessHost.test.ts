import { describe, expect, it } from "vitest";

import { resolveAgentWitchProcessHost } from "./resolveAgentWitchProcessHost";

describe("resolveAgentWitchProcessHost", () => {
  it("defaults to monolith when env flags are unset", () => {
    expect(
      resolveAgentWitchProcessHost({
        env: {},
      }),
    ).toEqual({
      mode: "monolith",
      skipInProcessBridge: false,
      skipInProcessLive: false,
    });
  });

  it("skips in-process bridge when AGENT_WITCH_EXTERNAL_BRIDGE is truthy", () => {
    expect(
      resolveAgentWitchProcessHost({
        env: { AGENT_WITCH_EXTERNAL_BRIDGE: "1" },
      }),
    ).toEqual({
      mode: "bridge-external",
      skipInProcessBridge: true,
      skipInProcessLive: false,
    });
  });

  it("skips in-process live when AGENT_WITCH_EXTERNAL_LIVE is truthy", () => {
    expect(
      resolveAgentWitchProcessHost({
        env: { AGENT_WITCH_EXTERNAL_LIVE: "yes" },
      }),
    ).toEqual({
      mode: "live-external",
      skipInProcessBridge: false,
      skipInProcessLive: true,
    });
  });

  it("skips both when both external flags are set", () => {
    expect(
      resolveAgentWitchProcessHost({
        env: {
          AGENT_WITCH_EXTERNAL_BRIDGE: "true",
          AGENT_WITCH_EXTERNAL_LIVE: "1",
        },
      }),
    ).toEqual({
      mode: "bridge-external",
      skipInProcessBridge: true,
      skipInProcessLive: true,
    });
  });
});
