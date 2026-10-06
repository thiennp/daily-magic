import { beforeEach, describe, expect, it, vi } from "vitest";

import { REDEEM_NO_TYPE_GROK_RETRY_LINE } from "@/lib/agentAccess/buildProjectAclRedeemInviteMessage";
import {
  RETYPE_GROK_ROUTINE as GROK_ROUTINE,
  createRetypeRedeemHarness,
} from "@/lib/agentAccess/retypeProjectAclRedeemInvite.fixtures";
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

  it.each([
    ["single-use invite already used", false],
    ["multi-use invite", true],
  ])(
    "%s → same request re-typed to grok, Grok routine reply, still pending, no key",
    async (_, inviteHasUse) => {
      stub({ inviteHasUse, pendingRequest: true });
      const { isError, body } = await redeem("grok-bot");
      expect(isError).toBe(false);
      expect(body).toMatchObject({
        ok: true,
        status: "pending",
        requestId: "req-1",
        projectId: "proj-1",
      });
      expect(body).not.toHaveProperty("projectApiKey");
      expect(body).not.toHaveProperty("membershipId");
      expect(retypeValues[0]?.[0]).toBe("grok");
      expect(retypeValues[0]).toContain("bot-1");
      const message = String(body.message);
      expect(message).toContain(GROK_ROUTINE);
      expect(message).not.toContain(PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE);
      expect(message).not.toContain(REDEEM_NO_TYPE_GROK_RETRY_LINE);
      // Schema-ensure backfills aside: no INSERT at all, and the only write
      // to the request is the join_platform re-type (no approve, no key).
      expect(queries.some((q) => /^\s*INSERT/.test(q))).toBe(false);
      const requestWrites = queries.filter((q) =>
        /^\s*UPDATE project_access_requests/.test(q),
      );
      expect(requestWrites).toHaveLength(1);
      expect(requestWrites[0]).toContain("SET join_platform =");
      expect(requestWrites[0]).toContain("r.status = 'pending'");
    },
  );
});
