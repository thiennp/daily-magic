import { describe, expect, it, vi } from "vitest";

const KAI = "11111111-1111-4111-8111-111111111111";
const TASK = "33333333-3333-4333-8333-333333333333";
const OWNER = "owner-1";

vi.mock("@/lib/db", async () => {
  const fx =
    await import("@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage.notices.fixtures");
  return {
    getSql: () => async () => fx.NOTICE_PAGE_DB_ROWS,
    asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
  };
});
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
  ownerUserId: OWNER,
  threadKey: "whole",
  before: null,
  limit: 50,
} as const;

describe("loadProjectMessengerNeonThreadPage notices + archive meta", () => {
  it("owner read returns the server notice and archive meta", async () => {
    const page = await loadProjectMessengerNeonThreadPage({
      ...base,
      notices: "owner",
    });
    expect(page.entries.map((entry) => entry.messageId)).toEqual([
      "notice-1",
      TASK,
    ]);
    expect(page.entries[0]).toMatchObject({
      author: { kind: "system" },
      kind: "composer.recipient_sticky_cleared",
      states: [],
    });
    expect(page.entries[1].archived).toEqual({
      at: "2026-10-07T19:05:00.000Z",
      byUserId: OWNER,
      byDisplayName: "Owner",
    });
  });

  it("member read and the default (no notices) keep it out", async () => {
    for (const notices of ["member", undefined] as const) {
      const page = await loadProjectMessengerNeonThreadPage({
        ...base,
        ...(notices !== undefined ? { notices } : {}),
      });
      expect(page.entries.map((entry) => entry.messageId)).toEqual([TASK]);
    }
  });
});
