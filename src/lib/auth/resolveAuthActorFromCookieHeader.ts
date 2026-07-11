import { createNeonAuthAdapter } from "@/lib/auth/neonAdapter";
import parseCookieHeader from "@/lib/auth/parseCookieHeader";
import { GlobalRole, isGlobalRole } from "@/lib/auth/roles";
import { getUserById } from "@/lib/auth/userRepository";

const SESSION_COOKIE_NAMES = [
  "__Secure-authjs.session-token",
  "authjs.session-token",
  "__Secure-next-auth.session-token",
  "next-auth.session-token",
] as const;

export interface AuthActorFromCookies {
  readonly id: string;
  readonly email: string;
  readonly globalRole: (typeof GlobalRole)[keyof typeof GlobalRole];
  readonly name: string | null;
}

const resolveSessionToken = (
  cookies: Readonly<Record<string, string>>,
): string | null => {
  for (const cookieName of SESSION_COOKIE_NAMES) {
    const value = cookies[cookieName];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
};

const resolveAuthActorFromCookieHeader = async (
  cookieHeader: string,
): Promise<AuthActorFromCookies | null> => {
  const sessionToken = resolveSessionToken(parseCookieHeader(cookieHeader));
  if (sessionToken === null) {
    return null;
  }

  const adapter = createNeonAuthAdapter();
  const sessionAndUser = await adapter.getSessionAndUser?.(sessionToken);
  if (
    sessionAndUser === null ||
    sessionAndUser === undefined ||
    sessionAndUser.session.expires <= new Date() ||
    !sessionAndUser.user.email
  ) {
    return null;
  }

  const dbUser = await getUserById(sessionAndUser.user.id);
  const globalRole = dbUser?.globalRole ?? GlobalRole.USER;

  return {
    id: sessionAndUser.user.id,
    email: sessionAndUser.user.email,
    globalRole: isGlobalRole(globalRole) ? globalRole : GlobalRole.USER,
    name: sessionAndUser.user.name ?? dbUser?.name ?? null,
  };
};

export default resolveAuthActorFromCookieHeader;
