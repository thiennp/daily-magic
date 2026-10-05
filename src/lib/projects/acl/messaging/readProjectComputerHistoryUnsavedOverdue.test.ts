import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { readProjectComputerHistoryUnsavedOverdue } from "@/lib/projects/acl/messaging/readProjectComputerHistoryUnsavedOverdue";
import { PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

describe("readProjectComputerHistoryUnsavedOverdue", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns null when none are overdue", async () => {
    sqlMock.mockResolvedValueOnce([{ count: 0, oldest_created_at: null }]);
    expect(
      await readProjectComputerHistoryUnsavedOverdue({ projectId: "p1" }),
    ).toBeNull();
    expect(sqlMock.mock.calls[0]).toContain(
      PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS,
    );
  });

  it("returns count and oldestCreatedAt when overdue rows exist", async () => {
    sqlMock.mockResolvedValueOnce([
      { count: 2, oldest_created_at: "2026-09-01T00:00:00.000Z" },
    ]);
    expect(
      await readProjectComputerHistoryUnsavedOverdue({ projectId: "p1" }),
    ).toEqual({ count: 2, oldestCreatedAt: "2026-09-01T00:00:00.000Z" });
  });
});
