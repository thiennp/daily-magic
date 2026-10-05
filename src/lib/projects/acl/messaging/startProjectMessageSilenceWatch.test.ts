import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { startProjectMessageSilenceWatch } from "@/lib/projects/acl/messaging/startProjectMessageSilenceWatch";

const now = new Date("2026-10-05T08:00:00.000Z");

describe("startProjectMessageSilenceWatch", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([{ id: "del-1" }]);
  });

  it("watches accepted wakes but excludes viewer seats in SQL", async () => {
    const watched = await startProjectMessageSilenceWatch({
      messageId: "msg-1",
      senderMembershipId: "mem-a",
      wakeResults: [
        { membershipId: "mem-b", result: "http_200" },
        { membershipId: "mem-c", result: "not_postable" },
      ],
      now,
    });
    expect(watched).toBe(1);
    const [strings, ...values] = sqlMock.mock.calls[0] ?? [];
    const query = (strings as readonly string[]).join("?");
    expect(query).toContain("UPDATE project_message_deliveries");
    expect(query).toMatch(/NOT EXISTS[\s\S]*role = 'viewer'/);
    expect(values).toContainEqual(["mem-b"]);
  });

  it("does nothing without an accepted wake", async () => {
    expect(
      await startProjectMessageSilenceWatch({
        messageId: "msg-1",
        senderMembershipId: "mem-a",
        wakeResults: [{ membershipId: "mem-a", result: "http_200" }],
        now,
      }),
    ).toBe(0);
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
