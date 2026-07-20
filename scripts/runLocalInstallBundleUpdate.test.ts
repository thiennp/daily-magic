import { describe, expect, it, vi } from "vitest";

vi.mock("./requestLocalAgentWitchSelfUpdate", () => ({
  requestLocalAgentWitchSelfUpdate: vi.fn(),
}));

vi.mock("./agentWitchSelfUpdate", () => ({
  runAgentWitchSelfUpdate: vi.fn(),
}));

vi.mock("./agentWitchLocalTrafficLog", () => ({
  appendAgentWitchLocalTraffic: vi.fn(),
}));

vi.mock("./agentWitchInstallVersion", () => ({
  readAgentWitchInstallVersion: vi.fn(() => ({
    bundleVersion: "36",
    appOrigin: "https://www.agentwitch.com",
    updatedAt: "2026-07-20T00:00:00.000Z",
  })),
}));

import { runAgentWitchSelfUpdate } from "./agentWitchSelfUpdate";
import { requestLocalAgentWitchSelfUpdate } from "./requestLocalAgentWitchSelfUpdate";
import { runLocalInstallBundleUpdate } from "./runLocalInstallBundleUpdate";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

describe("runLocalInstallBundleUpdate", () => {
  it("AGENT-043: falls back to direct self-update when wake API is unreachable", async () => {
    vi.mocked(requestLocalAgentWitchSelfUpdate).mockResolvedValue({
      ok: false,
      reachable: false,
      payload: null,
    });
    vi.mocked(runAgentWitchSelfUpdate).mockResolvedValue({
      ok: true,
      updated: true,
      message: "Updated Agent Witch bundle 36 -> 38.",
      localBundleVersion: "36",
      remoteBundleVersion: "38",
    });

    await runLocalInstallBundleUpdate({
      layout: resolveAgentWitchLocalLayout(),
      remoteBundleVersion: "38",
      trigger: "install.bundle.update",
    });

    expect(requestLocalAgentWitchSelfUpdate).toHaveBeenCalledWith({
      force: true,
    });
    expect(runAgentWitchSelfUpdate).toHaveBeenCalledWith({ force: true });
  });
});
