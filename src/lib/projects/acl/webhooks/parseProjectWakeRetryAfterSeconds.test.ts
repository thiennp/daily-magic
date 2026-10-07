import { describe, expect, it } from "vitest";

import { parseProjectWakeRetryAfterSeconds } from "@/lib/projects/acl/webhooks/parseProjectWakeRetryAfterSeconds";

const nowMs = Date.parse("2026-10-07T19:00:00.000Z");

describe("parseProjectWakeRetryAfterSeconds", () => {
  it("reads Retry-After seconds", () => {
    expect(
      parseProjectWakeRetryAfterSeconds({
        retryAfterHeader: "120",
        bodyText: null,
        nowMs,
      }),
    ).toBe(120);
  });

  it("reads a Retry-After HTTP date", () => {
    expect(
      parseProjectWakeRetryAfterSeconds({
        retryAfterHeader: "Wed, 07 Oct 2026 19:01:30 GMT",
        bodyText: null,
        nowMs,
      }),
    ).toBe(90);
  });

  it("falls back to a JSON body retryAfterSeconds", () => {
    expect(
      parseProjectWakeRetryAfterSeconds({
        retryAfterHeader: null,
        bodyText: JSON.stringify({
          error: "rate_limited",
          retryAfterSeconds: 42,
        }),
        nowMs,
      }),
    ).toBe(42);
  });

  it("uses the default for a missing or bad value and clamps", () => {
    expect(
      parseProjectWakeRetryAfterSeconds({
        retryAfterHeader: "soon",
        bodyText: "not json",
        nowMs,
      }),
    ).toBe(60);
    expect(
      parseProjectWakeRetryAfterSeconds({
        retryAfterHeader: "999999",
        bodyText: null,
        nowMs,
      }),
    ).toBe(3600);
    expect(
      parseProjectWakeRetryAfterSeconds({
        retryAfterHeader: "0",
        bodyText: null,
        nowMs,
      }),
    ).toBe(1);
  });
});
