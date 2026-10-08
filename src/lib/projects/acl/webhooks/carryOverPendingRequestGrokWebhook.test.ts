import { beforeEach, describe, expect, it, vi } from "vitest";

const { sqlMock, flip } = vi.hoisted(() => ({
  sqlMock: vi.fn(),
  flip: vi.fn(async () => true),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/setProjectMembershipDeliveryMode", () => ({
  flipProjectMembershipToWebhookOnWakeLink: flip,
}));

import { carryOverPendingRequestGrokWebhook } from "@/lib/projects/acl/webhooks/carryOverPendingRequestGrokWebhook";

const input = {
  projectId: "p1",
  requestId: "r1",
  membershipId: "m1",
  userId: "u1",
};
const sqlText = (call: unknown[]): string => (call[0] as string[]).join("?");

describe("carryOverPendingRequestGrokWebhook", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    flip.mockClear();
  });

  it("copies the pre-registered wake link to the membership, deletes the pending copy and flips to webhook", async () => {
    sqlMock
      .mockResolvedValueOnce([{ membership_id: "m1" }])
      .mockResolvedValueOnce([]);
    await expect(carryOverPendingRequestGrokWebhook(input)).resolves.toBe(true);
    expect(sqlText(sqlMock.mock.calls[0])).toContain(
      "project_membership_grok_routine_webhooks",
    );
    expect(sqlText(sqlMock.mock.calls[1])).toContain(
      "DELETE FROM project_access_request_grok_webhooks",
    );
    expect(flip).toHaveBeenCalledWith({ projectId: "p1", membershipId: "m1" });
  });

  it("nothing pre-registered: no flip", async () => {
    sqlMock.mockResolvedValue([]);
    await expect(carryOverPendingRequestGrokWebhook(input)).resolves.toBe(
      false,
    );
    expect(flip).not.toHaveBeenCalled();
  });
});
