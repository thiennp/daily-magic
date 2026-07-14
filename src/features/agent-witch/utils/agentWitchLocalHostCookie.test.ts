import { describe, expect, it } from "vitest";

import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
  AGENT_WITCH_LOCAL_HOST_COOKIE,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";

describe("agentWitchLocalHostCookie", () => {
  it("stores and reads the local hostname cookie", () => {
    Object.defineProperty(global, "document", {
      value: { cookie: "" },
      configurable: true,
    });

    setAgentWitchLocalHostCookie("Studio-Mac");
    expect(document.cookie).toContain(`${AGENT_WITCH_LOCAL_HOST_COOKIE}=`);
    expect(readAgentWitchLocalHostCookie()).toBe("Studio-Mac");
  });
});
