import { beforeEach, describe, expect, it, vi } from "vitest";

const selectRows = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/projects/acl/invites/selectUsableProjectInviteRows", () => ({
  selectUsableProjectInviteRows: selectRows,
}));

import { listProjectInvites } from "@/lib/projects/acl/invites/listProjectInvites";

describe("listProjectInvites", () => {
  beforeEach(() => {
    selectRows.mockReset();
    getProject.mockReset();
  });

  it("forbids non-owners and skips the SELECT", async () => {
    getProject.mockResolvedValue({ ownerUserId: "other" });
    await expect(
      listProjectInvites({ projectId: "proj-1", ownerUserId: "me" }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
    expect(selectRows).not.toHaveBeenCalled();
  });

  it("returns mapped usable invites for the owner", async () => {
    getProject.mockResolvedValue({ ownerUserId: "me" });
    selectRows.mockResolvedValue([
      {
        id: "inv-1",
        project_id: "proj-1",
        created_by_user_id: "me",
        team_label: null,
        scopes: [],
        max_uses: 1,
        uses_remaining: 1,
        expires_at: "2026-10-20T00:00:00.000Z",
        revoked_at: null,
        created_at: "2026-10-05T00:00:00.000Z",
      },
    ]);
    const result = await listProjectInvites({
      projectId: "proj-1",
      ownerUserId: "me",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.invites).toHaveLength(1);
    expect(result.invites[0]?.id).toBe("inv-1");
    expect(result.invites[0]?.usesRemaining).toBe(1);
    expect(selectRows).toHaveBeenCalledWith("proj-1");
  });
});
