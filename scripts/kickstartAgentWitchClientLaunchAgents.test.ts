import { describe, expect, it, vi } from "vitest";

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

describe("kickstartAgentWitchClientLaunchAgents", () => {
  it("kickstarts each client launch target", async () => {
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const kicked = await kickstartAgentWitchClientLaunchAgents("/tmp/install");

    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalledWith(
      "com.agent-witch",
    );
    expect(kicked).toEqual(["com.agent-witch"]);
  });
});
