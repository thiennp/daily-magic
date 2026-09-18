import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_APP_HOST,
  AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN,
  AGENT_WITCH_LOCAL_APP_ORIGIN,
  AGENT_WITCH_LOCAL_APP_PORT,
} from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

describe("agentWitchLocalAppPort.constant", () => {
  it("advertises only the IPv4 loopback origin", () => {
    expect(AGENT_WITCH_LOCAL_APP_HOST).toBe("127.0.0.1");
    expect(AGENT_WITCH_LOCAL_APP_PORT).toBe(43347);
    expect(AGENT_WITCH_LOCAL_APP_ORIGIN).toBe("http://127.0.0.1:43347");
    expect(AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN).toBe(
      AGENT_WITCH_LOCAL_APP_ORIGIN,
    );
    expect(AGENT_WITCH_LOCAL_APP_ORIGIN).not.toContain("local.agentwitch.com");
  });
});
