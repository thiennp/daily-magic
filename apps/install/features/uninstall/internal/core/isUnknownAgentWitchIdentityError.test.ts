import { describe, expect, it } from "vitest";

import { isUnknownAgentWitchIdentityError } from "./isUnknownAgentWitchIdentityError";

describe("isUnknownAgentWitchIdentityError", () => {
  it("matches only system.error with errorCode unknown_identity", () => {
    expect(
      isUnknownAgentWitchIdentityError({
        type: "system.error",
        payload: { errorCode: "unknown_identity", errorMessage: "gone" },
      }),
    ).toBe(true);
  });

  it("ignores a generic system.error and a not-linked message without the code", () => {
    expect(
      isUnknownAgentWitchIdentityError({
        type: "system.error",
        payload: { errorMessage: "socket hang up" },
      }),
    ).toBe(false);
    expect(
      isUnknownAgentWitchIdentityError({
        type: "system.error",
        payload: {
          errorMessage:
            "This Mac identity is not linked. Run the install command from Home while signed in.",
        },
      }),
    ).toBe(false);
    expect(
      isUnknownAgentWitchIdentityError({
        type: "system.ack",
        payload: { errorCode: "unknown_identity" },
      }),
    ).toBe(false);
  });
});
