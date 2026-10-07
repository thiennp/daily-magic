import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { describeLinkedProjectFolders } from "./describeLinkedProjectFolders";
import { linkAgentWitchProjectFolder } from "./linkAgentWitchProjectFolder";
import { readLinkedProjectFolders } from "./linkedProjectFoldersFile";

const setup = () => {
  const root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), "awl-linkp-")),
  );
  const home = path.join(root, "home");
  const repo = path.join(home, "daily-magic");
  const profileDir = path.join(root, "profile");
  fs.mkdirSync(path.join(repo, ".git"), { recursive: true });
  return { home, repo, profileDir };
};

const cloudConfig = {
  appOrigin: "https://example.test",
  pairingToken: "pt-fake",
};

describe("linkAgentWitchProjectFolder", () => {
  it("saves to cloud, writes the local link, and reports plain words", async () => {
    const { home, repo, profileDir } = setup();
    const updateCloudFolder = vi.fn().mockResolvedValue({
      ok: true,
      projectName: "AgentWitch",
    });
    const syncHarnessBindings = vi.fn().mockResolvedValue(true);

    const result = await linkAgentWitchProjectFolder({
      projectId: "29b404a2-d2be-45bf-8f88-143b675a94f2",
      folderPath: "~/daily-magic".replace("~", home),
      profileDir,
      cloudConfig,
      homeDir: home,
      updateCloudFolder,
      syncHarnessBindings,
      now: () => new Date("2026-10-08T00:00:00Z"),
    });

    expect(result).toMatchObject({
      ok: true,
      projectName: "AgentWitch",
      folderPath: repo,
      isGitRepo: true,
      summary: "AgentWitch uses ~/daily-magic (git repo).",
    });
    expect(updateCloudFolder).toHaveBeenCalledWith(
      cloudConfig,
      "29b404a2-d2be-45bf-8f88-143b675a94f2",
      repo,
    );
    expect(readLinkedProjectFolders(profileDir)).toEqual([
      {
        projectId: "29b404a2-d2be-45bf-8f88-143b675a94f2",
        projectName: "AgentWitch",
        folderPath: repo,
        isGitRepo: true,
        linkedAt: "2026-10-08T00:00:00.000Z",
      },
    ]);
    expect(fs.existsSync(path.join(repo, ".agent-witch", "project.json"))).toBe(
      true,
    );
  });

  it("does not link locally when the cloud refuses", async () => {
    const { home, repo, profileDir } = setup();
    const result = await linkAgentWitchProjectFolder({
      projectId: "p1",
      folderPath: repo,
      profileDir,
      cloudConfig,
      homeDir: home,
      updateCloudFolder: vi
        .fn()
        .mockResolvedValue({ ok: false, httpStatus: 404 }),
      syncHarnessBindings: vi.fn(),
    });
    expect(result).toMatchObject({
      ok: false,
      httpStatus: 502,
      code: "cloud_update_failed",
    });
    expect(readLinkedProjectFolders(profileDir)).toEqual([]);
    expect(fs.existsSync(path.join(repo, ".agent-witch"))).toBe(false);
  });

  it("refuses before touching the cloud when unpaired or the folder is bad", async () => {
    const { home, repo, profileDir } = setup();
    const updateCloudFolder = vi.fn();
    await expect(
      linkAgentWitchProjectFolder({
        projectId: "p1",
        folderPath: repo,
        profileDir,
        cloudConfig: null,
        homeDir: home,
        updateCloudFolder,
      }),
    ).resolves.toMatchObject({ ok: false, code: "not_paired" });
    await expect(
      linkAgentWitchProjectFolder({
        projectId: "../p1",
        folderPath: repo,
        profileDir,
        cloudConfig,
        homeDir: home,
        updateCloudFolder,
      }),
    ).resolves.toMatchObject({ ok: false, code: "project_id_invalid" });
    expect(updateCloudFolder).not.toHaveBeenCalled();
  });

  it("status says when a linked folder went missing", async () => {
    const { home, repo, profileDir } = setup();
    expect(describeLinkedProjectFolders(profileDir, home).summary).toBe(
      "No project folder linked on this computer yet.",
    );
    await linkAgentWitchProjectFolder({
      projectId: "abcdef12-0000",
      folderPath: repo,
      profileDir,
      cloudConfig,
      homeDir: home,
      updateCloudFolder: vi
        .fn()
        .mockResolvedValue({ ok: true, projectName: null }),
      syncHarnessBindings: vi.fn().mockResolvedValue(true),
    });
    fs.rmSync(repo, { recursive: true });
    expect(describeLinkedProjectFolders(profileDir, home)).toMatchObject({
      summary:
        "Project abcdef12: linked folder ~/daily-magic is missing on this computer.",
      folders: [{ folderFound: false, isGitRepo: false }],
    });
  });
});
