import { beforeEach, describe, expect, it, vi } from "vitest";

const getUserProjectById = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/userProjectQueries", () => ({ getUserProjectById }));

import { resolveRunFolder } from "@/lib/dispatch/resolveRunFolder";

const project = (folderPath: string, deviceId: string | null) => ({
  folderPath,
  deviceId,
});

describe("resolveRunFolder", () => {
  beforeEach(() => {
    getUserProjectById.mockReset();
  });

  it("returns undefined without a project id", async () => {
    await expect(resolveRunFolder(null, "dev-1")).resolves.toBeUndefined();
    expect(getUserProjectById).not.toHaveBeenCalled();
  });

  it("returns the project folder when the device matches", async () => {
    getUserProjectById.mockResolvedValue(
      project(" /Users/me/baby-care ", "dev-1"),
    );
    await expect(resolveRunFolder("p1", "dev-1")).resolves.toBe(
      "/Users/me/baby-care",
    );
  });

  it("omits the folder when the project lives on another device", async () => {
    getUserProjectById.mockResolvedValue(project("/Users/me/x", "dev-2"));
    await expect(resolveRunFolder("p1", "dev-1")).resolves.toBeUndefined();
  });

  it("omits an empty folder and a missing project", async () => {
    getUserProjectById.mockResolvedValueOnce(project("  ", "dev-1"));
    await expect(resolveRunFolder("p1", "dev-1")).resolves.toBeUndefined();
    getUserProjectById.mockResolvedValueOnce(null);
    await expect(resolveRunFolder("p1", "dev-1")).resolves.toBeUndefined();
  });
});
