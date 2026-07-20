import {
  SIGN_IN_EMAIL_BODY_TEXT_COLOR,
  SIGN_IN_EMAIL_CARD_BORDER_COLOR,
  SIGN_IN_EMAIL_FONT_FAMILY,
  SIGN_IN_EMAIL_HEADING_TEXT_COLOR,
  SIGN_IN_EMAIL_MUTED_TEXT_COLOR,
} from "@/lib/email/signInEmailBrand.constant";

export interface SignInEmailLayoutStyles {
  readonly body: string;
  readonly card: string;
  readonly heading: string;
  readonly bodyText: string;
  readonly mutedText: string;
  readonly button: string;
}

export default function buildSignInEmailLayoutStyles(): SignInEmailLayoutStyles {
  const font = `font-family: ${SIGN_IN_EMAIL_FONT_FAMILY};`;

  return {
    body: `margin: 0; padding: 0; background: #fafafa; ${font}`,
    card: `background: #ffffff; max-width: 600px; border-radius: 16px; border: 1px solid ${SIGN_IN_EMAIL_CARD_BORDER_COLOR};`,
    heading: `${font} color: ${SIGN_IN_EMAIL_HEADING_TEXT_COLOR}; font-size: 22px; line-height: 28px; font-weight: 600;`,
    bodyText: `${font} color: ${SIGN_IN_EMAIL_BODY_TEXT_COLOR}; font-size: 16px; line-height: 24px;`,
    mutedText: `${font} color: ${SIGN_IN_EMAIL_MUTED_TEXT_COLOR}; font-size: 14px; line-height: 20px;`,
    button: `font-size: 16px; font-family: ${SIGN_IN_EMAIL_FONT_FAMILY}; font-weight: 600;`,
  };
}
