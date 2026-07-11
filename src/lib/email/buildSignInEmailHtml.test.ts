import { describe, expect, it } from "vitest";

import buildSignInEmailHtml from "./buildSignInEmailHtml";

describe("buildSignInEmailHtml", () => {
  it("includes the sign-in link and host", () => {
    const html = buildSignInEmailHtml({
      url: "https://agentwitch.com/api/auth/callback/resend?token=abc",
      host: "agentwitch.com",
    });

    expect(html).toContain(
      "https://agentwitch.com/api/auth/callback/resend?token=abc",
    );
    expect(html).toContain("agentwitch.com");
    expect(html).toContain("Sign in");
  });
});
