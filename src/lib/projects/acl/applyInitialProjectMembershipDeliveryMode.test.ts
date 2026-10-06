import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const setMode = vi.fn<(input: unknown) => Promise<boolean>>(async () => true);
const wakeLinks = vi.fn<(input: unknown) => Promise<Map<string, boolean>>>(
  async () => new Map(),
);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema", () => ({
  ensureProjectMembershipDeliveryModeSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/setProjectMembershipDeliveryMode", () => ({
  setProjectMembershipDeliveryMode: (input: unknown) => setMode(input),
}));
vi.mock("@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet", () => ({
  loadProjectMemberWakeLinkSet: (input: unknown) => wakeLinks(input),
}));

import { applyInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/applyInitialProjectMembershipDeliveryMode";

const invitePlatform = (platform: string | null) =>
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
    String(strings).includes("FROM project_invites") ? [{ platform }] : [],
  );

describe("applyInitialProjectMembershipDeliveryMode (join)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    setMode.mockClear();
    wakeLinks.mockReset();
    wakeLinks.mockResolvedValue(new Map());
  });

  it("muse invite, no wake link → writes poll", async () => {
    invitePlatform("muse");
    const mode = await applyInitialProjectMembershipDeliveryMode({
      projectId: "p1",
      membershipId: "m1",
      inviteId: "inv-1",
    });
    expect(mode).toBe("poll");
    expect(setMode).toHaveBeenCalledWith({
      projectId: "p1",
      membershipId: "m1",
      deliveryMode: "poll",
    });
  });

  it("grok invite → webhook (Waiting for wake link)", async () => {
    invitePlatform("grok");
    await expect(
      applyInitialProjectMembershipDeliveryMode({
        projectId: "p1",
        membershipId: "m1",
        inviteId: "inv-1",
      }),
    ).resolves.toBe("webhook");
    expect(setMode).toHaveBeenCalledWith(
      expect.objectContaining({ deliveryMode: "webhook" }),
    );
  });

  it("stored wake link wins over a non-Grok platform", async () => {
    invitePlatform("muse");
    wakeLinks.mockResolvedValue(new Map([["m1", true]]));
    await expect(
      applyInitialProjectMembershipDeliveryMode({
        projectId: "p1",
        membershipId: "m1",
        inviteId: "inv-1",
      }),
    ).resolves.toBe("webhook");
  });

  it("no invite (access request) → webhook default, no invite read", async () => {
    sqlMock.mockResolvedValue([]);
    await expect(
      applyInitialProjectMembershipDeliveryMode({
        projectId: "p1",
        membershipId: "m1",
        inviteId: null,
      }),
    ).resolves.toBe("webhook");
    expect(sqlMock).not.toHaveBeenCalled();
    expect(setMode).toHaveBeenCalledTimes(1);
  });

  it("never throws: a failed write keeps the webhook default", async () => {
    invitePlatform("muse");
    setMode.mockRejectedValueOnce(new Error("db down"));
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await expect(
      applyInitialProjectMembershipDeliveryMode({
        projectId: "p1",
        membershipId: "m1",
        inviteId: "inv-1",
      }),
    ).resolves.toBe("webhook");
    spy.mockRestore();
  });
});
