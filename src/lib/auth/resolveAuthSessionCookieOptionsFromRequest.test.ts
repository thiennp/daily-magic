import { describe, expect, it } from "vitest";

import resolveAuthSessionCookieOptionsFromRequest from "@/lib/auth/resolveAuthSessionCookieOptionsFromRequest";

describe("resolveAuthSessionCookieOptionsFromRequest", () => {
  it("uses secure cookie options for https requests", () => {
    const request = new Request(
      "https://daily-magic-five.vercel.app/api/auth/secret-login",
      {
        headers: { "x-forwarded-proto": "https" },
      },
    );

    expect(resolveAuthSessionCookieOptionsFromRequest(request)).toEqual({
      name: "__Secure-authjs.session-token",
      secure: true,
    });
  });

  it("uses non-secure cookie options for http requests", () => {
    const request = new Request("http://localhost:3000/api/auth/secret-login");

    expect(resolveAuthSessionCookieOptionsFromRequest(request)).toEqual({
      name: "authjs.session-token",
      secure: false,
    });
  });

  it("ignores AUTH_URL and derives security from the incoming request", () => {
    const request = new Request(
      "https://daily-magic-five.vercel.app/api/auth/secret-login",
      {
        headers: { "x-forwarded-proto": "https,http" },
      },
    );

    expect(resolveAuthSessionCookieOptionsFromRequest(request).secure).toBe(
      true,
    );
  });
});
