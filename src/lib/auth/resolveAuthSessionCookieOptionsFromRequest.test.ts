import { describe, expect, it } from "vitest";

import resolveAuthSessionCookieOptionsFromRequest from "@/lib/auth/resolveAuthSessionCookieOptionsFromRequest";

describe("resolveAuthSessionCookieOptionsFromRequest", () => {
  it("uses secure cookie options for https requests without AUTH_URL", () => {
    const previousAuthUrl = process.env.AUTH_URL;
    const previousNextAuthUrl = process.env.NEXTAUTH_URL;
    delete process.env.AUTH_URL;
    delete process.env.NEXTAUTH_URL;

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

    process.env.AUTH_URL = previousAuthUrl;
    process.env.NEXTAUTH_URL = previousNextAuthUrl;
  });

  it("uses non-secure cookie options for http requests without AUTH_URL", () => {
    const previousAuthUrl = process.env.AUTH_URL;
    const previousNextAuthUrl = process.env.NEXTAUTH_URL;
    delete process.env.AUTH_URL;
    delete process.env.NEXTAUTH_URL;

    const request = new Request("http://localhost:3000/api/auth/secret-login");

    expect(resolveAuthSessionCookieOptionsFromRequest(request)).toEqual({
      name: "authjs.session-token",
      secure: false,
    });

    process.env.AUTH_URL = previousAuthUrl;
    process.env.NEXTAUTH_URL = previousNextAuthUrl;
  });

  it("prefers AUTH_URL protocol over the incoming request", () => {
    const previousAuthUrl = process.env.AUTH_URL;
    process.env.AUTH_URL = "http://agentwitch.com";

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

    process.env.AUTH_URL = previousAuthUrl;
  });

  it("uses https AUTH_URL for secure cookie options", () => {
    const previousAuthUrl = process.env.AUTH_URL;
    process.env.AUTH_URL = "https://agentwitch.com";

    const request = new Request("http://localhost:3000/api/auth/secret-login");

    expect(resolveAuthSessionCookieOptionsFromRequest(request)).toEqual({
      name: "__Secure-authjs.session-token",
      secure: true,
    });

    process.env.AUTH_URL = previousAuthUrl;
  });
});
