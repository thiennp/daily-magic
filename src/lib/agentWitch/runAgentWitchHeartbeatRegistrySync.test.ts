import { afterEach, describe, expect, it, vi } from "vitest";

import { runAgentWitchHeartbeatRegistrySync } from "@/lib/agentWitch/runAgentWitchHeartbeatRegistrySync";

describe("runAgentWitchHeartbeatRegistrySync", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("no-ops without logging when DATABASE_URL is unset", async () => {
    vi.stubEnv("DATABASE_URL", "");
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await runAgentWitchHeartbeatRegistrySync({
      senderId: "agent-1",
      userId: "user-1",
      deviceId: "device-1",
    });

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
