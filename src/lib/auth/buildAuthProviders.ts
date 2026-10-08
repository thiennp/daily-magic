import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import type { Provider } from "next-auth/providers";

import resolveEmailFrom from "@/lib/email/resolveEmailFrom";
import resolveResendApiKey from "@/lib/email/resolveResendApiKey";
import sendSignInVerificationEmail from "@/lib/email/sendSignInVerificationEmail";

export default function buildAuthProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        allowDangerousEmailAccountLinking: true,
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
      }),
    );
  }

  const resendApiKey = resolveResendApiKey();
  const emailFrom = resolveEmailFrom();

  if (resendApiKey && emailFrom) {
    providers.push(
      Resend({
        apiKey: resendApiKey,
        from: emailFrom,
        sendVerificationRequest(params) {
          const { identifier: to, provider, url, theme } = params;
          const { host } = new URL(url);

          return sendSignInVerificationEmail({
            to,
            url,
            from: provider.from ?? emailFrom,
            host,
            theme,
          }).catch((error: unknown) => {
            const message =
              error instanceof Error ? error.message : "Unknown email error";
            console.error("[auth] Resend sign-in email failed:", message);
            throw error;
          });
        },
      }),
    );
  }

  return providers;
}
