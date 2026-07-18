import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
  AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_PROD_WAKE_PORT,
  isLocalAgentWitchHostname,
  isLocalAgentWitchOrigin,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

describe("resolveAgentWitchAppHome", () => {
  it("AGENT-004 treats localhost hosts as the local app", () => {
    expect(isLocalAgentWitchHostname("localhost")).toBe(true);
    expect(isLocalAgentWitchHostname("127.0.0.1:3000")).toBe(true);
    expect(isLocalAgentWitchOrigin("http://localhost:3000")).toBe(true);
    expect(resolveAgentWitchAppHome("http://localhost:3000")).toEqual({
      installDirName: AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
      wakePort: AGENT_WITCH_LOCAL_WAKE_PORT,
      launchAgentPrefix: AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
      isLocalApp: true,
    });
  });

  it("treats production hosts as the prod app", () => {
    expect(isLocalAgentWitchHostname("www.agentwitch.com")).toBe(false);
    expect(isLocalAgentWitchOrigin("https://www.agentwitch.com")).toBe(false);
    expect(resolveAgentWitchAppHome("https://www.agentwitch.com")).toEqual({
      installDirName: AGENT_WITCH_PROD_INSTALL_DIR_NAME,
      wakePort: AGENT_WITCH_PROD_WAKE_PORT,
      launchAgentPrefix: AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
      isLocalApp: false,
    });
  });
});
