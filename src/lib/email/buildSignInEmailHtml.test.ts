import { describe, expect, it } from "vitest";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { SIGN_IN_EMAIL_BRAND_COLOR } from "./signInEmailBrand.constant";
import {
  SIGN_IN_EMAIL_DISCLAIMER,
  SIGN_IN_EMAIL_LINK_EXPIRY_NOTE,
} from "./signInEmailCopy.constant";
import buildSignInEmailHtml from "./buildSignInEmailHtml";

describe("buildSignInEmailHtml", () => {
  const signInUrl =
    "https://www.agentwitch.com/api/auth/callback/resend?token=abc";

  it("includes branding, CTA, fallback link, and safety copy", () => {
    const html = buildSignInEmailHtml({
      url: signInUrl,
      host: "www.agentwitch.com",
      productName: AGENT_WITCH_PRODUCT_NAME,
      logoUrl: "https://www.agentwitch.com/images/logo/logo.svg",
    });

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain('lang="en"');
    expect(html).toContain('charset="utf-8"');
    expect(html).toContain(`Sign in to ${AGENT_WITCH_PRODUCT_NAME}`);
    expect(html).toContain(signInUrl);
    expect(html).toContain("Or copy this link:");
    expect(html).toContain(SIGN_IN_EMAIL_LINK_EXPIRY_NOTE);
    expect(html).toContain(SIGN_IN_EMAIL_DISCLAIMER);
    expect(html).toContain("https://www.agentwitch.com/images/logo/logo.svg");
    expect(html).toContain(SIGN_IN_EMAIL_BRAND_COLOR);
  });

  it("escapes malicious host markup", () => {
    const html = buildSignInEmailHtml({
      url: signInUrl,
      host: '<img src=x onerror="alert(1)">',
      productName: AGENT_WITCH_PRODUCT_NAME,
      logoUrl: "https://www.agentwitch.com/images/logo/logo.svg",
    });

    expect(html).not.toContain('<img src=x onerror="alert(1)">');
    expect(html).toContain("&lt;img src=x onerror=");
  });

  it("escapes quote characters in the sign-in URL attribute", () => {
    const maliciousUrl = 'https://www.agentwitch.com/?q=" onclick="alert(1)';
    const html = buildSignInEmailHtml({
      url: maliciousUrl,
      host: "www.agentwitch.com",
      productName: AGENT_WITCH_PRODUCT_NAME,
      logoUrl: "https://www.agentwitch.com/images/logo/logo.svg",
    });

    expect(html).not.toContain('onclick="alert(1)"');
    expect(html).toContain("&quot;");
  });

  it("breaks host dots for display", () => {
    const html = buildSignInEmailHtml({
      url: signInUrl,
      host: "www.agentwitch.com",
      productName: AGENT_WITCH_PRODUCT_NAME,
      logoUrl: "https://www.agentwitch.com/images/logo/logo.svg",
    });

    expect(html).toContain("www&#8203;.agentwitch&#8203;.com");
  });

  it("applies a valid theme brand color", () => {
    const html = buildSignInEmailHtml({
      url: signInUrl,
      host: "www.agentwitch.com",
      theme: { brandColor: "#112233" },
      productName: AGENT_WITCH_PRODUCT_NAME,
      logoUrl: "https://www.agentwitch.com/images/logo/logo.svg",
    });

    expect(html).toContain("#112233");
    expect(html).not.toContain(SIGN_IN_EMAIL_BRAND_COLOR);
  });
});
