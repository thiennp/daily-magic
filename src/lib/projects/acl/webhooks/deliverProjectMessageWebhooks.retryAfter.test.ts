import { describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

const postMock = vi.fn();
vi.mock(
  "@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook",
  () => ({
    postSignedProjectMembershipWebhook: (...args: unknown[]) =>
      postMock(...args),
  }),
);

const receiptMock = vi.fn();
vi.mock(
  "@/lib/projects/acl/webhooks/maybeInsertProjectHmacProcessingReceipt",
  () => ({
    maybeInsertProjectHmacProcessingReceipt: (...args: unknown[]) =>
      receiptMock(...args),
  }),
);

vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  loadPostableGrokRoutineWebhookMembershipIds: async () => new Set(),
}));

import { deliverProjectMessageWebhooks } from "@/lib/projects/acl/webhooks/deliverProjectMessageWebhooks";

describe("deliverProjectMessageWebhooks 429 Retry-After", () => {
  const payload = {
    projectId: "proj-1",
    messageId: "msg-1",
    kind: "task.ping",
    summary: "hello",
    refs: {},
    fromMembershipId: "mem-sender",
    createdAt: "2026-10-03T09:00:00.000Z",
  };

  it("after a 429 the next push is skipped, not re-POSTed (DF-026)", async () => {
    postMock.mockResolvedValueOnce({
      ok: false,
      error: "http_429",
      retryAfterSeconds: 120,
    });
    receiptMock.mockResolvedValue(undefined);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM project_membership_webhooks")) {
        return [
          {
            membership_id: "mem-429",
            webhook_url: "https://example.com/hook",
            secret_retained: "awc_whsec_testsecret",
          },
        ];
      }
      return [];
    });
    await deliverProjectMessageWebhooks({
      payload,
      recipientMembershipIds: ["mem-429"],
    });
    await deliverProjectMessageWebhooks({
      payload: { ...payload, messageId: "msg-2" },
      recipientMembershipIds: ["mem-429"],
    });
    expect(postMock).toHaveBeenCalledTimes(1);
    const statuses = sqlMock.mock.calls
      .filter((call) =>
        String(call[0]).includes("UPDATE project_message_deliveries"),
      )
      .map((call) => [call[1], call[2]]);
    expect(statuses).toEqual([
      ["failed", "http_429"],
      ["skipped", "rate_limited_retry_after"],
    ]);
  });
});
