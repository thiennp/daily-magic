import { describe, expect, it } from "vitest";

import { PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS } from "@/lib/projects/acl/projectActivityAllowlist.constant";
import { sanitizeProjectActivityDetail } from "@/lib/projects/acl/sanitizeProjectActivityDetail";

describe("project activity allowlist", () => {
  it("allowlists membership/status actions and strips unsafe detail", () => {
    expect(PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS).toContain("request");
    expect(PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS).toContain("leave");
    expect(PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS).toContain("allow_claim_ok");
    expect(PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS).toContain(
      "membership_check_deny",
    );
    expect(
      sanitizeProjectActivityDetail({
        requestId: "req-1",
        reason: "secret handoff body",
        allowClaim: "awcacl1.token",
        outcome: "ok",
      }),
    ).toEqual({ requestId: "req-1", outcome: "ok" });
  });
});
