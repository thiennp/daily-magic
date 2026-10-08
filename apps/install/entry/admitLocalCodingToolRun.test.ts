import { describe, expect, it, vi } from "vitest";

import type { AgentWitchClientConfig } from "@agent-witch/install-runtime-client/types";

import { admitLocalCodingToolRun } from "./admitLocalCodingToolRun";

const config = {
  wsUrl: "wss://app.example.com/ws",
  pairingToken: "FAKE-PAIRING",
  layout: { configPath: "/tmp/p/config.json", projectsDir: "/tmp/p/projects" },
} as unknown as AgentWitchClientConfig;

const deps = (paused = false) => ({
  isPaused: vi.fn(() => paused),
  loadFolders: vi.fn(async () => [{ projectId: "p1", folderPath: "/work/p1" }]),
  resolveFolder: vi.fn(() => ({
    ok: true as const,
    folderRealPath: "/work/p1",
  })),
  claimFolder: vi.fn(() => ({ ok: true as const })),
});

describe("admitLocalCodingToolRun", () => {
  it("refuses while coding tools are paused, before any lookup", async () => {
    const d = deps(true);
    const result = await admitLocalCodingToolRun(
      { config, requestedFolderPath: "/work/p1", defaultFolderPath: "/d" },
      d,
    );
    expect(result).toEqual({ ok: false, code: "coding_tools_paused" });
    expect(d.loadFolders).not.toHaveBeenCalled();
  });

  it("refuses a run without a folder", async () => {
    const result = await admitLocalCodingToolRun(
      {
        config,
        projectId: "p1",
        requestedFolderPath: null,
        defaultFolderPath: "/d",
      },
      deps(),
    );
    expect(result).toEqual({ ok: false, code: "folder_required" });
  });

  it("checks the folder against this device's registered folders", async () => {
    const d = deps();
    const result = await admitLocalCodingToolRun(
      {
        config,
        projectId: "p1",
        requestedFolderPath: "/work/p1",
        defaultFolderPath: "/d",
      },
      d,
    );
    expect(result).toEqual({ ok: true, folderRealPath: "/work/p1" });
    expect(d.loadFolders).toHaveBeenCalledWith({
      wsUrl: config.wsUrl,
      pairingToken: config.pairingToken,
    });
    expect(d.resolveFolder).toHaveBeenCalledWith({
      projectId: "p1",
      requestedFolderPath: "/work/p1",
      registeredFolders: [{ projectId: "p1", folderPath: "/work/p1" }],
      managedProjectsDir: "/tmp/p/projects",
      defaultFolderPath: "/d",
    });
  });

  it("refuses if claim is rejected", async () => {
    const d = deps();
    d.claimFolder.mockReturnValue({
      ok: false,
      conflictingAccountEmail: "x",
    } as unknown as { ok: true });
    const result = await admitLocalCodingToolRun(
      {
        config: {
          ...config,
          layout: { ...config.layout, profileEmail: "a@a.com" },
        } as unknown as AgentWitchClientConfig,
        projectId: "p1",
        requestedFolderPath: "/work/p1",
        defaultFolderPath: "/d",
      },
      d,
    );
    expect(result).toEqual({
      ok: false,
      code: "folder_owned_by_other_account",
    });
  });

  it("skips claim if profileEmail is missing", async () => {
    const d = deps();
    const result = await admitLocalCodingToolRun(
      {
        config: {
          ...config,
          layout: { ...config.layout, profileEmail: null },
        } as unknown as AgentWitchClientConfig,
        projectId: "p1",
        requestedFolderPath: "/work/p1",
        defaultFolderPath: "/d",
      },
      d,
    );
    expect(result).toEqual({ ok: true, folderRealPath: "/work/p1" });
    expect(d.claimFolder).not.toHaveBeenCalled();
  });

  it("fails if claim throws", async () => {
    const d = deps();
    d.claimFolder.mockImplementation(() => {
      throw new Error("test");
    });
    const result = await admitLocalCodingToolRun(
      {
        config: {
          ...config,
          layout: { ...config.layout, profileEmail: "a@a.com" },
        } as unknown as AgentWitchClientConfig,
        projectId: "p1",
        requestedFolderPath: "/work/p1",
        defaultFolderPath: "/d",
      },
      d,
    );
    expect(result).toEqual({ ok: false, code: "folder_check_unavailable" });
  });
});
