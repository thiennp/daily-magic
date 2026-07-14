import { afterEach, describe, expect, it, vi } from "vitest";

import resolveAuthSessionCookieOptionsFromRequest from "@/lib/auth/resolveAuthSessionCookieOptionsFromRequest";

describe("resolveAuthSessionCookieOptionsFromRequest", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses non-secure cookie options in non-production", () => {
    vi.stubEnv("NODE_ENV", "development");

    const request = new Request(
      "https://daily-magic-five.vercel.app/api/auth/secret-login",
      {
        headers: { "x-forwarded-proto": "https" },
      },
    );

    expect(resolveAuthSessionCookieOptionsFromRequest(request)).toEqual({
      name: "authjs.session-token",
      secure: false,
    });
  });

  it("uses secure cookie options in production", () => {
    vi.stubEnv("NODE_ENV", "production");

    const request = new Request("http://localhost:3000/api/auth/secret-login");

    expect(resolveAuthSessionCookieOptionsFromRequest(request)).toEqual({
      name: "__Secure-authjs.session-token",
      secure: true,
    });
  });
});
