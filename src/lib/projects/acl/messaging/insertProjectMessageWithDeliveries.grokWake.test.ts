import { describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn(async (_query: unknown) => [] as unknown[]);
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

vi.mock("@/lib/projects/acl/webhooks/deliverProjectMessageWebhooks", () => ({
  scheduleProjectMessageWebhookDelivery: vi.fn(),
}));

const wakeMock = vi.fn((_input: unknown) => {
  throw new Error("wake_down");
});
vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  wakeProjectGrokRoutineWebhooks: async (input: unknown) => {
    wakeMock(input);
    throw new Error("wake_down");
  },
}));

import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";

describe("insertProjectMessageWithDeliveries grok wake", () => {
  it("keeps the insert pending when the wake throws", async () => {
    const stored = await insertProjectMessageWithDeliveries({
      projectId: "proj-1",
      senderMembershipId: "mem-s",
      senderUserId: "user-s",
      toMembershipId: "mem-a",
      toUserId: "user-a",
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind: "task.ping",
      summary: "hello",
      refsJson: "{}",
      recipients: [{ id: "mem-a", user_id: "user-a" }],
    });
    expect(stored.messageId.length).toBeGreaterThan(0);
    expect(stored.wakeResults).toEqual([]);
    expect(wakeMock).toHaveBeenCalledTimes(1);
    const sql = sqlMock.mock.calls.map((call) => String(call[0]));
    expect(sql.some((q) => q.includes("'pending'"))).toBe(true);
    expect(
      sql.some((q) => q.includes("UPDATE project_message_deliveries")),
    ).toBe(false);
  });
});
