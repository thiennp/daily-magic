import { describe, expect, it } from "vitest";

import { shouldStopAutoLinkAfterFailure } from "@/features/home/utils/autoLinkLocalAgentAccount.util";

describe("shouldStopAutoLinkAfterFailure", () => {
  it("stops retrying for permanent link failures", () => {
    expect(
      shouldStopAutoLinkAfterFailure(
        "This pairing token is already linked to another account.",
      ),
    ).toBe(true);
    expect(shouldStopAutoLinkAfterFailure("This device has been revoked.")).toBe(
      true,
    );
  });

  it("keeps retrying for transient failures", () => {
    expect(
      shouldStopAutoLinkAfterFailure("Could not reach Agent Witch site."),
    ).toBe(false);
  });
});
