import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (v: unknown) => (Array.isArray(v) ? v : []),
}));

vi.mock(
  "@/lib/projects/acl/messaging/projectHasSyncedComputerForPrune",
  () => ({
    projectHasSyncedComputerForPrune: vi.fn(async () => true),
  }),
);

vi.mock(
  "@/lib/projects/acl/messaging/messageHasSyncedComputerAckForPrune",
  () => ({
    messageHasSyncedComputerAckForPrune: vi.fn(async () => true),
  }),
);

import { projectHasSyncedComputerForPrune } from "@/lib/projects/acl/messaging/projectHasSyncedComputerForPrune";
import { pruneProjectChatMessages } from "@/lib/projects/acl/messaging/pruneProjectChatMessages";

describe("pruneProjectChatMessages", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    vi.mocked(projectHasSyncedComputerForPrune).mockResolvedValue(true);
  });

  it("returns 0 when project has no synced computer", async () => {
    vi.mocked(projectHasSyncedComputerForPrune).mockResolvedValue(false);
    await expect(
      pruneProjectChatMessages({ projectId: "p1", chatKey: "whole" }),
    ).resolves.toBe(0);
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("deletes candidate rows that have computer acks", async () => {
    sqlMock
      .mockResolvedValueOnce([{ id: "m-old" }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "m-old" }]);
    await expect(
      pruneProjectChatMessages({
        projectId: "p1",
        chatKey: "bot-1",
        keep: 300,
      }),
    ).resolves.toBe(1);
  });
});
