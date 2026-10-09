import { describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import { selectAwaitingApprovalHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectAwaitingApprovalHumanInviteRows";
import { toHumanInviteListItem } from "@/lib/projects/acl/humanInvites/toHumanInviteListItem";

describe("F1 awaiting list carries the accepter's verified account email", () => {
  it("joins users on accepted_by_user_id; email only when verified", async () => {
    sqlMock.mockResolvedValueOnce([]);
    await selectAwaitingApprovalHumanInviteRows("proj-1");
    const text = (sqlMock.mock.calls[0][0] as readonly string[]).join("?");
    expect(text).toContain("LEFT JOIN users u ON u.id = i.accepted_by_user_id");
    expect(text).toContain("u.email_verified IS NOT NULL");
    expect(text).toContain("AS accepted_by_email");
    expect(sqlMock.mock.calls[0].slice(1)).toEqual(["proj-1", null, null]);
  });

  it("row → list item maps accepted_by_email; absent → null", () => {
    const row = {
      id: "inv-1",
      project_id: "proj-1",
      created_by_user_id: "owner-1",
      email: "ada@example.org",
      role: "member",
      max_uses: 1,
      uses_remaining: 0,
      status: "accepted",
      accepted_by_user_id: "user-2",
    };
    const item = toHumanInviteListItem(
      mapHumanInviteRow({ ...row, accepted_by_email: "bob@example.org" }),
    );
    expect(item.acceptedByEmail).toBe("bob@example.org");
    expect(item.email).toBe("ada@example.org");
    expect(item).not.toHaveProperty("acceptedByUserId");
    expect(toHumanInviteListItem(mapHumanInviteRow(row)).acceptedByEmail).toBe(
      null,
    );
  });
});

describe("awaiting list for a member", () => {
  it("is limited to the invites the member created", async () => {
    sqlMock.mockClear();
    await selectAwaitingApprovalHumanInviteRows("proj-1", "member-1");
    expect(sqlMock.mock.calls[0].slice(1)).toEqual([
      "proj-1",
      "member-1",
      "member-1",
    ]);
  });
});
