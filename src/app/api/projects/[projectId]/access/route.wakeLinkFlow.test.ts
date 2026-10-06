import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const resolveSeat = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
const fx = vi.hoisted(
  () =>
    async (
      key: keyof typeof import("@/lib/projects/acl/webhooks/wakeLinkFlow.fixtures").wakeFlowModuleMocks,
    ) =>
      (await import("@/lib/projects/acl/webhooks/wakeLinkFlow.fixtures"))
        .wakeFlowModuleMocks[key],
);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/resolveOwnerOrActiveHumanSeat", () => ({
  resolveOwnerOrActiveHumanSeat: resolveSeat,
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => fx("ensureSchema"));
vi.mock("@/lib/projects/userProjectQueries", () => fx("userProjects"));
vi.mock("@/lib/projects/acl/listProjectMembershipsForProject", () =>
  fx("memberships"),
);
vi.mock("@/lib/projects/acl/buildProjectAccessViews", () => fx("views"));
vi.mock("@/lib/projects/acl/listPendingProjectAccessRequests", () =>
  fx("pending"),
);
vi.mock("@/lib/projects/acl/enrichProjectAccessComputerMembers", () =>
  fx("computers"),
);
vi.mock("@/lib/projects/acl/resolveAccessComputerLiveDeviceIds", () =>
  fx("liveDevices"),
);
vi.mock("@/lib/projects/acl/ensureProjectLinkedComputerSeat", () => ({
  ensureProjectLinkedComputerSeat: async () => false,
}));
vi.mock("@/app/api/projects/[projectId]/access/patchAccessAction", () =>
  fx("patch"),
);
vi.mock("@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl", () =>
  fx("safeUrl"),
);

import {
  wakeFlowAccessSnapshot,
  wakeFlowBotStatus,
  wakeFlowOwnerPaste,
  wakeFlowSeat,
} from "@/app/api/projects/[projectId]/access/wakeLinkFlow.fixtures";
import {
  buildAwcGrokWakeLinkHref,
  parseAwcGrokWakeLinkHash,
} from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { listMembersAwaitingWakeLink } from "@/features/projects/access/utils/resolveMemberWakeLinkState";
import {
  WAKE_FLOW,
  wakeFlowDb,
  wakeFlowSql,
} from "@/lib/projects/acl/webhooks/wakeLinkFlow.fixtures";

beforeEach(() => {
  wakeFlowDb.grokUrl = null;
  sqlMock.mockReset();
  sqlMock.mockImplementation(wakeFlowSql);
  requireAuth.mockResolvedValue({
    actor: { id: WAKE_FLOW.ownerUserId },
    error: null,
  });
  resolveSeat.mockResolvedValue(wakeFlowSeat("owner"));
});

/** Redeemed bot → owner sees awaiting → deep link → owner paste → set. */
describe("invite → wake: owner paste path", () => {
  it("awaiting after redeem, deep link targets the row, paste clears it", async () => {
    const before = await wakeFlowAccessSnapshot();
    expect(before.members[0]?.wakeLinkSet).toBe(false);
    expect(listMembersAwaitingWakeLink(before.members)).toHaveLength(1);
    expect(await wakeFlowBotStatus()).toMatch(/grokWebhookRegistered\\":false/);

    const href = buildAwcGrokWakeLinkHref(
      WAKE_FLOW.projectId,
      WAKE_FLOW.membershipId,
    );
    expect(href).toBe("/projects/proj-1#wake-link-mem-coder");
    expect(parseAwcGrokWakeLinkHash(href.split("#")[1] ?? "")).toBe(
      before.members[0]?.id,
    );

    expect((await wakeFlowOwnerPaste("http://x", "k")).status).toBe(400);
    expect((await wakeFlowAccessSnapshot()).members[0]?.wakeLinkSet).toBe(
      false,
    );

    const saved = await wakeFlowOwnerPaste(
      "https://hooks.example.com/w",
      "rk-1",
    );
    expect(saved.status).toBe(200);
    const savedText = JSON.stringify(await saved.json());
    expect(savedText).toContain('"grokWebhookRegistered":true');
    expect(savedText).not.toContain("rk-1");

    const after = await wakeFlowAccessSnapshot();
    expect(after.members[0]?.wakeLinkSet).toBe(true);
    expect(listMembersAwaitingWakeLink(after.members)).toHaveLength(0);
    expect(await wakeFlowBotStatus()).toMatch(/grokWebhookRegistered\\":true/);
  });

  it("human seats never get the wake-link flag or its query", async () => {
    resolveSeat.mockResolvedValue(wakeFlowSeat("human"));
    const snapshot = await wakeFlowAccessSnapshot();
    expect(snapshot.members[0]).not.toHaveProperty("wakeLinkSet");
    const queries = sqlMock.mock.calls.map((c) => (c[0] as string[]).join("?"));
    expect(queries.some((q) => q.includes("grok_wake_link_set"))).toBe(false);
  });
});
