import { describe, expect, it } from "vitest";

import {
  canAutoApproveBotForOwnerMembership,
  MEMBER_OWNER_BOT_AUTO_APPROVE_REASON,
} from "@/lib/projects/acl/canAutoApproveBotForOwnerMembership";

describe("canAutoApproveBotForOwnerMembership", () => {
  it("always returns false — silent member-owner path removed", () => {
    expect(canAutoApproveBotForOwnerMembership("member")).toBe(false);
    expect(canAutoApproveBotForOwnerMembership("owner")).toBe(false);
    expect(canAutoApproveBotForOwnerMembership("viewer")).toBe(false);
  });

  it("keeps the FSA reason string for audit stability", () => {
    expect(MEMBER_OWNER_BOT_AUTO_APPROVE_REASON).toBe(
      "member_owner_bot_auto_approve",
    );
  });
});
