import { beforeEach, describe, expect, it, vi } from "vitest";

import listAdminUsers from "@/lib/auth/listAdminUsers";
import { GlobalRole } from "@/lib/auth/roles";

const listUsersWithPlanMock = vi.fn();
const loadActivityMock = vi.fn();

vi.mock("@/lib/auth/userRepository", () => ({
  listUsersWithPlan: (...args: unknown[]) => listUsersWithPlanMock(...args),
}));

vi.mock("@/lib/auth/loadAdminUsersLastActivity", () => ({
  default: (...args: unknown[]) => loadActivityMock(...args),
}));

describe("listAdminUsers", () => {
  beforeEach(() => {
    listUsersWithPlanMock.mockReset();
    loadActivityMock.mockReset();
  });

  it("adds kind and lastActivityAt without copying createdAt", async () => {
    listUsersWithPlanMock.mockResolvedValue([
      {
        id: "bot-1",
        email: "scout@agents.agentwitch.com",
        name: "Scout",
        image: null,
        globalRole: GlobalRole.USER,
        createdAt: "2026-01-01T00:00:00.000Z",
        plan: "trial",
        adminFree: false,
      },
      {
        id: "real-1",
        email: "human@example.com",
        name: null,
        image: null,
        globalRole: GlobalRole.USER,
        createdAt: "2026-01-02T00:00:00.000Z",
        plan: "pro",
        adminFree: false,
      },
    ]);
    loadActivityMock.mockResolvedValue(
      new Map([["bot-1", "2026-06-01T12:00:00.000Z"]]),
    );

    const users = await listAdminUsers();

    expect(users).toEqual([
      {
        id: "bot-1",
        email: "scout@agents.agentwitch.com",
        name: "Scout",
        image: null,
        globalRole: GlobalRole.USER,
        createdAt: "2026-01-01T00:00:00.000Z",
        plan: "trial",
        adminFree: false,
        kind: "bot",
        lastActivityAt: "2026-06-01T12:00:00.000Z",
      },
      {
        id: "real-1",
        email: "human@example.com",
        name: null,
        image: null,
        globalRole: GlobalRole.USER,
        createdAt: "2026-01-02T00:00:00.000Z",
        plan: "pro",
        adminFree: false,
        kind: "real",
        lastActivityAt: null,
      },
    ]);
  });
});
