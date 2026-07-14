import { describe, expect, it } from "vitest";

import buildSignInEmailText from "./buildSignInEmailText";

describe("buildSignInEmailText", () => {
  it("includes the sign-in link and host", () => {
    const text = buildSignInEmailText({
      url: "https://www.agentwitch.com/api/auth/callback/resend?token=abc",
      host: "www.agentwitch.com",
    });

    expect(text).toContain(
      "https://www.agentwitch.com/api/auth/callback/resend?token=abc",
    );
    expect(text).toContain("agentwitch.com");
  });
});
