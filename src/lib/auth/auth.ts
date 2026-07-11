import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import type { Provider } from "next-auth/providers";

import {
  createNeonAuthAdapter,
  ensureSuperAdminGlobalRole,
} from "@/lib/auth/neonAdapter";
import canSignInWithProvider from "@/lib/auth/canSignInWithProvider";
import { GlobalRole, isGlobalRole } from "@/lib/auth/roles";
import { getUserById } from "@/lib/auth/userRepository";

function buildAuthProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    );
  }

  if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
    providers.push(
      Nodemailer({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    );
  }

  return providers;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: createNeonAuthAdapter(),
  providers: buildAuthProviders(),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user.email && account?.provider) {
        if (!canSignInWithProvider(user.email, account.provider)) {
          return false;
        }
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
