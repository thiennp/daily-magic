import { describe, expect, it } from "vitest";

import { resolveLegacyRegistryProjectsToMigrate } from "./resolveLegacyRegistryProjectsToMigrate";

describe("resolveLegacyRegistryProjectsToMigrate", () => {
  it("migrates Mac-only rows not already in cloud by folder", () => {
    const pending = resolveLegacyRegistryProjectsToMigrate(
      [
        {
          id: "local-1",
          name: "Mac Repo",
          projectFolderPath: "/Users/me/dev/app",
          addedAt: "2026-01-01T00:00:00.000Z",
        },
      ],
      [],
    );

    expect(pending).toEqual([
      { name: "Mac Repo", folderPath: "/Users/me/dev/app" },
    ]);
  });

  it("skips when cloud already has the same folder", () => {
    const pending = resolveLegacyRegistryProjectsToMigrate(
      [
        {
          id: "local-1",
          name: "Mac Repo",
          projectFolderPath: "/Users/me/dev/app",
          addedAt: "2026-01-01T00:00:00.000Z",
        },
      ],
      [
        {
          id: "cloud-1",
          name: "Live Repo",
          folderPath: "/Users/me/dev/app",
        },
      ],
    );

    expect(pending).toHaveLength(0);
  });

  it("skips when cloudProjectId already exists in cloud", () => {
    const pending = resolveLegacyRegistryProjectsToMigrate(
      [
        {
          id: "local-1",
          name: "Linked",
          projectFolderPath: "/Users/me/other",
          addedAt: "2026-01-01T00:00:00.000Z",
          cloudProjectId: "cloud-1",
        },
      ],
      [
        {
          id: "cloud-1",
          name: "Linked",
          folderPath: "/Users/me/dev/app",
        },
      ],
    );

    expect(pending).toHaveLength(0);
  });
});
