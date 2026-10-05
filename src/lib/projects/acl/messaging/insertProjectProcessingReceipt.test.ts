import { beforeEach, describe, expect, it, vi } from "vitest";

type Row = Record<string, unknown>;
const stored: Row[] = [];
const insertMock = vi.fn();
const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);

import { insertProjectProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipt";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

const members: Row[] = [
  { id: "mem-a", user_id: "user-a", project_display_name: "Sender Bot" },
  { id: "mem-b", user_id: "user-b", project_display_name: "Peer B" },
  { id: "mem-c", user_id: "user-c", project_display_name: null },
];

const queryText = (call: unknown[]): string =>
  (call[0] as readonly string[]).join("?");

const fakeSql = async (strings: readonly string[], ...values: unknown[]) => {
  await Promise.resolve();
  if (strings.join("?").includes("FROM project_messages")) {
    const [, kind, peer, sender, summary] = values;
    return stored.filter(
      (row) =>
        row.kind === kind &&
        row.senderMembershipId === peer &&
        row.toMembershipId === sender &&
        row.summary === summary,
    );
  }
  const ids = values[1] as readonly string[];
  return members.filter((row) => ids.includes(String(row.id)));
};

const receipt = (peer: string) =>
  insertProjectProcessingReceipt({
    projectId: "proj-1",
    peer,
    sender: "mem-a",
    originalMessageId: "msg-1",
  });

describe("insertProjectProcessingReceipt", () => {
  beforeEach(() => {
    stored.length = 0;
    sqlMock.mockReset();
    insertMock.mockReset();
    sqlMock.mockImplementation(fakeSql);
    insertMock.mockImplementation(async (input: Row) => {
      await Promise.resolve();
      stored.push(input);
      return { messageId: "receipt-1", wakeResults: [] };
    });
  });

  it("inserts one task.processing receipt from peer to sender", async () => {
    await receipt("mem-b");
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock.mock.calls[0]?.[0]).toEqual({
      projectId: "proj-1",
      senderMembershipId: "mem-b",
      senderUserId: "user-b",
      senderProjectDisplayName: "Peer B",
      toMembershipId: "mem-a",
      toUserId: "user-a",
      toTeamLabel: null,
      toProjectDisplayName: "Sender Bot",
      kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
      summary: "processing msg-1",
      refsJson: "{}",
      recipients: [{ id: "mem-a", user_id: "user-a" }],
    });
  });

  it("does not re-check membership status (same rule for Grok and HMAC)", async () => {
    await receipt("mem-b");
    const membershipQuery = sqlMock.mock.calls
      .map(queryText)
      .find((text) => text.includes("FROM project_memberships"));
    expect(membershipQuery).toBeDefined();
    expect(membershipQuery).not.toContain("status");
  });

  it("stores one receipt per peer + original even if both wake paths succeed", async () => {
    await Promise.all([receipt("mem-b"), receipt("mem-b")]);
    await receipt("mem-b"); // a later retry also finds the stored receipt
    expect(insertMock).toHaveBeenCalledTimes(1);
  });

  it("stores one receipt per distinct peer", async () => {
    await Promise.all([receipt("mem-b"), receipt("mem-c"), receipt("mem-b")]);
    expect(
      insertMock.mock.calls.map((call) => call[0].senderMembershipId),
    ).toEqual(["mem-b", "mem-c"]);
  });

  it("skips self and missing memberships", async () => {
    await receipt("mem-a");
    expect(sqlMock).not.toHaveBeenCalled();
    await receipt("mem-gone");
    expect(insertMock).not.toHaveBeenCalled();
  });
});
