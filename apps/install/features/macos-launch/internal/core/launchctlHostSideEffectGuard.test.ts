import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Host-safety: every launchctl spawn is mocked here, including the opt-in paths.
vi.mock("node:child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  return {
    ...actual,
    execFile: vi.fn(
      (
        _file: string,
        _args: readonly string[],
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(null, "", "");
      },
    ),
    execFileSync: vi.fn(() => ""),
  };
});

vi.mock("./ensureAgentWitchLaunchAgentPlist", () => ({
  ensureAgentWitchLaunchAgentPlist: vi.fn(() => ({
    ok: true,
    rewritten: false,
    plistPath: "/tmp/never-written/com.agent-witch.plist",
  })),
}));

vi.mock("./isActiveMacOsConsoleUser", () => ({
  isActiveMacOsConsoleUser: vi.fn(() => true),
}));

vi.mock("./collectAgentWitchLaunchAgentLabels", () => ({
  collectAgentWitchLaunchAgentLabels: vi.fn(() => [
    "com.agent-witch",
    "com.agent-witch-wake",
  ]),
}));

vi.mock("./listAgentWitchLaunchTargets", () => ({
  listAgentWitchLaunchTargets: vi.fn(() => [
    { profileEmail: null, launchAgentLabel: "com.agent-witch" },
  ]),
}));

import { execFile, execFileSync } from "node:child_process";

import { bootoutAgentWitchAuxiliaryLaunchAgents } from "./bootoutAgentWitchAuxiliaryLaunchAgents";
import { bootoutAgentWitchLaunchAgentSync } from "./bootoutAgentWitchLaunchAgent";
import { bootoutAgentWitchLaunchAgentsForCurrentUser } from "./bootoutAgentWitchLaunchAgentsForCurrentUser";
import { ensureAgentWitchLaunchAgentPlist } from "./ensureAgentWitchLaunchAgentPlist";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";

const originalPlatform = process.platform;

const setPlatform = (platform: NodeJS.Platform): void => {
  Object.defineProperty(process, "platform", { value: platform });
};

beforeEach(() => {
  setPlatform("darwin");
  vi.stubEnv("AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS", "");
});

afterEach(() => {
  setPlatform(originalPlatform);
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("launchctl host side-effect guard (VITEST)", () => {
  it("kickstartAgentWitchLaunchAgent refuses before touching the plist or launchctl", async () => {
    const result = await kickstartAgentWitchLaunchAgent(
      "com.agent-witch",
      "/tmp/install",
    );

    expect(result).toEqual({
      ok: false,
      errorMessage:
        "Refusing launchctl host side effects under VITEST (set AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS=1 to override).",
    });
    expect(ensureAgentWitchLaunchAgentPlist).not.toHaveBeenCalled();
    expect(execFile).not.toHaveBeenCalled();
  });

  it("bootoutAgentWitchLaunchAgentSync does not spawn launchctl", () => {
    bootoutAgentWitchLaunchAgentSync("com.agent-witch");

    expect(execFileSync).not.toHaveBeenCalled();
  });

  it("bootoutAgentWitchAuxiliaryLaunchAgents does not spawn launchctl", () => {
    bootoutAgentWitchAuxiliaryLaunchAgents("/tmp/install");

    expect(execFileSync).not.toHaveBeenCalled();
  });

  it("bootoutAgentWitchLaunchAgentsForCurrentUser does not spawn launchctl", () => {
    bootoutAgentWitchLaunchAgentsForCurrentUser("/tmp/install");

    expect(execFileSync).not.toHaveBeenCalled();
  });

  it("kickstartAgentWitchLaunchAgent runs launchctl kickstart -k with explicit opt-in", async () => {
    // Never opt in unless launchctl is provably mocked (protects the live AWL).
    expect(vi.isMockFunction(execFile)).toBe(true);
    expect(vi.isMockFunction(execFileSync)).toBe(true);
    vi.stubEnv("AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS", "1");

    const result = await kickstartAgentWitchLaunchAgent(
      "com.agent-witch",
      "/tmp/install",
    );

    expect(result).toEqual({ ok: true });
    expect(execFile).toHaveBeenCalledWith(
      "launchctl",
      ["kickstart", "-k", expect.stringMatching(/^gui\/\d+\/com\.agent-witch$/)],
      expect.any(Function),
    );
  });

  it("bootout helpers spawn launchctl bootout with explicit opt-in", () => {
    // Never opt in unless launchctl is provably mocked (protects the live AWL).
    expect(vi.isMockFunction(execFile)).toBe(true);
    expect(vi.isMockFunction(execFileSync)).toBe(true);
    vi.stubEnv("AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS", "1");

    bootoutAgentWitchAuxiliaryLaunchAgents("/tmp/install");

    expect(execFileSync).toHaveBeenCalledTimes(1);
    expect(execFileSync).toHaveBeenCalledWith(
      "launchctl",
      ["bootout", expect.stringMatching(/^gui\/\d+\/com\.agent-witch-wake$/)],
      { stdio: "ignore" },
    );
  });
});
