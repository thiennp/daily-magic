import type SignInEmailTheme from "@/lib/email/types/SignInEmailTheme.type";

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

const DEFAULT_SIGN_IN_EMAIL_BUTTON_TEXT_COLOR = "#ffffff";

export default function resolveSignInEmailButtonTextColor(
  theme?: SignInEmailTheme,
): string {
  const candidate = theme?.buttonText?.trim();

  if (candidate && HEX_COLOR_PATTERN.test(candidate)) {
    return candidate;
  }

  return DEFAULT_SIGN_IN_EMAIL_BUTTON_TEXT_COLOR;
}
