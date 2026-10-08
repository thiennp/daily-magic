import { describe, expect, it } from "vitest";

import { resolveComputerLimitMessage } from "@/features/billing/resolveEntitlementLimitMessage";

describe("resolveComputerLimitMessage counts (d17fbf8e)", () => {
  it("explains a full plan when the header shows fewer connected", () => {
    const message = resolveComputerLimitMessage(5, { linked: 5, connected: 4 });
    expect(message).toContain(
      "5 of 5 computers are linked (4 connected, 1 offline)",
    );
    expect(message).toContain("Offline computers still count");
  });

  it("omits the split when every linked computer is connected", () => {
    expect(
      resolveComputerLimitMessage(5, { linked: 5, connected: 5 }),
    ).toContain("5 of 5 computers are linked.");
  });

  it("never reports a negative offline count", () => {
    expect(
      resolveComputerLimitMessage(5, { linked: 5, connected: 7 }),
    ).not.toContain("offline)");
  });
});
