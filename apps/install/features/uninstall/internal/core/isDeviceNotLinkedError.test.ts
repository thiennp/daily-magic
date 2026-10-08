import { describe, expect, it } from "vitest";

import { isDeviceNotLinkedError } from "./isDeviceNotLinkedError";

describe("isDeviceNotLinkedError", () => {
  it("matches the error code and the legacy message", () => {
    expect(
      isDeviceNotLinkedError({
        type: "system.error",
        payload: { errorCode: "device_not_linked" },
      }),
    ).toBe(true);
    expect(
      isDeviceNotLinkedError({
        type: "system.error",
        payload: {
          errorMessage:
            "This computer identity is not linked. Run the install command from Home while signed in.",
        },
      }),
    ).toBe(true);
  });

  it("ignores other errors and other message types", () => {
    expect(
      isDeviceNotLinkedError({
        type: "system.error",
        payload: { errorCode: "unknown_identity" },
      }),
    ).toBe(false);
    expect(isDeviceNotLinkedError({ type: "system.ack", payload: {} })).toBe(
      false,
    );
  });
});
