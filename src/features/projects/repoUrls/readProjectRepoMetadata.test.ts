import { describe, expect, it } from "vitest";

import { readProjectRepoMetadata } from "@/features/projects/repoUrls/readProjectRepoMetadata";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const sampleProject = (
  overrides: Partial<UserProjectRecord> = {},
): UserProjectRecord => ({
  id: "proj-1",
  ownerUserId: "user-1",
  deviceId: "device-1",
  name: "Sample",
  folderPath: "~/Projects/sample",
  repoUrls: ["https://github.com/org/a.git"],
  defaultBranch: "main",
  lastUsedAt: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("readProjectRepoMetadata", () => {
  it("copies repoUrls and defaultBranch from the project row", () => {
    const project = sampleProject();
    expect(readProjectRepoMetadata(project)).toEqual({
      repoUrls: ["https://github.com/org/a.git"],
      defaultBranch: "main",
    });
    expect(readProjectRepoMetadata(project).repoUrls).not.toBe(
      project.repoUrls,
    );
  });

  it("maps empty repoUrls and null defaultBranch", () => {
    expect(
      readProjectRepoMetadata(
        sampleProject({ repoUrls: [], defaultBranch: null }),
      ),
    ).toEqual({ repoUrls: [], defaultBranch: null });
  });
});
