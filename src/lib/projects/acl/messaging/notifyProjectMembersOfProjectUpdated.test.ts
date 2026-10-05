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

describe("notifyProjectMembersOfProjectUpdated", () => {
  beforeEach(() => {
    insertMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("fans out to each active membership + owner with project.updated", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
    sqlMock.mockResolvedValueOnce([
      { id: "mem-a", user_id: "user-a", project_display_name: "Alpha" },
      { id: "mem-b", user_id: "user-b", project_display_name: "Beta" },
    ]);

    const result = await notifyProjectMembersOfProjectUpdated({
      projectId: "proj-1",
      fields: ["folder_refs", "repo_urls"],
      actorUserId: "owner-1",
    });

    expect(result).toEqual({ notifiedPeerCount: 2 });
    expect(insertMock).toHaveBeenCalledTimes(3);

    expect(insertArg(0)).toEqual(
      expect.objectContaining({
        projectId: "proj-1",
        senderMembershipId: null,
        senderUserId: "owner-1",
        toMembershipId: "mem-a",
        toUserId: "user-a",
        toProjectDisplayName: "Alpha",
        kind: PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
        summary: "project updated: folder_refs,repo_urls",
        refsJson: "{}",
        recipients: [{ id: "mem-a", user_id: "user-a" }],
      }),
    );
    expect(insertArg(1)).toEqual(
      expect.objectContaining({
        projectId: "proj-1",
        toMembershipId: "mem-b",
        toUserId: "user-b",
        toProjectDisplayName: "Beta",
        kind: PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
        recipients: [{ id: "mem-b", user_id: "user-b" }],
      }),
    );
    expect(insertArg(2)).toEqual(
      expect.objectContaining({
        projectId: "proj-1",
        senderMembershipId: null,
        senderUserId: "owner-1",
        toMembershipId: null,
        toUserId: "owner-1",
        kind: PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
        summary: "project updated: folder_refs,repo_urls",
        recipients: [],
      }),
    );
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
