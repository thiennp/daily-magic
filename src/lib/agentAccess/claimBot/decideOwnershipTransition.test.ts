import { describe, expect, it } from "vitest";

import { decideOwnershipTransition } from "@/lib/agentAccess/claimBot/decideOwnershipTransition";

describe("decideOwnershipTransition", () => {
  it("unclaimed --claim--> claimed; claimed --unclaim--> unclaimed", () => {
    expect(
      decideOwnershipTransition({ from: "unclaimed", event: "claim" }),
    ).toBe("claimed");
    expect(
      decideOwnershipTransition({ from: "claimed", event: "unclaim" }),
    ).toBe("unclaimed");
  });

  it("forbids claimed → claimed transfer and unclaim from unclaimed", () => {
    expect(
      decideOwnershipTransition({ from: "claimed", event: "claim" }),
    ).toBeNull();
    expect(
      decideOwnershipTransition({ from: "unclaimed", event: "unclaim" }),
    ).toBeNull();
  });
});
