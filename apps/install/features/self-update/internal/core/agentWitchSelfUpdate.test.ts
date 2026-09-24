import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";

import { AGENT_WITCH_INSTALL_VERSION_FILE_NAME } from "./agentWitchInstallVersion";
import { runAgentWitchSelfUpdate } from "./agentWitchSelfUpdate";

const createFreshInstallHome = (tempDirs: string[]): string => {
  const installDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "agent-witch-self-update-"),
  );
  tempDirs.push(installDir);
  process.env.AGENT_WITCH_HOME = installDir;
  return installDir;
};

describe("runAgentWitchSelfUpdate origin resolution", () => {
  const previousHome = process.env.AGENT_WITCH_HOME;
  const tempDirs: string[] = [];

  afterEach(() => {
    vi.unstubAllGlobals();
    if (previousHome === undefined) {
      delete process.env.AGENT_WITCH_HOME;
    } else {
      process.env.AGENT_WITCH_HOME = previousHome;
    }
    for (const tempDir of tempDirs) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDirs.length = 0;
  });

  it("fetches AGENT_WITCH_DEFAULT_ORIGIN when config and install-version are missing", async () => {
    const installDir = createFreshInstallHome(tempDirs);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await runAgentWitchSelfUpdate();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      `${AGENT_WITCH_DEFAULT_ORIGIN}/install/agent-witch/version`,
    );
    expect(result).toMatchObject({
      ok: false,
      updated: false,
      localBundleVersion: null,
      remoteBundleVersion: null,
      message: "Could not fetch the remote Agent Witch install bundle.",
    });
    expect(fs.existsSync(resolveAgentWitchLocalLayout().errorLogPath)).toBe(
      false,
    );
    expect(fs.existsSync(path.join(installDir, "config.json"))).toBe(false);
    expect(
      fs.existsSync(
        path.join(installDir, AGENT_WITCH_INSTALL_VERSION_FILE_NAME),
      ),
    ).toBe(false);
  });

  it("keeps a saved install appOrigin ahead of the default", async () => {
    const installDir = createFreshInstallHome(tempDirs);
    const savedOrigin = "https://preview.agentwitch.test";
    fs.writeFileSync(
      path.join(installDir, AGENT_WITCH_INSTALL_VERSION_FILE_NAME),
      `${JSON.stringify(
        {
          bundleVersion: "4",
          appOrigin: savedOrigin,
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await runAgentWitchSelfUpdate();

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      `${savedOrigin}/install/agent-witch/version`,
    );
    expect(result.message).toBe(
      "Could not fetch the remote Agent Witch install bundle.",
    );
    expect(result.localBundleVersion).toBe("4");
  });

  it("updates an unversioned install from the default origin", async () => {
    createFreshInstallHome(tempDirs);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          bundleVersion: "9",
          scripts: [],
        }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await runAgentWitchSelfUpdate();

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      `${AGENT_WITCH_DEFAULT_ORIGIN}/install/agent-witch/version`,
    );
    expect(result).toMatchObject({
      ok: true,
      updated: true,
      localBundleVersion: "9",
      remoteBundleVersion: "9",
      message: "Updated Agent Witch bundle unknown -> 9.",
    });
  });
});
