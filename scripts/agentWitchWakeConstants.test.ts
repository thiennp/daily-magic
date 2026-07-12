import { describe, expect, it } from "vitest";

import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

describe("resolveAgentWitchWakePort", () => {
  it("returns the default port when env is unset", () => {
    const previous = process.env.AGENT_WITCH_WAKE_PORT;
    delete process.env.AGENT_WITCH_WAKE_PORT;

    expect(resolveAgentWitchWakePort()).toBe(47892);

    if (previous !== undefined) {
      process.env.AGENT_WITCH_WAKE_PORT = previous;
    }
  });

  it("reads a valid port from env", () => {
    const previous = process.env.AGENT_WITCH_WAKE_PORT;
    process.env.AGENT_WITCH_WAKE_PORT = "49123";

    expect(resolveAgentWitchWakePort()).toBe(49123);

    if (previous !== undefined) {
      process.env.AGENT_WITCH_WAKE_PORT = previous;
    } else {
      delete process.env.AGENT_WITCH_WAKE_PORT;
    }
  });
});
