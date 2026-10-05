import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  loadUserProfilesByIds: vi.fn(async (ids: readonly string[]) => {
    const map = new Map();
    for (const id of ids) {
      map.set(id, {
        id,
        email: id === "bot-user" ? "bot@agent.local" : "h@example.com",
        name: id,
        image: null,
        isAgent: id === "bot-user",
      });
    }
    return map;
  }),
}));

import { buildMembershipViews } from "@/lib/projects/acl/buildProjectAccessViews";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const base = {
  projectId: "proj-1",
  status: "active" as const,
  teamLabel: null,
  scopes: ["acl:self", "project:meta"] as const,
  projectDisplayName: null,
  createdAt: "2026-10-05T00:00:00.000Z",
  revokedAt: null,
};

describe("buildMembershipViews memberKind", () => {
  it("returns memberKind for human and bot rows", async () => {
    const rows: readonly ProjectMembershipRecord[] = [
      {
        ...base,
        id: "m-human",
        userId: "human-user",
        role: "member",
        memberKind: "human",
        scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
      },
      {
        ...base,
        id: "m-bot",
        userId: "bot-user",
        role: "member",
        memberKind: "bot",
        projectDisplayName: "Grok",
        scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
      },
      {
        ...base,
        id: "m-viewer",
        userId: "viewer-user",
        role: "viewer",
        memberKind: "human",
        scopes: ["acl:self", "project:meta", "peer_sync"],
      },
    ];
    const views = await buildMembershipViews(rows);
    expect(views).toEqual([
      expect.objectContaining({
        id: "m-human",
        role: "member",
        memberKind: "human",
      }),
      expect.objectContaining({
        id: "m-bot",
        role: "member",
        memberKind: "bot",
      }),
      expect.objectContaining({
        id: "m-viewer",
        role: "viewer",
        memberKind: "human",
      }),
    ]);
  });
});
