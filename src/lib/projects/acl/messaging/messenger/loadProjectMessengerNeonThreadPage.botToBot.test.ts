import { describe, expect, it, vi } from "vitest";

const KAI = "11111111-1111-4111-8111-111111111111";
const LEAD = "22222222-2222-4222-8222-222222222222";

const dbRow = {
  id: "msg-b2b",
  kind: "task.status",
  summary: "handoff: DF-023 owner rows",
  created_at: "2026-10-07T19:00:00.000Z",
  cursor_at: "2026-10-07T19:00:00.000000Z",
  sender_membership_id: KAI,
  sender_user_id: "user-kai",
  to_membership_id: LEAD,
  to_user_id: "user-lead",
  to_team_label: null,
  sender_display_name: "Kai",
  sender_member_kind: "bot",
  recipient_member_kind: "bot",
  recipient_display_name: "AW Lead",
};

vi.mock("@/lib/db", () => ({
  getSql: () => async () => [dbRow],
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: async () => undefined,
}));
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots",
  () => ({
    loadProjectMessengerBots: async () => [
      { membershipId: KAI, displayName: "Kai", deliveryMode: "poll" },
      { membershipId: LEAD, displayName: "AW Lead", deliveryMode: "poll" },
    ],
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerDeliveries",
  () => ({ loadProjectMessengerDeliveries: async () => [] }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonAgentRunsPage",
  () => ({
    loadProjectMessengerNeonAgentRunsPage: async () => ({
      entries: [],
      hasMore: false,
    }),
  }),
);

import { loadProjectMessengerNeonThreadPage } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage";

const base = {
  projectId: "proj-1",
  ownerUserId: "owner-1",
  threadKey: "whole",
  before: null,
  limit: 50,
} as const;

describe("loadProjectMessengerNeonThreadPage bot↔bot (DF-023)", () => {
  it("owner read returns the bot↔bot row as a compact peer entry", async () => {
    const page = await loadProjectMessengerNeonThreadPage({
      ...base,
      includeBotToBot: true,
    });
    expect(page.entries).toHaveLength(1);
    expect(page.entries[0]).toMatchObject({
      messageId: "msg-b2b",
      author: { kind: "bot", membershipId: KAI, displayName: "Kai" },
      kind: "task.status",
      text: "handoff: DF-023 owner rows",
      peer: {
        toMembershipId: LEAD,
        toDisplayName: "AW Lead",
        toTeamLabel: null,
      },
    });
  });

  it("default (member) read keeps the bot↔bot row out", async () => {
    const page = await loadProjectMessengerNeonThreadPage(base);
    expect(page.entries).toHaveLength(0);
  });

  it("bot threads never carry bot↔bot rows, even for the owner", async () => {
    const page = await loadProjectMessengerNeonThreadPage({
      ...base,
      threadKey: KAI,
      includeBotToBot: true,
    });
    expect(page.entries).toHaveLength(0);
  });
});
