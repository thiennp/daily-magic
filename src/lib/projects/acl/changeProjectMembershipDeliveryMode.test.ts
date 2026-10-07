import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  row: { id: "mem-b", project_display_name: "Muse" } as Record<
    string,
    unknown
  > | null,
  mode: "webhook",
  wakeLinkSet: false,
}));
const sqlMock = vi.fn(
  async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join("?");
    if (text.includes("SELECT id, project_display_name")) {
      return db.row === null ? [] : [db.row];
    }
    if (text.includes("SET delivery_mode")) {
      const next = String(values[0]);
      if (next === db.mode) return [];
      db.mode = next;
      return [{ id: "mem-b" }];
    }
    return [];
  },
);
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet", () => ({
  loadProjectMemberWakeLinkSet: async () =>
    new Map([["mem-b", db.wakeLinkSet]]),
}));

import { changeProjectMembershipDeliveryMode } from "@/lib/projects/acl/changeProjectMembershipDeliveryMode";

const change = (deliveryMode: unknown, by: "owner" | "member" = "owner") =>
  changeProjectMembershipDeliveryMode({
    projectId: "proj-1",
    actorUserId: by === "owner" ? "owner-1" : "bot-user",
    target:
      by === "owner"
        ? { by: "member_row", membershipId: "mem-b" }
        : { by: "own_membership" },
    deliveryMode,
  });

describe("changeProjectMembershipDeliveryMode", () => {
  beforeEach(() => {
    db.row = { id: "mem-b", project_display_name: "Muse" };
    db.mode = "webhook";
    db.wakeLinkSet = false;
  });

  it("owner flips to poll without a wake link (no re-invite)", async () => {
    expect(await change("poll")).toEqual({
      ok: true,
      membershipId: "mem-b",
      deliveryMode: "poll",
      changed: true,
      activity: "You switched Muse to checks in only when asked",
    });
    expect(db.mode).toBe("poll");
  });

  it("webhook needs a stored wake link", async () => {
    db.mode = "poll";
    expect(await change("webhook")).toEqual({
      ok: false,
      code: "wake_link_required",
    });
    db.wakeLinkSet = true;
    const result = await change("webhook");
    expect(result).toMatchObject({
      ok: true,
      changed: true,
      activity: "You switched Muse to wakes up on its own",
    });
  });

  it("member self-switch uses member Activity copy; same mode is a no-op", async () => {
    expect(await change("poll", "member")).toMatchObject({
      changed: true,
      activity: "Muse switched to checks in only when asked",
    });
    expect(await change("poll", "member")).toMatchObject({ changed: false });
  });

  it("rejects unknown modes and missing seats", async () => {
    expect(await change("no_wake")).toEqual({
      ok: false,
      code: "invalid_delivery_mode",
    });
    db.row = null;
    expect(await change("poll")).toEqual({ ok: false, code: "not_found" });
  });
});
