import { SIGN_IN_EMAIL_LINK_EXPIRY_HOURS } from "@/lib/email/signInEmailBrand.constant";

export const SIGN_IN_EMAIL_DISCLAIMER =
  "If you did not request this email you can safely ignore it.";

export const SIGN_IN_EMAIL_LINK_EXPIRY_NOTE = `This link expires in ${SIGN_IN_EMAIL_LINK_EXPIRY_HOURS} hours.`;

export const buildSignInEmailPreheader = (productName: string): string =>
  `Sign in to ${productName}`;

export const buildSignInEmailSubject = (productName: string): string =>
  `Sign in to ${productName}`;
