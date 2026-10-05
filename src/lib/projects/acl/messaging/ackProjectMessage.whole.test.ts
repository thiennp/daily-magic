import { beforeEach, describe, expect, it, vi } from "vitest";

import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";

const sqlMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => {},
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: async () => ({
    id: "mem-planner",
    teamLabel: null,
  }),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => ({
    id: "proj-trip",
    ownerUserId: "user-jordan",
  }),
}));
vi.mock("@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome", () => ({
  deleteProjectMessageWithOutcome: (input: unknown) => deleteMock(input),
}));

const wholeRow = {
  id: "msg-whole",
  project_id: "proj-trip",
  to_user_id: null,
  to_team_label: null,
  to_membership_id: null,
};

describe("ackProjectMessage on a Whole project message", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    deleteMock.mockReset();
  });

  it("acks only this bot's delivery and keeps the shared row", async () => {
    sqlMock.mockImplementation(
      async (strings: TemplateStringsArray, ...values: unknown[]) => {
        const text = strings.join("?");
        if (text.includes("SELECT * FROM project_messages")) return [wholeRow];
        expect(text).toContain("SET b2b_state = 'acked'");
        expect(values).toContain("mem-planner");
        expect(values.find(Array.isArray)).not.toContain("blocked_silent_10m");
        return [{ mine_count: 1 }];
      },
    );
    expect(
      await ackProjectMessage({
        messageId: "msg-whole",
        actorUserId: "user-planner",
      }),
    ).toEqual({
      ok: true,
      messageId: "msg-whole",
    });
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("a bot without a delivery is forbidden", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
      strings.join("?").includes("SELECT * FROM project_messages")
        ? [wholeRow]
        : [{ mine_count: 0 }],
    );
    expect(
      await ackProjectMessage({
        messageId: "msg-whole",
        actorUserId: "user-x",
      }),
    ).toEqual({
      ok: false,
      code: "forbidden",
    });
  });
});
