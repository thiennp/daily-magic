/**
 * Invite → wake owner flow (server half, in-memory DB):
 * bot redeemed + active → owner Access snapshot says "awaiting" → bot status
 * tool says not registered → owner opens the deep link and pastes in the Grok
 * wake-link form (owner PUT) → snapshot says "set" and the bot sees registered.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GUARDED_INSERT } from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";

const requireAuth = vi.hoisted(() => vi.fn());
const resolveSeat = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());

const db = { grokUrl: null as string | null };

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/resolveOwnerOrActiveHumanSeat", () => ({
  resolveOwnerOrActiveHumanSeat: resolveSeat,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
  })),
}));
vi.mock("@/lib/projects/acl/listProjectMembershipsForProject", () => ({
  listProjectMembershipsForProject: vi.fn(async () => []),
}));
vi.mock("@/lib/projects/acl/buildProjectAccessViews", () => ({
  buildMembershipViews: vi.fn(async () => [
    {
      id: "mem-coder",
      userId: "bot-user-1",
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
    },
  ]),
  buildPendingRequestViews: vi.fn(async () => []),
}));
vi.mock("@/lib/projects/acl/listPendingProjectAccessRequests", () => ({
  listPendingProjectAccessRequests: vi.fn(async () => []),
}));
vi.mock("@/lib/projects/acl/enrichProjectAccessComputerMembers", () => ({
  enrichProjectAccessComputerMembers: vi.fn(async (rows: unknown) => rows),
}));
vi.mock("@/lib/projects/acl/resolveAccessComputerLiveDeviceIds", () => ({
  resolveAccessComputerLiveDeviceIds: vi.fn(async () => new Set()),
}));
vi.mock("@/app/api/projects/[projectId]/access/patchAccessAction", () => ({
  handleProjectAccessPatch: vi.fn(),
}));
vi.mock("@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl", () => ({
  assertSafeProjectWebhookUrl: vi.fn(async (raw: unknown) =>
    String(raw).startsWith("https://")
      ? { ok: true, url: new URL(String(raw)) }
      : { ok: false, code: "https_only" },
  ),
}));

import { PUT } from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";
import { GET } from "@/app/api/projects/[projectId]/access/route";
import {
  buildAwcGrokWakeLinkHref,
  parseAwcGrokWakeLinkHash,
} from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { listMembersAwaitingWakeLink } from "@/features/projects/access/utils/resolveMemberWakeLinkState";
import { executeGetMyProjectWebhookStatusTool } from "@/lib/agentAccess/executeGetMyProjectWebhookStatusTool";

const fakeSql = async (
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<unknown[]> => {
  const text = strings.join("?");
  if (text.includes(GUARDED_INSERT)) {
    db.grokUrl = String(values[0]);
    return [{ webhook_url: values[0] }];
  }
  if (text.includes("grok_wake_link_set")) {
    return [
      {
        id: "mem-coder",
        grok_wake_link_set: db.grokUrl !== null,
        other_wake_link_set: false,
      },
    ];
  }
  if (text.includes("LEFT JOIN project_membership_grok_routine_webhooks")) {
    return [{ webhook_url: db.grokUrl, last_wake_result: null }];
  }
  if (text.includes("LEFT JOIN project_membership_webhooks")) {
    return [{ webhook_url: null, secret_set: false }];
  }
  return [];
};

const ownerSnapshot = async () => {
  const response = await GET(new Request("http://local/access"), {
    params: Promise.resolve({ projectId: "proj-1" }),
  });
  expect(response.status).toBe(200);
  return (await response.json()) as {
    members: { id: string; isAgent: boolean; wakeLinkSet?: boolean }[];
  };
};

const botStatus = async (): Promise<string> =>
  JSON.stringify(
    await executeGetMyProjectWebhookStatusTool({
      actor: { id: "bot-user-1" } as never,
      args: { projectId: "proj-1" },
    }),
  );

beforeEach(() => {
  db.grokUrl = null;
  sqlMock.mockReset();
  sqlMock.mockImplementation(fakeSql);
  requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
  resolveSeat.mockResolvedValue({
    ok: true,
    kind: "owner",
    project: { id: "proj-1", name: "P" },
  });
});

describe("invite → wake: owner paste path", () => {
  it("awaiting after redeem, deep link targets the row, owner paste clears it", async () => {
    // 1. Bot redeemed and is an active member; no wake link yet.
    const before = await ownerSnapshot();
    expect(before.members[0]?.wakeLinkSet).toBe(false);
    expect(listMembersAwaitingWakeLink(before.members)).toHaveLength(1);

    // 2. Bot created its routine; it cannot see the link, status says not registered.
    expect(await botStatus()).toMatch(/grokWebhookRegistered\\":false/);

    // 3. Owner deep link lands on that member's Grok wake-link form.
    const href = buildAwcGrokWakeLinkHref("proj-1", "mem-coder");
    expect(href).toBe("/projects/proj-1#wake-link-mem-coder");
    expect(parseAwcGrokWakeLinkHash(href.slice(href.indexOf("#")))).toBe(
      before.members[0]?.id,
    );

    // 4. A bad paste is rejected and nothing changes.
    const bad = await PUT(
      new Request("http://local/x", {
        method: "PUT",
        body: JSON.stringify({ webhookUrl: "http://x", webhookKey: "k" }),
      }),
      {
        params: Promise.resolve({
          projectId: "proj-1",
          membershipId: "mem-coder",
        }),
      },
    );
    expect(bad.status).toBe(400);
    expect((await ownerSnapshot()).members[0]?.wakeLinkSet).toBe(false);

    // 5. Owner pastes wake link + key from the routine.
    const saved = await PUT(
      new Request("http://local/x", {
        method: "PUT",
        body: JSON.stringify({
          webhookUrl: "https://hooks.example.com/wake/abc",
          webhookKey: "routine-key",
        }),
      }),
      {
        params: Promise.resolve({
          projectId: "proj-1",
          membershipId: "mem-coder",
        }),
      },
    );
    expect(saved.status).toBe(200);
    const savedBody = await saved.json();
    expect(savedBody).toMatchObject({ ok: true, grokWebhookRegistered: true });
    expect(JSON.stringify(savedBody)).not.toContain("routine-key");

    // 6. Awaiting clears for the owner; the bot now sees registered.
    const after = await ownerSnapshot();
    expect(after.members[0]?.wakeLinkSet).toBe(true);
    expect(listMembersAwaitingWakeLink(after.members)).toHaveLength(0);
    expect(await botStatus()).toMatch(/grokWebhookRegistered\\":true/);
  });

  it("human seats never get the wake-link flag", async () => {
    resolveSeat.mockResolvedValue({
      ok: true,
      kind: "human",
      project: { id: "proj-1", name: "P" },
      membership: { role: "member", memberKind: "human" },
    });
    const snapshot = await ownerSnapshot();
    expect(snapshot.members[0]).not.toHaveProperty("wakeLinkSet");
    expect(
      sqlMock.mock.calls.some((call) =>
        (call[0] as string[]).join("?").includes("grok_wake_link_set"),
      ),
    ).toBe(false);
  });
});
