import { describe, expect, it } from "vitest";

import { resolveGuestSessionState } from "@/features/empty-states/resolveGuestSessionState";

describe("resolveGuestSessionState", () => {
  it("fails open to guest while loading when the server hint is signed_out", () => {
    expect(
      resolveGuestSessionState({
        status: "loading",
        hasUser: false,
        loadingTimedOut: false,
        serverSessionHint: "signed_out",
      }),
    ).toBe("guest");
  });

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
