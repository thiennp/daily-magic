import { describe, expect, it } from "vitest";

import {
  canAutoApproveBotForOwnerMembership,
  MEMBER_OWNER_BOT_AUTO_APPROVE_REASON,
} from "@/lib/projects/acl/canAutoApproveBotForOwnerMembership";

describe("canAutoApproveBotForOwnerMembership", () => {
  it("allows member (editor-or-higher human seat)", () => {
    expect(canAutoApproveBotForOwnerMembership("member")).toBe(true);
  });

  it("allows owner role on a membership row", () => {
    expect(canAutoApproveBotForOwnerMembership("owner")).toBe(true);
  });

  it("denies viewer", () => {
    expect(canAutoApproveBotForOwnerMembership("viewer")).toBe(false);
  });

  it("exports a stable FSA reason string", () => {
    expect(MEMBER_OWNER_BOT_AUTO_APPROVE_REASON).toBe(
      "member_owner_bot_auto_approve",
    );
  });
});
