import { describe, expect, it } from "vitest";

import { MAC_RECONNECTING_QUEUED_ERROR } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { readDispatchHttpResponseError } from "@/features/agent/utils/readDispatchHttpResponseError";

describe("readDispatchHttpResponseError", () => {
  it("returns errorMessage when present", () => {
    expect(
      readDispatchHttpResponseError(
        { errorMessage: MAC_RECONNECTING_QUEUED_ERROR },
        400,
      ),
    ).toBe(MAC_RECONNECTING_QUEUED_ERROR);
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
