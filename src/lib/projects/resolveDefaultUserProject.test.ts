import { describe, expect, it } from "vitest";

import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";
import { resolveDefaultUserProject } from "@/lib/projects/resolveDefaultUserProject";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const project = (
  overrides: Partial<UserProjectRecord> & Pick<UserProjectRecord, "id">,
): UserProjectRecord => ({
  id: overrides.id,
  ownerUserId: "user-1",
  deviceId: null,
  name: overrides.name ?? DEFAULT_USER_PROJECT_NAME,
  folderPath:
    overrides.folderPath ??
    "~/.agent-witch/profiles/owner@example.com/projects/default",
  lastUsedAt: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("default user project helpers", () => {
  it("resolves the Default project before other projects", () => {
    expect(
      resolveDefaultUserProject([
        project({ id: "other", name: "Other" }),
        project({ id: "default", name: DEFAULT_USER_PROJECT_NAME }),
      ])?.id,
    ).toBe("default");
  });

  it("detects the Default project by name", () => {
    expect(isDefaultUserProject(project({ id: "default" }))).toBe(true);
    expect(isDefaultUserProject(project({ id: "other", name: "Other" }))).toBe(
      false,
    );
  });
});
