import { afterEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

const postMock = vi.fn();
vi.mock("@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook", () => ({
  postSignedProjectMembershipWebhook: (...args: unknown[]) => postMock(...args),
}));

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

describe("deliverProjectMessageWebhooks", () => {
  afterEach(() => {
    sqlMock.mockReset();
    postMock.mockReset();
    receiptMock.mockReset();
  });

  const payload = {
    projectId: "proj-1",
    messageId: "msg-1",
    kind: "task.ping",
    summary: "hello",
    refs: {},
    fromMembershipId: "mem-sender",
    createdAt: "2026-10-03T09:00:00.000Z",
  };

  it("skips memberships with no retained secret and does not POST", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM project_membership_webhooks")) {
        return [
          {
            membership_id: "mem-a",
            webhook_url: "https://example.com/hook",
            secret_retained: null,
          },
        ];
      }
      return [];
    });
    await deliverProjectMessageWebhooks({
      payload,
      recipientMembershipIds: ["mem-a"],
    });
    expect(postMock).not.toHaveBeenCalled();
    expect(receiptMock).toHaveBeenCalledTimes(0);
    expect(
      sqlMock.mock.calls.some((call) =>
        String(call[0]).includes("UPDATE project_message_deliveries"),
      ),
    ).toBe(true);
  });

  it("POSTs when secret_retained is present and notifies receipt helper", async () => {
    postMock.mockResolvedValue({ ok: true });
    receiptMock.mockResolvedValue(undefined);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM project_membership_webhooks")) {
        return [
          {
            membership_id: "mem-a",
            webhook_url: "https://example.com/hook",
            secret_retained: "awc_whsec_testsecret",
          },
        ];
      }
      return [];
    });
    await deliverProjectMessageWebhooks({
      payload,
      recipientMembershipIds: ["mem-a"],
    });
    expect(postMock).toHaveBeenCalledTimes(1);
    expect(postMock.mock.calls[0]?.[0]).toMatchObject({
      webhookUrl: "https://example.com/hook",
      secret: "awc_whsec_testsecret",
      messageId: "msg-1",
    });
    expect(receiptMock).toHaveBeenCalledWith({
      payload,
      peerMembershipId: "mem-a",
      deliveryOk: true,
    });
  });
});
