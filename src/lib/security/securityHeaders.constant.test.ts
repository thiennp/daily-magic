import { describe, expect, it } from "vitest";

import { applySecurityHeaders } from "@/lib/security/applySecurityHeaders";
import { SECURITY_HEADERS } from "@/lib/security/securityHeaders.constant";

import nextConfig from "../../../next.config";

const headerMap = (): Record<string, string> =>
  Object.fromEntries(SECURITY_HEADERS.map(({ key, value }) => [key, value]));

describe("SECURITY_HEADERS", () => {
  it("lists exactly the agreed headers and values", () => {
    expect(headerMap()).toEqual({
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors 'self'",
    });
  });

  it("keeps HSTS out of the preload list and CSP to frame-ancestors only", () => {
    const map = headerMap();
    expect(map["Strict-Transport-Security"]).not.toMatch(/preload/i);
    expect(map["Content-Security-Policy"]).not.toMatch(
      /script-src|default-src/,
    );
  });
});

describe("next.config security headers", () => {
  it("drops x-powered-by", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("applies SECURITY_HEADERS to every path", async () => {
    const rules = await nextConfig.headers?.();
    expect(rules).toEqual([
      {
        source: "/:path*",
        headers: SECURITY_HEADERS.map(({ key, value }) => ({ key, value })),
      },
    ]);
  });
});

describe("applySecurityHeaders", () => {
  it("sets every security header on a Node response", () => {
    const set: Record<string, string> = {};
    applySecurityHeaders({
      setHeader: (name, value) => {
        set[name] = value;
      },
    });
    expect(set).toEqual(headerMap());
  });
});
