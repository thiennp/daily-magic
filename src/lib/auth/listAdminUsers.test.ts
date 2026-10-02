import { beforeEach, describe, expect, it, vi } from "vitest";

import listAdminUsers from "@/lib/auth/listAdminUsers";
import { GlobalRole } from "@/lib/auth/roles";

const listUsersMock = vi.fn();
const loadActivityMock = vi.fn();

vi.mock("@/lib/auth/userRepository", () => ({
  listUsers: (...args: unknown[]) => listUsersMock(...args),
}));

vi.mock("@/lib/auth/loadAdminUsersLastActivity", () => ({
  default: (...args: unknown[]) => loadActivityMock(...args),
}));

describe("listAdminUsers", () => {
  beforeEach(() => {
    listUsersMock.mockReset();
    loadActivityMock.mockReset();
  });

  it("adds kind and lastActivityAt without copying createdAt", async () => {
    listUsersMock.mockResolvedValue([
      {
        id: "bot-1",
        email: "scout@agents.agentwitch.com",
        name: "Scout",
        image: null,
        globalRole: GlobalRole.USER,
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      {
        id: "real-1",
        email: "human@example.com",
        name: null,
        image: null,
        globalRole: GlobalRole.USER,
        createdAt: "2026-01-02T00:00:00.000Z",
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
        kind: "real",
        lastActivityAt: null,
      },
    ]);
  });
});
