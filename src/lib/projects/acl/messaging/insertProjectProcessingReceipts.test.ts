import { beforeEach, describe, expect, it, vi } from "vitest";

const receiptMock = vi.fn();

vi.mock("@/lib/projects/acl/messaging/insertProjectProcessingReceipt", () => ({
  insertProjectProcessingReceipt: (input: unknown) => receiptMock(input),
}));

import { insertProjectProcessingReceipts } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipts";

const recipients = [
  { id: "mem-b", user_id: "user-b" },
  { id: "mem-c", user_id: "user-c" },
  { id: null, user_id: "user-owner" },
];

const run = (
  wakeResults: readonly { membershipId: string; result: string }[],
) =>
  insertProjectProcessingReceipts({
    projectId: "proj-1",
    senderMembershipId: "mem-a",
    recipients,
    originalMessageId: "msg-1",
    wakeResults,
  });

describe("insertProjectProcessingReceipts (Grok path)", () => {
  beforeEach(() => {
    receiptMock.mockClear();
  });

  it("calls the shared receipt once per http_200 recipient peer", async () => {
    await run([
      { membershipId: "mem-b", result: "http_200" },
      { membershipId: "mem-c", result: "not_postable" },
      { membershipId: "mem-stranger", result: "http_200" },
    ]);
    expect(receiptMock.mock.calls.map((call) => call[0])).toEqual([
      {
        projectId: "proj-1",
        peer: "mem-b",
        sender: "mem-a",
        originalMessageId: "msg-1",
      },
    ]);
  });

  it("calls nothing when no wake is http_200", async () => {
    await run([
      { membershipId: "mem-b", result: "fetch_failed" },
      { membershipId: "mem-c", result: "http_500" },
    ]);
    expect(receiptMock).not.toHaveBeenCalled();
  });
});
