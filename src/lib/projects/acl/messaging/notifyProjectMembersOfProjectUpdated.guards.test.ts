import { beforeEach, describe, expect, it, vi } from "vitest";

import { notifyProjectMembersOfProjectUpdated } from "@/lib/projects/acl/messaging/notifyProjectMembersOfProjectUpdated";
import { PROJECT_MESSAGE_KIND_PROJECT_UPDATED } from "@/lib/projects/acl/messaging/projectMessage.constants";

const insertMock = vi.fn(async (input: unknown) => {
  void input;
  return { messageId: "msg-1", wakeResults: [] };
});
const getProjectMock = vi.fn();
const sqlMock = vi.fn();

vi.mock("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries", () => ({
  insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (projectId: unknown) => getProjectMock(projectId),
}));

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

type InsertArg = {
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toProjectDisplayName: string | null;
  readonly kind: string;
  readonly summary: string;
  readonly refsJson: string;
  readonly recipients: readonly { readonly id: string; readonly user_id: string }[];
};

const insertArg = (callIndex: number): InsertArg =>
  insertMock.mock.calls[callIndex]?.[0] as InsertArg;

describe("notifyProjectMembersOfProjectUpdated guards", () => {
  beforeEach(() => {
    insertMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("skips insert when no allowlisted fields", async () => {
    const result = await notifyProjectMembersOfProjectUpdated({
      projectId: "proj-1",
      fields: ["nope"],
    });
    expect(result).toEqual({ notifiedPeerCount: 0 });
    expect(insertMock).not.toHaveBeenCalled();
    expect(getProjectMock).not.toHaveBeenCalled();
  });

  it("does not double-notify owner who is also an active member", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
    sqlMock.mockResolvedValueOnce([
      { id: "mem-owner", user_id: "owner-1", project_display_name: "OwnerBot" },
    ]);

    await notifyProjectMembersOfProjectUpdated({
      projectId: "proj-1",
      fields: ["knowledge"],
    });

    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertArg(0)).toEqual(
      expect.objectContaining({
        toMembershipId: "mem-owner",
        toUserId: "owner-1",
        recipients: [{ id: "mem-owner", user_id: "owner-1" }],
      }),
    );
  });
});
