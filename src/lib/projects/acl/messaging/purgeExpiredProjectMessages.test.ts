import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  purgeExpiredProjectMessages,
  resetProjectMessagePurgeForTests,
} from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { PROJECT_MESSAGE_UNACKED_TTL_DAYS } from "@/lib/projects/acl/messaging/projectMessage.constants";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const historySide = vi.hoisted(() => ({
  wake: vi.fn(async () => 0),
  staleAcks: vi.fn(async () => 0),
}));

vi.mock(
  "@/lib/projects/acl/messaging/wakeProjectComputerForUnsavedOverdue",
  () => ({
    wakeProjectComputersForUnsavedOverdue: historySide.wake,
  }),
);

vi.mock(
  "@/lib/projects/acl/messaging/purgeStaleProjectMessageComputerAcks",
  () => ({
    purgeStaleProjectMessageComputerAcks: historySide.staleAcks,
  }),
);

describe("purgeExpiredProjectMessages", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    historySide.wake.mockClear();
    historySide.staleAcks.mockClear();
    resetProjectMessagePurgeForTests();
  });

  it(`hard-deletes messages older than ${PROJECT_MESSAGE_UNACKED_TTL_DAYS}d TTL`, async () => {
    sqlMock.mockResolvedValueOnce([{ id: "m1" }, { id: "m2" }]);
    const deleted = await purgeExpiredProjectMessages({ force: true });
    expect(deleted).toBe(2);
    expect(sqlMock).toHaveBeenCalledTimes(1);
    const q = String(sqlMock.mock.calls[0][0]);
    expect(q).toContain("DELETE FROM project_messages");
    expect(q).toContain("make_interval");
    expect(sqlMock.mock.calls[0]).toContain(PROJECT_MESSAGE_UNACKED_TTL_DAYS);
  });

  it("throttles repeat calls within the min interval", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "m1" }]);
    expect(await purgeExpiredProjectMessages({ force: true })).toBe(1);
    expect(await purgeExpiredProjectMessages()).toBe(0);
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("skips gated history projects and runs unsaved wake instead of TTL delete", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "m1" }]);
    historySide.wake.mockResolvedValueOnce(1);
    expect(await purgeExpiredProjectMessages({ force: true })).toBe(1);
    const q = String(sqlMock.mock.calls[0][0]);
    expect(q).toContain("project_computer_history_settings");
    expect(sqlMock.mock.calls[0]).toContainEqual(["on_configuring", "on_ready", "degraded"]);
    expect(historySide.wake).toHaveBeenCalledTimes(1);
    expect(historySide.staleAcks).toHaveBeenCalledTimes(1);
  });
});
