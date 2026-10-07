import { describe, expect, it } from "vitest";

import { decideHumanInviteStatusTransition as decide } from "@/lib/projects/acl/humanInvites/decideHumanInviteStatusTransition";

describe("decideHumanInviteStatusTransition (108)", () => {
  it("pending → accepted only via accept_for_approval; approved only via owner approve or direct invite", () => {
    expect(decide({ from: "pending", event: "accept_for_approval" })).toBe(
      "accepted",
    );
    expect(decide({ from: "pending", event: "accept_direct" })).toBe(
      "approved",
    );
    expect(decide({ from: "accepted", event: "approve" })).toBe("approved");
    expect(decide({ from: "accepted", event: "deny" })).toBe("revoked");
    expect(decide({ from: "pending", event: "approve" })).toBeNull();
  });

  it("terminals are final", () => {
    for (const from of ["approved", "revoked", "expired"] as const) {
      for (const event of [
        "accept_direct",
        "accept_for_approval",
        "approve",
        "deny",
        "revoke",
      ] as const) {
        expect(decide({ from, event })).toBeNull();
      }
    }
  });
});
