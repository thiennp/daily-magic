import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));

import { readProjectMembershipHmacWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectMembershipHmacWebhookStatus";

describe("readProjectMembershipHmacWebhookStatus", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns URL + secretSet flag and never projects secret_retained", async () => {
    sqlMock.mockResolvedValue([
      {
        webhook_url: "https://muse.example.com/hook",
        secret_set: true,
      },
    ]);
    const status = await readProjectMembershipHmacWebhookStatus({
      projectId: "proj-1",
      by: "own_membership",
      userId: "bot-1",
    });
    expect(status).toEqual({
      hmacWebhookUrl: "https://muse.example.com/hook",
      secretSet: true,
    });
    const query = String(sqlMock.mock.calls[0]?.[0]);
    expect(query).toContain("LEFT JOIN project_membership_webhooks");
    expect(query).toContain("AS secret_set");
    expect(query).not.toContain("AS secret_retained");
    expect(query).not.toContain("secret_retained,");
    expect(JSON.stringify(status)).not.toMatch(/awc_whsec_/);
  });

  it("returns null when membership is out of scope", async () => {
    sqlMock.mockResolvedValue([]);
    expect(
      await readProjectMembershipHmacWebhookStatus({
        projectId: "proj-1",
        by: "member_row",
        membershipId: "mem-missing",
      }),
    ).toBeNull();
  });
});
