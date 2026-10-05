import { describe, expect, it } from "vitest";

import {
  decideHumanMembershipTransition,
  type HumanMembershipEvent,
  type HumanMembershipState,
} from "@/lib/projects/acl/humanInvites/decideHumanMembershipTransition";

describe("decideHumanMembershipTransition", () => {
  it("none --accept--> active", () => {
    expect(
      decideHumanMembershipTransition({ from: "none", event: "accept" }),
    ).toBe("active");
  });

  it("active --remove--> removed", () => {
    expect(
      decideHumanMembershipTransition({ from: "active", event: "remove" }),
    ).toBe("removed");
  });

  it("rejects illegal transitions", () => {
    const cases: ReadonlyArray<{
      readonly from: HumanMembershipState;
      readonly event: HumanMembershipEvent;
    }> = [
      { from: "none", event: "remove" },
      { from: "active", event: "accept" },
      { from: "removed", event: "accept" },
      { from: "removed", event: "remove" },
    ];
    for (const c of cases) {
      expect(decideHumanMembershipTransition(c)).toBeNull();
    }
  });
});
