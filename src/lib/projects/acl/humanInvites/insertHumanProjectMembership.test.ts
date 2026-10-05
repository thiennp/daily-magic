import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { insertHumanProjectMembership } from "@/lib/projects/acl/humanInvites/insertHumanProjectMembership";

describe("insertHumanProjectMembership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("inserts project_display_name and empty human scopes", async () => {
    sqlMock.mockResolvedValueOnce([
      {
        id: "m1",
        project_id: "p",
        user_id: "u",
        role: "member",
        status: "active",
        member_kind: "human",
        team_label: null,
        scopes: [],
        project_display_name: "Soft Vale",
        created_at: "2026-10-05T00:00:00.000Z",
        revoked_at: null,
      },
    ]);
    const result = await insertHumanProjectMembership({
      projectId: "p",
      userId: "u",
      role: "member",
      projectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    expect(sqlMock.mock.calls[0]?.[5]).toEqual([]);
    expect(sqlMock.mock.calls[0]?.[6]).toBe("Soft Vale");
  });
});
