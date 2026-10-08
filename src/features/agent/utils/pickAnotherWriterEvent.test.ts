import { describe, expect, it } from "vitest";

import { shouldOfferPickAnotherWriter } from "@/features/agent/utils/pickAnotherWriterEvent";

describe("shouldOfferPickAnotherWriter (77e29f7a)", () => {
  it("offers the button for the Codex sign-in failure", () => {
    expect(
      shouldOfferPickAnotherWriter(
        "Waiting on you — Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another coding tool.",
      ),
    ).toBe(true);
  });

  it("does not offer it for other summaries", () => {
    expect(shouldOfferPickAnotherWriter("Done. 3 files changed.")).toBe(false);
    expect(shouldOfferPickAnotherWriter(null)).toBe(false);
  });
});
