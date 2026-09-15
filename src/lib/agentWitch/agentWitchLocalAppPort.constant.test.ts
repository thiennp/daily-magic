import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_APP_HOST,
  AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN,
  AGENT_WITCH_LOCAL_APP_ORIGIN,
  AGENT_WITCH_LOCAL_APP_PORT,
} from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

describe("agentWitchLocalAppPort.constant", () => {
  it("advertises loopback and local.agentwitch.com origins (AGENT-028)", () => {
    expect(AGENT_WITCH_LOCAL_APP_HOST).toBe("local.agentwitch.com");
    expect(AGENT_WITCH_LOCAL_APP_PORT).toBe(43347);
    expect(AGENT_WITCH_LOCAL_APP_ORIGIN).toBe(
      "http://local.agentwitch.com:43347",
    );
    expect(AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN).toBe(
      "http://127.0.0.1:43347",
    );
  });
});
