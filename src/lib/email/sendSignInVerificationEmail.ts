import buildSignInEmailHtml from "./buildSignInEmailHtml";
import buildSignInEmailText from "./buildSignInEmailText";
import getResendClient from "./getResendClient";
import type SignInEmailTheme from "./types/SignInEmailTheme.type";

export interface SendSignInVerificationEmailParams {
  readonly to: string;
  readonly url: string;
  readonly from: string;
  readonly host: string;
  readonly theme?: SignInEmailTheme;
}

export default async function sendSignInVerificationEmail(
  params: SendSignInVerificationEmailParams,
): Promise<void> {
  const resend = getResendClient();
  const html = buildSignInEmailHtml({
    url: params.url,
    host: params.host,
    theme: params.theme,
  });
  const text = buildSignInEmailText({
    url: params.url,
    host: params.host,
  });
  const { error } = await resend.emails.send({
    from: params.from,
    to: params.to,
    subject: `Sign in to ${params.host}`,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
