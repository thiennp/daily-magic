import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => listProjectPeersBaseProject),
}));

describe("resolveDispatchRecipients membershipId + rename alias", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("resolves toMembershipId for active peer", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("AND id =") && q.includes("project_memberships")) {
        return [{ id: "mem-ada", user_id: "bot-ada", member_kind: "bot" }];
      }
      return [];
    });
    const result = await resolveDispatchRecipients({
      projectId: "proj-1",
      actorUserId: "bot-1",
      toMembershipId: "mem-ada",
      toProjectDisplayName: null,
      toTeamLabel: null,
    });
    expect(result).toEqual({
      ok: true,
      recipients: [
        {
          id: "mem-ada",
          user_id: "bot-ada",
          memberKind: "bot",
          deviceId: null,
        },
      ],
    });
  });

  it("falls back to unexpired display-name alias when live name missing", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (
        q.includes("FROM project_memberships") &&
        q.includes("project_display_name IS NOT NULL")
      ) {
        return [
          {
            id: "mem-ada",
            user_id: "bot-ada",
            project_display_name: "Ada Prime",
          },
        ];
      }
      if (q.includes("project_membership_display_name_aliases")) {
        return [{ id: "mem-ada", user_id: "bot-ada" }];
      }
      return [];
    });
    const result = await resolveDispatchRecipients({
      projectId: "proj-1",
      actorUserId: "bot-1",
      toProjectDisplayName: "Ada",
      toTeamLabel: null,
    });
    expect(result).toEqual({
      ok: true,
      recipients: [
        {
          id: "mem-ada",
          user_id: "bot-ada",
          memberKind: "bot",
          deviceId: null,
        },
      ],
    });
  });

  it("returns recipient_not_found when alias expired / absent", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (
        q.includes("FROM project_memberships") &&
        q.includes("project_display_name IS NOT NULL")
      ) {
        return [
          {
            id: "mem-ada",
            user_id: "bot-ada",
            project_display_name: "Ada Prime",
          },
        ];
      }
      if (q.includes("project_membership_display_name_aliases")) {
        return [];
      }
      return [];
    });
    const result = await resolveDispatchRecipients({
      projectId: "proj-1",
      actorUserId: "bot-1",
      toProjectDisplayName: "Ada",
      toTeamLabel: null,
    });
    expect(result).toEqual({ ok: false, code: "recipient_not_found" });
  });
});
