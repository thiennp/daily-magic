import { describe, expect, it } from "vitest";

import { readDispatchHttpResponseError } from "@/features/agent/utils/readDispatchHttpResponseError";

describe("readDispatchHttpResponseError", () => {
  it("returns errorMessage when present", () => {
    expect(
      readDispatchHttpResponseError(
        { errorMessage: "The selected Mac is not online right now." },
        400,
      ),
    ).toBe("The selected Mac is not online right now.");
  });

  it("maps unauthorized API errors to a sign-in prompt", () => {
    expect(readDispatchHttpResponseError({ error: "Unauthorized" }, 401)).toBe(
      "Please sign in again and retry.",
    );
  });

  it("returns HTTP status when the body is not JSON", () => {
    expect(readDispatchHttpResponseError(null, 500)).toBe(
      "Dispatch failed (HTTP 500).",
    );
  });
});
