import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import buildSignInEmailHtml from "./buildSignInEmailHtml";
import buildSignInEmailText from "./buildSignInEmailText";
import { buildSignInEmailSubject } from "./signInEmailCopy.constant";
import getResendClient from "./getResendClient";
import resolveSignInEmailLogoUrl from "./resolveSignInEmailLogoUrl";
import type SignInEmailTheme from "./types/SignInEmailTheme.type";

export interface SendSignInVerificationEmailParams {
  readonly to: string;
  readonly url: string;
  readonly from: string;
  readonly host: string;
  readonly productName?: string;
  readonly logoUrl?: string;
  readonly theme?: SignInEmailTheme;
}

export default async function sendSignInVerificationEmail(
  params: SendSignInVerificationEmailParams,
): Promise<void> {
  const productName = params.productName ?? AGENT_WITCH_PRODUCT_NAME;
  const logoUrl = params.logoUrl ?? resolveSignInEmailLogoUrl();
  const resend = getResendClient();
  const html = buildSignInEmailHtml({
    url: params.url,
    host: params.host,
    productName,
    logoUrl,
    theme: params.theme,
  });
  const text = buildSignInEmailText({
    url: params.url,
    host: params.host,
    productName,
  });
  const { error } = await resend.emails.send({
    from: params.from,
    to: params.to,
    subject: buildSignInEmailSubject(productName),
    html,
    text,
  });

  if (error) {
    const detail =
      typeof error.message === "string" ? error.message : JSON.stringify(error);
    throw new Error(`Resend sign-in email failed: ${detail}`);
  }
}
