import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import breakEmailHostForDisplay from "@/lib/email/breakEmailHostForDisplay";
import escapeHtmlAttribute from "@/lib/email/escapeHtmlAttribute";
import escapeHtmlText from "@/lib/email/escapeHtmlText";
import {
  SIGN_IN_EMAIL_DISCLAIMER,
  SIGN_IN_EMAIL_LINK_EXPIRY_NOTE,
  buildSignInEmailPreheader,
} from "@/lib/email/signInEmailCopy.constant";
import resolveSignInEmailBrandColor from "@/lib/email/resolveSignInEmailBrandColor";
import resolveSignInEmailButtonTextColor from "@/lib/email/resolveSignInEmailButtonTextColor";
import resolveSignInEmailLogoUrl from "@/lib/email/resolveSignInEmailLogoUrl";
import type SignInEmailTheme from "@/lib/email/types/SignInEmailTheme.type";

export interface BuildSignInEmailHtmlParams {
  readonly url: string;
  readonly host: string;
  readonly productName?: string;
  readonly logoUrl?: string;
  readonly theme?: SignInEmailTheme;
}

const BODY_TEXT_STYLE =
  "font-family: Helvetica, Arial, sans-serif; color: #444; font-size: 16px; line-height: 22px;";

export default function buildSignInEmailHtml(
  params: BuildSignInEmailHtmlParams,
): string {
  const productName = params.productName ?? AGENT_WITCH_PRODUCT_NAME;
  const logoUrl = params.logoUrl ?? resolveSignInEmailLogoUrl();
  const brandColor = resolveSignInEmailBrandColor(params.theme);
  const buttonTextColor = resolveSignInEmailButtonTextColor(params.theme);
  const safeUrl = escapeHtmlAttribute(params.url);
  const safeUrlText = escapeHtmlText(params.url);
  const safeHost = breakEmailHostForDisplay(escapeHtmlText(params.host));
  const safeProductName = escapeHtmlText(productName);
  const safeLogoUrl = escapeHtmlAttribute(logoUrl);
  const preheader = escapeHtmlText(buildSignInEmailPreheader(productName));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign in to ${safeProductName}</title>
</head>
<body style="margin: 0; padding: 0; background: #f9f9f9;">
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${preheader}
  </div>
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f9f9f9;">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
          style="background: #ffffff; max-width: 600px; border-radius: 10px;">
          <tr>
            <td align="center" style="padding: 24px 24px 8px 24px;">
              <img src="${safeLogoUrl}" alt="${safeProductName}" width="154" height="32"
                style="display: block; border: 0; max-width: 154px; height: auto;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 24px 0 24px; font-size: 22px; ${BODY_TEXT_STYLE}">
              Sign in to <strong>${safeProductName}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 24px 0 24px; font-size: 14px; ${BODY_TEXT_STYLE}">
              Continue on <strong>${safeHost}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 24px 8px 24px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 5px;" bgcolor="${brandColor}">
                    <a href="${safeUrl}" target="_blank"
                      style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${brandColor}; display: inline-block; font-weight: bold;">
                      Sign in
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 24px 0 24px; font-size: 14px; ${BODY_TEXT_STYLE}">
              Or copy this link:<br />
              <a href="${safeUrl}" target="_blank" style="color: ${brandColor}; word-break: break-all;">
                ${safeUrlText}
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 16px 24px 8px 24px; font-size: 14px; ${BODY_TEXT_STYLE}">
              ${escapeHtmlText(SIGN_IN_EMAIL_LINK_EXPIRY_NOTE)}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 24px 24px 24px; font-size: 14px; ${BODY_TEXT_STYLE}">
              ${escapeHtmlText(SIGN_IN_EMAIL_DISCLAIMER)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
