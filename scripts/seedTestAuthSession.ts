#!/usr/bin/env tsx
/**
 * Seeds a DB session for local / E2E testing without OAuth or magic links.
 *
 * Usage:
 *   set -a; . ./.env.local; set +a
 *   npm run test:auth:session -- test-qa-1@agentwitch.com
 *   npm run test:auth:session -- test-qa-admin@agentwitch.com --super-admin
 *
 * Playwright: use e2e/helpers/signInTestAccount.ts (POST /api/auth/test-login).
 */
import createDatabaseAuthSession from "@/lib/auth/createDatabaseAuthSession";
import findOrCreateUserByEmail from "@/lib/auth/findOrCreateUserByEmail";
import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";
import { promoteUserToSuperAdminById } from "@/lib/auth/setUserGlobalRoleById";

const parseArgs = (
  argv: readonly string[],
): { readonly email: string; readonly superAdmin: boolean } | null => {
  const positional = argv.filter((arg) => !arg.startsWith("--"));
  const email = positional[0]?.trim() ?? "";
  const superAdmin = argv.includes("--super-admin");

  if (!email || !isTestAgentWitchEmail(email)) {
    return null;
  }

  return { email, superAdmin };
};

const isDatabaseConfigured = (): boolean =>
  typeof process.env.DATABASE_URL === "string" &&
  process.env.DATABASE_URL.trim().length > 0;

const main = async (): Promise<void> => {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed === null) {
    console.error(
      "Usage: npm run test:auth:session -- <test*@agentwitch.com> [--super-admin]",
    );
    process.exit(1);
  }

  if (!isDatabaseConfigured()) {
    console.error("DATABASE_URL is not configured. Source .env.local first.");
    process.exit(1);
  }

  const user = await findOrCreateUserByEmail(parsed.email);

  if (!user?.id) {
    console.error("Could not find or create user.");
    process.exit(1);
  }

  if (parsed.superAdmin) {
    await promoteUserToSuperAdminById(user.id);
  }

  const session = await createDatabaseAuthSession(user.id);

  const cookieName =
    process.env.TEST_AUTH_COOKIE_SECURE === "1"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  const output = {
    email: parsed.email,
    userId: user.id,
    globalRole: parsed.superAdmin ? "super_admin" : "user (unchanged)",
    cookieName,
    sessionToken: session.sessionToken,
    expires: session.expires.toISOString(),
    browserCookie: `${cookieName}=${session.sessionToken}`,
    curlTestLogin: `curl -sS -X POST http://127.0.0.1:3000/api/auth/test-login -H 'Content-Type: application/json' -d '{"email":"${parsed.email}"}' -c /tmp/aw-cookies.txt`,
    playwright:
      "import { signInTestAccount } from './helpers/signInTestAccount'",
  };

  console.log(JSON.stringify(output, null, 2));
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
