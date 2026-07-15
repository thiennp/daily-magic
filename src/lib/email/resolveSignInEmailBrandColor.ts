import { SIGN_IN_EMAIL_BRAND_COLOR } from "@/lib/email/signInEmailBrand.constant";
import type SignInEmailTheme from "@/lib/email/types/SignInEmailTheme.type";

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export default function resolveSignInEmailBrandColor(
  theme?: SignInEmailTheme,
): string {
  const candidate = theme?.brandColor?.trim();

  if (candidate && HEX_COLOR_PATTERN.test(candidate)) {
    return candidate;
  }

  return SIGN_IN_EMAIL_BRAND_COLOR;
}
