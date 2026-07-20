import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import breakEmailHostForDisplay from "@/lib/email/breakEmailHostForDisplay";
import buildSignInEmailLayoutStyles from "@/lib/email/buildSignInEmailLayoutStyles";
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

export default function buildSignInEmailHtml(
  params: BuildSignInEmailHtmlParams,
): string {
  const productName = params.productName ?? AGENT_WITCH_PRODUCT_NAME;
  const logoUrl = params.logoUrl ?? resolveSignInEmailLogoUrl();
  const brandColor = resolveSignInEmailBrandColor(params.theme);
  const buttonTextColor = resolveSignInEmailButtonTextColor(params.theme);
  const styles = buildSignInEmailLayoutStyles();
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
<body style="${styles.body}">
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${preheader}
  </div>
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #fafafa;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
          style="${styles.card}">
          <tr>
            <td align="center" style="padding: 28px 28px 12px 28px;">
              <img src="${safeLogoUrl}" alt="${safeProductName}" width="168" height="32"
                style="display: block; border: 0; max-width: 168px; height: auto;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 28px 0 28px; ${styles.heading}">
              Sign in to <strong>${safeProductName}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 28px 0 28px; ${styles.mutedText}">
              Continue on <strong style="color: #18181b;">${safeHost}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 28px 28px 12px 28px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 8px;" bgcolor="${brandColor}">
                    <a href="${safeUrl}" target="_blank"
                      style="${styles.button} color: ${buttonTextColor}; text-decoration: none; border-radius: 8px; padding: 14px 24px; border: 1px solid ${brandColor}; display: inline-block;">
                      Sign in
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 28px 0 28px; ${styles.mutedText}">
              Or copy this link:<br />
              <a href="${safeUrl}" target="_blank" style="color: ${brandColor}; word-break: break-all;">
                ${safeUrlText}
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 16px 28px 8px 28px; ${styles.mutedText}">
              ${escapeHtmlText(SIGN_IN_EMAIL_LINK_EXPIRY_NOTE)}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 28px 28px 28px; ${styles.mutedText}">
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
