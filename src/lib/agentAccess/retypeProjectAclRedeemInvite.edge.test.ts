import { beforeEach, describe, expect, it, vi } from "vitest";

import { createRetypeRedeemHarness } from "@/lib/agentAccess/retypeProjectAclRedeemInvite.fixtures";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE } from "@/lib/projects/acl/projectMembershipPollJoinGuidance.constant";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "pending"),
}));
const membership = vi.mocked(checkProjectMembershipStatus);
const { queries, retypeValues, stub, redeem } =
  createRetypeRedeemHarness(sqlMock);

describe("redeem again with joinType grok-bot while pending (no-type invite)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    membership.mockResolvedValue("pending");
    queries.length = 0;
    retypeValues.length = 0;
  });

  it("re-typing to a poll type replies with Checks on demand", async () => {
    stub({ inviteHasUse: false, pendingRequest: true });
    const message = String((await redeem("claude")).body.message);
    expect(message).toContain(PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE);
    expect(retypeValues[0]?.[0]).toBe("claude");
  });

  it("no pending request to re-type → original error, nothing written", async () => {
    stub({ inviteHasUse: false, pendingRequest: false });
    const { isError, body } = await redeem("grok-bot");
    expect(isError).toBe(true);
    expect(body.code).toBe("invalid_or_expired_invite");
  });

  it("without a joinType there is no re-type attempt (already_pending stays)", async () => {
    stub({ inviteHasUse: true, pendingRequest: true });
    const { body } = await redeem();
    expect(body.code).toBe("already_pending");
    expect(retypeValues).toHaveLength(0);
  });
});
