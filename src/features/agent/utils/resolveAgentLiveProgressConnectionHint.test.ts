import { describe, expect, it } from "vitest";

import { resolveAgentLiveProgressConnectionHint } from "@/features/agent/utils/resolveAgentLiveProgressConnectionHint";

describe("resolveAgentLiveProgressConnectionHint (AGENT-038)", () => {
  it("describes a healthy dashboard link and last Mac update", () => {
    expect(
      resolveAgentLiveProgressConnectionHint({
        connectionStatus: "connected",
        lastMacUpdateLabel: "12s ago",
      }),
    ).toBe("Dashboard connected · last Mac update 12s ago");
  });

  it("warns when the dashboard stream is down", () => {
    expect(
      resolveAgentLiveProgressConnectionHint({
        connectionStatus: "disconnected",
        lastMacUpdateLabel: "2m ago",
      }),
    ).toContain("Dashboard disconnected");
  });
});
