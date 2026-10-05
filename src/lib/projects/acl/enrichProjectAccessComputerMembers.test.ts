import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  loadUserProfilesByIds: vi.fn(async () => {
    const map = new Map();
    map.set("owner-1", {
      id: "owner-1",
      name: "Thien",
      email: "t@example.com",
      image: null,
      isAgent: false,
    });
    return map;
  }),
}));

import { enrichProjectAccessComputerMembers } from "@/lib/projects/acl/enrichProjectAccessComputerMembers";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

const computerBase: MembershipView = {
  id: "mem-c",
  userId: "owner-1",
  role: "member",
  memberKind: "computer",
  status: "active",
  teamLabel: null,
  scopes: [],
  projectDisplayName: "Thien's MacBook Pro",
  isAgent: false,
  displayName: "Thien",
  email: "t@example.com",
  image: null,
  createdAt: "2026-10-05T00:00:00.000Z",
  revokedAt: null,
  deviceId: "dev-1",
};

const bot: MembershipView = {
  ...computerBase,
  id: "mem-b",
  memberKind: "bot",
  projectDisplayName: "Grok",
  isAgent: true,
  deviceId: null,
};

describe("enrichProjectAccessComputerMembers", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("leaves non-computer rows unchanged and skips SQL", async () => {
    const result = await enrichProjectAccessComputerMembers([bot]);
    expect(result).toEqual([bot]);
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("enriches computer with presence and assignable true when live", async () => {
    sqlMock.mockResolvedValueOnce([
      {
        id: "dev-1",
        install_bundle_version: "40",
        last_seen_at: new Date().toISOString(),
      },
    ]);
    const [enriched] = await enrichProjectAccessComputerMembers(
      [computerBase],
      new Set(["dev-1"]),
    );
    expect(enriched).toEqual(
      expect.objectContaining({
        memberKind: "computer",
        deviceId: "dev-1",
        ownerUserId: "owner-1",
        ownerDisplayName: "Thien",
        isOnline: true,
        isDispatchReady: true,
        installBundleVersion: "40",
        connectVersionStatus: "ok",
        assignable: true,
      }),
    );
  });

  it("marks offline computer not assignable", async () => {
    sqlMock.mockResolvedValueOnce([
      {
        id: "dev-1",
        install_bundle_version: "40",
        last_seen_at: "2020-01-01T00:00:00.000Z",
      },
    ]);
    const [enriched] = await enrichProjectAccessComputerMembers(
      [computerBase],
      new Set(),
    );
    expect(enriched.assignable).toBe(false);
    expect(enriched.isOnline).toBe(false);
    expect(enriched.connectVersionStatus).toBe("ok");
  });
});
