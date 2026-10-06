import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./kickstartAgentWitchLaunchAgent", () => ({
  kickstartAgentWitchLaunchAgent: vi.fn(),
}));

vi.mock("./listAgentWitchLaunchTargets", () => ({
  listAgentWitchLaunchTargets: vi.fn(() => [
    { profileEmail: null, launchAgentLabel: "com.agent-witch" },
  ]),
}));

import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { kickstartAgentWitchClientLaunchAgents } from "./kickstartAgentWitchClientLaunchAgents";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";

describe("kickstartAgentWitchClientLaunchAgents", () => {
  beforeEach(() => {
    vi.mocked(kickstartAgentWitchLaunchAgent).mockClear();
    vi.mocked(listAgentWitchLaunchTargets).mockClear();
  });

  it("kickstarts each client launch target", async () => {
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const kicked = await kickstartAgentWitchClientLaunchAgents(
      "/tmp/install",
      "darwin",
    );

    expect(listAgentWitchLaunchTargets).toHaveBeenCalledWith("/tmp/install");
    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalledWith(
      "com.agent-witch",
      "/tmp/install",
    );
    expect(kicked).toEqual(["com.agent-witch"]);
  });

  it.each(["linux", "win32", "freebsd"])(
    "never touches launchctl on %s",
    async (platform) => {
      const kicked = await kickstartAgentWitchClientLaunchAgents(
        "/tmp/install",
        platform,
      );

      expect(kicked).toEqual([]);
      expect(listAgentWitchLaunchTargets).not.toHaveBeenCalled();
      expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
    },
  );
});
