import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

const withIsolatedAgentWitchHome = (run: () => void): void => {
  const tempHome = fs.mkdtempSync(path.join(os.tmpdir(), "aw-wake-port-test-"));
  const previousHome = process.env.AGENT_WITCH_HOME;
  process.env.AGENT_WITCH_HOME = tempHome;

  try {
    run();
  } finally {
    if (previousHome !== undefined) {
      process.env.AGENT_WITCH_HOME = previousHome;
    } else {
      delete process.env.AGENT_WITCH_HOME;
    }
    fs.rmSync(tempHome, { recursive: true, force: true });
  }
};

describe("resolveAgentWitchWakePort", () => {
  afterEach(() => {
    delete process.env.AGENT_WITCH_WAKE_PORT;
  });

  it("returns the default port when env is unset", () => {
    withIsolatedAgentWitchHome(() => {
      delete process.env.AGENT_WITCH_WAKE_PORT;
      expect(resolveAgentWitchWakePort()).toBe(47892);
    });
  });

  it("reads a valid port from env", () => {
    withIsolatedAgentWitchHome(() => {
      process.env.AGENT_WITCH_WAKE_PORT = "49123";
      expect(resolveAgentWitchWakePort()).toBe(49123);
    });
  });
});
