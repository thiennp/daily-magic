import { describe, expect, it } from "vitest";

import { resolveGuestSessionState } from "@/features/empty-states/resolveGuestSessionState";

describe("resolveGuestSessionState", () => {
  it("stays loading until timeout when session status is loading", () => {
    expect(
      resolveGuestSessionState({
        status: "loading",
        hasUser: false,
        loadingTimedOut: false,
      }),
    ).toBe("loading");

    expect(
      resolveGuestSessionState({
        status: "loading",
        hasUser: false,
        loadingTimedOut: true,
      }),
    ).toBe("guest");
  });

  it("maps authenticated users and everyone else to guest", () => {
    expect(
      resolveGuestSessionState({
        status: "authenticated",
        hasUser: true,
        loadingTimedOut: false,
      }),
    ).toBe("signed_in");

    expect(
      resolveGuestSessionState({
        status: "unauthenticated",
        hasUser: false,
        loadingTimedOut: false,
      }),
    ).toBe("guest");
  });
});
