import { describe, expect, it } from "vitest";

import {
  LIBRARY_GUEST_EMPTY_COPY,
  MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY,
  REPORTS_GUEST_EMPTY_COPY,
} from "@/features/empty-states/signedOutPageEmptyCopy.constant";

describe("signedOutPageEmptyCopy", () => {
  it("locks guest empty titles and CTA labels per AW-EMPTY-1", () => {
    expect(LIBRARY_GUEST_EMPTY_COPY.title).toBe("Sign in to see your library");
    expect(REPORTS_GUEST_EMPTY_COPY.title).toBe("Sign in to see your reports");
    expect(MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY.title).toBe(
      "Sign in to see teammate listings",
    );
    expect(LIBRARY_GUEST_EMPTY_COPY.primaryCtaLabel).toBe(
      "Create free account",
    );
    expect(MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY.primaryCtaLabel).toBe(
      "Sign in",
    );
  });
});
