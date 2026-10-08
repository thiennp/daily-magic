import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const restartHostMock = vi.fn(
  async (_input: {
    readonly installDir: string;
    readonly bundleVersion: string;
  }) => ({
    ok: true,
    mode: "detached-relaunch" as const,
    message: "Relaunched AgentWitch host process.",
  }),
);

const writerBusyMock = vi.fn(() => false);
const deferRestartMock = vi.fn();

vi.mock("./ensureAgentWitchOllamaInstalled", () => ({
  ensureAgentWitchOllamaInstalled: vi.fn(async () => ({
    ok: true,
    message: "Ollama ensure skipped in test.",
  })),
}));

vi.mock("@agent-witch/install-macos-launch", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@agent-witch/install-macos-launch")>();
  return {
    ...actual,
    bootoutAgentWitchAuxiliaryLaunchAgents: vi.fn(),
    kickstartAgentWitchClientLaunchAgents: vi.fn(async () => []),
  };
});

vi.mock(
  "../../../../../../scripts/restartAgentWitchHostAfterBundleUpdate",
  () => ({
    restartAgentWitchHostAfterBundleUpdate: (input: {
      readonly installDir: string;
      readonly bundleVersion: string;
    }) => restartHostMock(input),
  }),
);

vi.mock("../../../../../../scripts/agentWitchWriterWorkGuard", () => ({
  deferAgentWitchLocalRestart: (...args: unknown[]) =>
    deferRestartMock(...args),
  isAgentWitchWriterWorkInProgress: () => writerBusyMock(),
}));

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";

import { AGENT_WITCH_INSTALL_VERSION_FILE_NAME } from "./agentWitchInstallVersion";
import { runAgentWitchSelfUpdate } from "./agentWitchSelfUpdate";

const createFreshInstallHome = (tempDirs: string[]): string => {
  const installDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "agent-witch-self-update-restart-"),
  );
  tempDirs.push(installDir);
  process.env.AGENT_WITCH_HOME = installDir;
  return installDir;
};

describe("runAgentWitchSelfUpdate host restart", () => {
  const previousHome = process.env.AGENT_WITCH_HOME;
  const tempDirs: string[] = [];

  afterEach(() => {
    vi.unstubAllGlobals();
    restartHostMock.mockClear();
    writerBusyMock.mockReset();
    writerBusyMock.mockReturnValue(false);
    deferRestartMock.mockClear();
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

  it("restarts the host after applying a newer bundle", async () => {
    createFreshInstallHome(tempDirs);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            bundleVersion: "9",
            scripts: [],
          }),
      }),
    );

    const result = await runAgentWitchSelfUpdate();

    expect(result.updated).toBe(true);
    expect(restartHostMock).toHaveBeenCalledTimes(1);
    expect(restartHostMock).toHaveBeenCalledWith(
      expect.objectContaining({ bundleVersion: "9" }),
    );
  });

  it("does not restart when the install bundle is already current", async () => {
    const installDir = createFreshInstallHome(tempDirs);
    fs.writeFileSync(
      path.join(installDir, AGENT_WITCH_INSTALL_VERSION_FILE_NAME),
      `${JSON.stringify(
        {
          bundleVersion: "9",
          appOrigin: AGENT_WITCH_DEFAULT_ORIGIN,
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            bundleVersion: "9",
            scripts: [],
          }),
      }),
    );

    const result = await runAgentWitchSelfUpdate();

    expect(result).toMatchObject({
      ok: true,
      updated: false,
      message: "Install bundle is up to date.",
    });
    expect(restartHostMock).not.toHaveBeenCalled();
  });

  it("defers host restart when a writer task is active", async () => {
    createFreshInstallHome(tempDirs);
    writerBusyMock.mockReturnValue(true);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            bundleVersion: "9",
            scripts: [],
          }),
      }),
    );

    const result = await runAgentWitchSelfUpdate();

    expect(result.updated).toBe(false);
    expect(result.message).toContain("deferred");
    expect(deferRestartMock).toHaveBeenCalledWith("install-bundle-update");
    expect(restartHostMock).not.toHaveBeenCalled();
  });
});
