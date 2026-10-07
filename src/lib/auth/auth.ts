import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import type { Provider } from "next-auth/providers";

import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import {
  createNeonAuthAdapter,
  ensureSuperAdminGlobalRole,
} from "@/lib/auth/neonAdapter";
import { GlobalRole, isGlobalRole } from "@/lib/auth/roles";
import { getUserById } from "@/lib/auth/userRepository";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
import { TRIAL_CLOSED_PRICING_PATH } from "@/lib/billing/trialClosedPricingPath.constant";
import resolveEmailFrom from "@/lib/email/resolveEmailFrom";
import resolveResendApiKey from "@/lib/email/resolveResendApiKey";
import sendSignInVerificationEmail from "@/lib/email/sendSignInVerificationEmail";

function buildAuthProviders(): Provider[] {
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

process.env.AUTH_URL = resolveAppBaseUrl();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: createNeonAuthAdapter(),
  providers: buildAuthProviders(),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.trim() ?? "";
      if (
        !user?.id ||
        email.length === 0 ||
        email === SUPER_ADMIN_EMAIL ||
        isAgentAccessSyntheticEmail(email)
      ) {
        return true;
      }
      const row = await loadBillingPlanForUser(user.id);
      // Closed-gate mint: no usable trial session — signed-out Pricing banner.
      if (!isTrialEntitlementGranted(row)) {
        return TRIAL_CLOSED_PRICING_PATH;
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user && user?.id) {
        const dbUser = await getUserById(user.id);
        const globalRole = dbUser?.globalRole ?? GlobalRole.USER;

        session.user.id = user.id;
        session.user.globalRole = globalRole;
      }

      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (user.email && account?.provider === "google") {
        await ensureSuperAdminGlobalRole(user.email);
      }
    },
  },
  session: {
    strategy: "database",
  },
  trustHost: true,
});

export async function getAuthActor() {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return null;
  }

  const dbUser = await getUserById(session.user.id);
  const globalRole =
    dbUser?.globalRole ?? session.user.globalRole ?? GlobalRole.USER;

  return {
    id: session.user.id,
    email: session.user.email,
    globalRole: isGlobalRole(globalRole) ? globalRole : GlobalRole.USER,
    name: session.user.name ?? dbUser?.name ?? null,
    image: session.user.image ?? dbUser?.image ?? null,
  };
}
