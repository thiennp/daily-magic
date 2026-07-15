import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import {
  SIGN_IN_EMAIL_DISCLAIMER,
  SIGN_IN_EMAIL_LINK_EXPIRY_NOTE,
} from "@/lib/email/signInEmailCopy.constant";

export interface BuildSignInEmailTextParams {
  readonly url: string;
  readonly host: string;
  readonly productName?: string;
}

export default function buildSignInEmailText(
  params: BuildSignInEmailTextParams,
): string {
  const productName = params.productName ?? AGENT_WITCH_PRODUCT_NAME;

  return [
    `Sign in to ${productName}`,
    `Continue on ${params.host}`,
    "",
    params.url,
    "",
    SIGN_IN_EMAIL_LINK_EXPIRY_NOTE,
    SIGN_IN_EMAIL_DISCLAIMER,
    "",
  ].join("\n");
}
