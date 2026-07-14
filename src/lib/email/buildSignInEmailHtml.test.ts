import { describe, expect, it } from "vitest";

import buildSignInEmailHtml from "./buildSignInEmailHtml";

describe("buildSignInEmailHtml", () => {
  it("includes the sign-in link and host", () => {
    const html = buildSignInEmailHtml({
      url: "https://www.agentwitch.com/api/auth/callback/resend?token=abc",
      host: "www.agentwitch.com",
    });

    expect(html).toContain(
      "https://www.agentwitch.com/api/auth/callback/resend?token=abc",
    );
    expect(html).toContain("agentwitch.com");
    expect(html).toContain("Sign in");
  });
});
