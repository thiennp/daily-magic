import { beforeEach, describe, expect, it, vi } from "vitest";

import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));

import { enrichProjectAccessBotWakeLinks } from "@/lib/projects/acl/enrichProjectAccessBotWakeLinks";

const member = (overrides: Partial<MembershipView>): MembershipView => ({
  id: "mem-bot",
  userId: "user-bot",
  role: "member",
  memberKind: "bot",
  status: "active",
  teamLabel: null,
  scopes: [],
  projectDisplayName: "Coder",
  isAgent: true,
  displayName: null,
  email: null,
  image: null,
  createdAt: "2026-10-06T06:00:00.000Z",
  revokedAt: null,
  ...overrides,
});

const queryText = (): string =>
  sqlMock.mock.calls.map((call) => (call[0] as string[]).join("?")).join("\n");

beforeEach(() => {
  sqlMock.mockReset();
});

describe("enrichProjectAccessBotWakeLinks", () => {
  it("flags active member bots: false until a wake link exists, true after", async () => {
    sqlMock.mockResolvedValue([
      { id: "mem-bot", grok_wake_link_set: false, other_wake_link_set: false },
      { id: "mem-set", grok_wake_link_set: true, other_wake_link_set: false },
    ]);
    const out = await enrichProjectAccessBotWakeLinks("proj-1", [
      member({}),
      member({ id: "mem-set", userId: "user-set" }),
    ]);
    expect(out.map((m) => m.wakeLinkSet)).toEqual([false, true]);
    expect(sqlMock.mock.calls[0]?.slice(1)).toEqual([
      "proj-1",
      ["mem-bot", "mem-set"],
    ]);
  });

  it("counts a bot-registered other wake link as set", async () => {
    sqlMock.mockResolvedValue([
      { id: "mem-bot", grok_wake_link_set: "f", other_wake_link_set: "t" },
    ]);
    const [out] = await enrichProjectAccessBotWakeLinks("proj-1", [member({})]);
    expect(out?.wakeLinkSet).toBe(true);
  });

  it("never flags humans, computers, owners, pending-name or revoked rows", async () => {
    const rows = [
      member({ id: "h", isAgent: false, memberKind: "human" }),
      member({ id: "c", memberKind: "computer" }),
      member({ id: "o", role: "owner" }),
      member({ id: "n", status: "naming_required" }),
      member({ id: "r", status: "revoked" }),
    ];
    const out = await enrichProjectAccessBotWakeLinks("proj-1", rows);
    expect(out).toBe(rows);
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("selects flags only — no URL, bearer or secret columns", async () => {
    sqlMock.mockResolvedValue([]);
    await enrichProjectAccessBotWakeLinks("proj-1", [member({})]);
    const text = queryText();
    expect(text).toContain("project_membership_grok_routine_webhooks");
    expect(text).toContain("m.project_id = ");
    expect(text).not.toMatch(/bearer_retained|secret_retained/);
    expect(text).not.toMatch(/SELECT\s+w\.webhook_url/);
  });

  it("omits the flag (no awaiting UI) when the read fails", async () => {
    sqlMock.mockRejectedValue(new Error("db down"));
    const [out] = await enrichProjectAccessBotWakeLinks("proj-1", [member({})]);
    expect(out).not.toHaveProperty("wakeLinkSet");
  });
});
