import { SIGN_IN_EMAIL_LOGO_PATH } from "@/lib/email/signInEmailBrand.constant";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

export default function resolveSignInEmailLogoUrl(): string {
  return new URL(SIGN_IN_EMAIL_LOGO_PATH, resolveAppBaseUrl()).href;
}
