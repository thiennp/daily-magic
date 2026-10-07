import { beforeEach, describe, expect, it, vi } from "vitest";

const parents = vi.hoisted(() => new Map<string, string | null>());
const wakeMock = vi.hoisted(() => vi.fn());
const persistMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql:
    () =>
    async (_strings: TemplateStringsArray, ...values: unknown[]) => {
      const id = String(values[0]);
      if (!parents.has(id) || values[1] !== "proj-1") return [];
      return [{ sender_membership_id: parents.get(id) }];
    },
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  wakeProjectGrokRoutineWebhooks: wakeMock,
}));
vi.mock(
  "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt",
  () => ({ persistProjectGrokRoutineWakeAttempt: persistMock }),
);

import { wakeProjectMessageGrokRoutines } from "@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines";

const TASK = "11111111-2222-4333-8444-555555555555";
const OWNER_TASK = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
const SKIP = "skipped_by_policy";

const send = (kind: string, summary: string, recipients: string[]) =>
  wakeProjectMessageGrokRoutines({
    projectId: "proj-1",
    messageId: "msg-reply",
    kind,
    summary,
    senderMembershipId: "mem-worker",
    senderProjectDisplayName: "Worker",
    recipientMembershipIds: recipients,
  });
const wokenIds = () =>
  wakeMock.mock.calls.map((call) => call[0].recipientMembershipIds);

describe("done / blocked wake only the assigner (DF-026)", () => {
  beforeEach(() => {
    parents.clear();
    parents.set(TASK, "mem-lead");
    parents.set(OWNER_TASK, null);
    wakeMock.mockReset();
    wakeMock.mockImplementation(
      async (input: { recipientMembershipIds: string[] }) =>
        input.recipientMembershipIds.map((id) => ({
          membershipId: id,
          result: "http_200",
        })),
    );
    persistMock.mockReset();
    persistMock.mockResolvedValue(undefined);
  });

  it.each(["task.done", "task.blocked"])(
    "%s to the assigner wakes it; other recipients are skipped_by_policy",
    async (kind) => {
      const results = await send(kind, `${TASK}: shipped`, [
        "mem-lead",
        "mem-other",
        "mem-lead",
      ]);
      expect(wokenIds()).toEqual([["mem-lead"]]);
      expect(results).toEqual([
        { membershipId: "mem-other", result: SKIP },
        { membershipId: "mem-lead", result: "http_200" },
      ]);
      expect(persistMock).toHaveBeenCalledWith({
        messageId: "msg-reply",
        membershipId: "mem-other",
        result: SKIP,
      });
    },
  );

  it.each([
    ["to a non-assigner", `${TASK}: shipped`, ["mem-other"]],
    [
      "without inReplyTo (no fallback to a direct bot)",
      "shipped",
      ["mem-lead"],
    ],
    [
      "when the task row is gone",
      "12345678-1234-4234-8234-123456789012: ok",
      ["mem-lead"],
    ],
    ["when the owner assigned it", `${OWNER_TASK}: ok`, ["mem-lead"]],
  ])(
    "task.done %s is skipped_by_policy",
    async (_label, summary, recipients) => {
      const results = await send("task.done", summary, recipients);
      expect(wakeMock).not.toHaveBeenCalled();
      expect(results).toEqual(
        recipients.map((id) => ({ membershipId: id, result: SKIP })),
      );
    },
  );

  it("normal kinds keep waking every recipient unchanged", async () => {
    await send("task.assign", "do it", ["mem-a", "mem-a", "mem-b"]);
    expect(wokenIds()).toEqual([["mem-a", "mem-a", "mem-b"]]);
    expect(persistMock).not.toHaveBeenCalled();
  });
});
