import { describe, expect, it } from "vitest";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import {
  SIGN_IN_EMAIL_DISCLAIMER,
  SIGN_IN_EMAIL_LINK_EXPIRY_NOTE,
} from "./signInEmailCopy.constant";
import buildSignInEmailText from "./buildSignInEmailText";

describe("buildSignInEmailText", () => {
  const signInUrl =
    "https://www.agentwitch.com/api/auth/callback/resend?token=abc";

  it("includes branding, link, expiry note, and disclaimer", () => {
    const text = buildSignInEmailText({
      url: signInUrl,
      host: "www.agentwitch.com",
      productName: AGENT_WITCH_PRODUCT_NAME,
    });

    expect(text).toContain(`Sign in to ${AGENT_WITCH_PRODUCT_NAME}`);
    expect(text).toContain("Continue on www.agentwitch.com");
    expect(text).toContain(signInUrl);
    expect(text).toContain(SIGN_IN_EMAIL_LINK_EXPIRY_NOTE);
    expect(text).toContain(SIGN_IN_EMAIL_DISCLAIMER);
  });
});
