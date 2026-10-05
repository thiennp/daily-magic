import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/agent/hooks/loadUserProjectsFromApi", () => ({
  default: vi.fn(),
}));

vi.mock("@/features/capabilities/utils/lastSaveProjectStore", () => ({
  readLastSaveProjectId: vi.fn(() => null),
}));

import loadUserProjectsFromApi from "@/features/agent/hooks/loadUserProjectsFromApi";
import {
  CREATE_PROJECT_REQUIRED_MESSAGE,
  resolveCreateTargetProjectId,
} from "@/features/capabilities/utils/resolveCreateTargetProjectId";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const project = (id: string, name: string): UserProjectRecord => ({
  id,
  ownerUserId: "user-1",
  deviceId: null,
  name,
  folderPath: `~/projects/${id}`,
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
});

describe("resolveCreateTargetProjectId", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("prefers an explicit project id", async () => {
    const result = await resolveCreateTargetProjectId({
      projectId: "  proj-explicit  ",
    });
    expect(result).toEqual({ ok: true, projectId: "proj-explicit" });
    expect(loadUserProjectsFromApi).not.toHaveBeenCalled();
  });

  it("falls back to Default from /api/projects", async () => {
    vi.mocked(loadUserProjectsFromApi).mockResolvedValue({
      ok: true,
      projects: [
        project("launch", "Launch"),
        project("default", "Default"),
      ],
      compositionCountsByProjectId: {},
    });

    const result = await resolveCreateTargetProjectId();
    expect(result).toEqual({ ok: true, projectId: "default" });
  });

  it("returns a clear error when the user has no projects", async () => {
    vi.mocked(loadUserProjectsFromApi).mockResolvedValue({
      ok: true,
      projects: [],
      compositionCountsByProjectId: {},
    });

    const result = await resolveCreateTargetProjectId();
    expect(result).toEqual({
      ok: false,
      errorMessage: CREATE_PROJECT_REQUIRED_MESSAGE,
    });
  });
});
