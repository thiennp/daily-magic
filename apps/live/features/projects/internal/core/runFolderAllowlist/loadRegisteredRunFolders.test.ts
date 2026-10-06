import { describe, expect, it, vi } from "vitest";

import { loadRegisteredRunFolders } from "./loadRegisteredRunFolders";

const config = {
  wsUrl: "wss://example.test/api/agent-witch/ws",
  pairingToken: "pt-fake-for-tests",
};

describe("loadRegisteredRunFolders", () => {
  it("maps device projects to registered folders", async () => {
    const fetchProjects = vi.fn().mockResolvedValue([
      { id: "p1", name: "One", folderPath: "~/code/one" },
    ]);
    await expect(loadRegisteredRunFolders(config, fetchProjects)).resolves.toEqual([
      { projectId: "p1", folderPath: "~/code/one" },
    ]);
  });

  it("falls back to the last good list when the cloud is unreachable", async () => {
    const fetchProjects = vi.fn().mockResolvedValue(null);
    await expect(loadRegisteredRunFolders(config, fetchProjects)).resolves.toEqual([
      { projectId: "p1", folderPath: "~/code/one" },
    ]);
  });

  it("returns null (fail closed) with no cloud config or history", async () => {
    const fetchProjects = vi.fn().mockResolvedValue(null);
    await expect(
      loadRegisteredRunFolders({ ...config, pairingToken: "" }, fetchProjects),
    ).resolves.toBeNull();
    await expect(
      loadRegisteredRunFolders({ ...config, pairingToken: "pt-other" }, fetchProjects),
    ).resolves.toBeNull();
  });
});
