import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@agent-witch/install-macos-launch", () => ({
  ensureAgentWitchLaunchAgentPlist: vi.fn(() => ({
    ok: true,
    rewritten: true,
    plistPath: "/tmp/com.agent-witch.plist",
  })),
}));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchInstallDir: vi.fn(() => "/tmp/agent-witch-home"),
  resolveAgentWitchLaunchAgentPrefix: vi.fn(() => "com.agent-witch"),
}));

vi.mock("./requestLocalAgentWitchSelfUpdate", () => ({
  requestLocalAgentWitchSelfUpdate: vi.fn(),
}));

vi.mock("@agent-witch/install-self-update", () => ({
  runAgentWitchSelfUpdate: vi.fn(),
}));

import { ensureAgentWitchLaunchAgentPlist } from "@agent-witch/install-macos-launch";
import { runAgentWitchSelfUpdate } from "@agent-witch/install-self-update";

import { requestLocalAgentWitchSelfUpdate } from "./requestLocalAgentWitchSelfUpdate";
import { triggerAgentWitchLocalInstallBundleUpdate } from "./triggerAgentWitchLocalInstallBundleUpdate";

describe("triggerAgentWitchLocalInstallBundleUpdate", () => {
  beforeEach(() => {
    vi.mocked(ensureAgentWitchLaunchAgentPlist).mockClear();
    vi.mocked(requestLocalAgentWitchSelfUpdate).mockReset();
    vi.mocked(runAgentWitchSelfUpdate).mockReset();
  });

  it("AGENT-067: repairs the LaunchAgent plist before posting /update/run", async () => {
    vi.mocked(requestLocalAgentWitchSelfUpdate).mockResolvedValue({
      ok: true,
      reachable: true,
      payload: { message: "Updated Agent Witch bundle 124 -> 125." },
    });

    const result = await triggerAgentWitchLocalInstallBundleUpdate();

    expect(ensureAgentWitchLaunchAgentPlist).toHaveBeenCalledWith({
      launchAgentLabel: "com.agent-witch",
      installDir: "/tmp/agent-witch-home",
    });
    expect(requestLocalAgentWitchSelfUpdate).toHaveBeenCalledWith({
      force: true,
    });
    expect(result).toEqual({
      ok: true,
      message: "Updated Agent Witch bundle 124 -> 125.",
    });
  });

  it("AGENT-067: still repairs the plist when wake is unreachable", async () => {
    vi.mocked(requestLocalAgentWitchSelfUpdate).mockResolvedValue({
      ok: false,
      reachable: false,
      payload: null,
    });
    vi.mocked(runAgentWitchSelfUpdate).mockResolvedValue({
      ok: true,
      updated: true,
      message: "Updated Agent Witch bundle 124 -> 125.",
      localBundleVersion: "124",
      remoteBundleVersion: "125",
    });

    const result = await triggerAgentWitchLocalInstallBundleUpdate();

    expect(ensureAgentWitchLaunchAgentPlist).toHaveBeenCalled();
    expect(runAgentWitchSelfUpdate).toHaveBeenCalledWith({ force: true });
    expect(result.ok).toBe(true);
  });
});
