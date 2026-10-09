import NextAuth from "next-auth";

import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { AUTH_PAGES } from "@/lib/auth/authPages.constant";
import buildAuthProviders from "@/lib/auth/buildAuthProviders";
import {
  createNeonAuthAdapter,
  ensureSuperAdminGlobalRole,
} from "@/lib/auth/neonAdapter";
import { GlobalRole, isGlobalRole } from "@/lib/auth/roles";
import { getUserById } from "@/lib/auth/userRepository";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { grantPendingTrialIfGateOpen } from "@/lib/billing/grantPendingTrialIfGateOpen";
import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
import { TRIAL_CLOSED_PRICING_PATH } from "@/lib/billing/trialClosedPricingPath.constant";

process.env.AUTH_URL = resolveAppBaseUrl();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: createNeonAuthAdapter(),
  providers: buildAuthProviders(),
  pages: {
    signIn: AUTH_PAGES.signIn,
    error: AUTH_PAGES.error,
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
      const row = await grantPendingTrialIfGateOpen(user.id);
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
