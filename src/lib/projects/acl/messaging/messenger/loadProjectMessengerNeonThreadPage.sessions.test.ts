import { beforeEach, describe, expect, it, vi } from "vitest";

import { PROJECT_MESSENGER_ENTRY_KIND_SESSION } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

const runsPageMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => async () => [],
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
vi.mock("@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots", () => ({
  loadProjectMessengerBots: async () => [],
}));
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerDeliveries",
  () => ({ loadProjectMessengerDeliveries: async () => [] }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonAgentRunsPage",
  () => ({
    loadProjectMessengerNeonAgentRunsPage: (input: unknown) =>
      runsPageMock(input),
  }),
);

import { loadProjectMessengerNeonThreadPage } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage";
import { mapAgentRunToMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/mapAgentRunToMessengerTimelineEntry";

const RUN_ID = "12345678-1234-4234-8234-123456789abc";

describe("loadProjectMessengerNeonThreadPage sessions (whole-only)", () => {
  beforeEach(() => {
    runsPageMock.mockReset();
    runsPageMock.mockResolvedValue({
      entries: [
        mapAgentRunToMessengerTimelineEntry({
          id: RUN_ID,
          createdAt: "2026-10-07T05:00:00.000000Z",
          status: "completed",
          writerAgent: "codex",
          prompt: "Fix tests",
        }),
      ],
      hasMore: false,
    });
  });

  it("merges agent_runs sessions on whole thread", async () => {
    const page = await loadProjectMessengerNeonThreadPage({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      threadKey: "whole",
      before: null,
      limit: 50,
    });
    expect(runsPageMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      before: null,
      limit: 50,
    });
    expect(page.entries).toHaveLength(1);
    expect(page.entries[0]?.messageId).toBe(RUN_ID);
    expect(page.entries[0]?.entryKind).toBe(PROJECT_MESSENGER_ENTRY_KIND_SESSION);
    expect(page.entries[0]?.session?.agentRunId).toBe(RUN_ID);
  });

  it("skips agent_runs on bot threads", async () => {
    const page = await loadProjectMessengerNeonThreadPage({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      threadKey: "bot-membership-1",
      before: null,
      limit: 50,
    });
    expect(runsPageMock).not.toHaveBeenCalled();
    expect(page.entries).toEqual([]);
  });
});
