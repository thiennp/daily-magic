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

const apply = (joinPlatform: string | null) =>
  applyInitialProjectMembershipDeliveryMode({
    projectId: "p1",
    membershipId: "m1",
    inviteId: "inv-1",
    joinPlatform,
  });

describe("join delivery_mode: redeem joinType wins over the invite platform", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
      String(strings).includes("FROM project_invites")
        ? [{ platform: "grok" }]
        : [],
    );
    setMode.mockClear();
    wakeLinks.mockReset();
    wakeLinks.mockResolvedValue(new Map());
  });

  it.each(["claude", "chatgpt", "copilot_studio", "other"])(
    "%s on a Grok invite, no wake link → poll, no invite read",
    async (joinPlatform) => {
      await expect(apply(joinPlatform)).resolves.toBe("poll");
      expect(setMode).toHaveBeenCalledWith({
        projectId: "p1",
        membershipId: "m1",
        deliveryMode: "poll",
      });
      expect(sqlMock).not.toHaveBeenCalled();
    },
  );

  it("non-Grok type with a stored wake link → webhook", async () => {
    wakeLinks.mockResolvedValue(new Map([["m1", true]]));
    await expect(apply("claude")).resolves.toBe("webhook");
  });

  it("no joinType → invite platform (grok) as before → webhook", async () => {
    await expect(apply(null)).resolves.toBe("webhook");
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
