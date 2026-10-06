import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import DeviceVerifyPageView from "@/features/agent-access/device-verify/DeviceVerifyPageView";
import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import OauthConsentPageView from "@/features/agent-access/oauth-consent/OauthConsentPageView";
import {
  AWC_PRIVACY_URL,
  AWC_TERMS_URL,
} from "@/lib/agentAccess/awcTermsVersion.constant";

const escapeHtml = (text: string): string => text.replaceAll("'", "&#x27;");

const textOf = (html: string): string =>
  html.replace(/<[^>]+>/g, "").replaceAll("&#x27;", "'");

const renderDeviceVerify = (canDecide: boolean): string =>
  renderToStaticMarkup(
    createElement(DeviceVerifyPageView, {
      assistantName: "Claude",
      codeForForms: "BCDF-GHJK",
      showClient: canDecide,
      view: { message: null, tone: "info", canDecide, showNextStep: false },
    }),
  );

const renderConsent = (): string =>
  renderToStaticMarkup(
    createElement(OauthConsentPageView, {
      assistantName: "Claude",
      canDecide: true,
      continueHost: "claude.ai",
      pendingId: "pending-1",
      showPending: true,
      statusMessage: null,
    }),
  );

const expectLinkedTerms = (html: string): void => {
  expect(html).toContain(
    `<a href="${AWC_TERMS_URL}" target="_blank" rel="noopener" class="underline underline-offset-2">Terms</a>`,
  );
  expect(html).toContain(
    `<a href="${AWC_PRIVACY_URL}" target="_blank" rel="noopener" class="underline underline-offset-2">Privacy Policy</a>`,
  );
};

describe("/device/verify view", () => {
  it("shows stop directly under sub and a Continue lookup button", () => {
    const html = renderDeviceVerify(false);
    const sub = html.indexOf(escapeHtml(DEVICE_VERIFY_COPY.sub));
    const stop = html.indexOf(escapeHtml(DEVICE_VERIFY_COPY.stop));
    expect(sub).toBeGreaterThan(-1);
    expect(stop).toBeGreaterThan(sub);
    expect(html.slice(sub, stop)).toMatch(/^[^<]*<\/p><p[^>]*>$/);
    expect(html).toMatch(/<button type="submit"[^>]*>Continue<\/button>/);
    expect(html).not.toMatch(/<button[^>]*>Code<\/button>/);
  });
});

describe("/device/verify view (decide)", () => {
  it("links Terms + Privacy Policy under Confirm/Deny", () => {
    const html = renderDeviceVerify(true);
    expectLinkedTerms(html);
    expect(textOf(html)).toContain(
      "By confirming, you accept the Terms and Privacy Policy for this assistant.",
    );
    expect(html.indexOf(">Deny<")).toBeLessThan(html.indexOf(">Terms<"));
  });
});

describe("/oauth/consent view", () => {
  it("shows stop under sub and links Terms + Privacy Policy on the checkbox", () => {
    const html = renderConsent();
    const sub = html.indexOf(escapeHtml(DEVICE_VERIFY_COPY.sub));
    const stop = html.indexOf(escapeHtml(DEVICE_VERIFY_COPY.stop));
    expect(sub).toBeGreaterThan(-1);
    expect(stop).toBeGreaterThan(sub);
    expect(html.slice(sub, stop)).toMatch(/^[^<]*<\/p><p[^>]*>$/);
    expectLinkedTerms(html);
    expect(textOf(html)).toContain(
      "I accept the Terms and Privacy Policy for this assistant.",
    );
  });
});
