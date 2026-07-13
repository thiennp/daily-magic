import { NextResponse } from "next/server";

import createDatabaseAuthSession from "@/lib/auth/createDatabaseAuthSession";
import findOrCreateUserByEmail from "@/lib/auth/findOrCreateUserByEmail";
import isDevSecretConfigured from "@/lib/auth/isDevSecretConfigured";
import isValidDevSecret from "@/lib/auth/isValidDevSecret";
import resolveAuthSessionCookieName from "@/lib/auth/resolveAuthSessionCookieName";

interface SecretLoginBody {
  readonly email?: unknown;
  readonly secret?: unknown;
}

const parseSecretLoginBody = (
  body: SecretLoginBody,
): {
  readonly email: string;
  readonly secret: string;
} | null => {
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const secret = typeof body.secret === "string" ? body.secret : "";

  if (!email || !secret) {
    return null;
  }

  return { email, secret };
};

export async function POST(request: Request): Promise<NextResponse> {
  if (!isDevSecretConfigured()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json()) as SecretLoginBody;
  const credentials = parseSecretLoginBody(body);

  if (credentials === null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isValidDevSecret(credentials.secret)) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
  }

  const user = await findOrCreateUserByEmail(credentials.email);

  if (!user?.id) {
    return NextResponse.json({ error: "Could not sign in" }, { status: 500 });
  }

  const { sessionToken, expires } = await createDatabaseAuthSession(user.id);
  const authUrl = process.env.AUTH_URL ?? "";
  const useSecureCookie = authUrl.startsWith("https://");
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: resolveAuthSessionCookieName(),
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: useSecureCookie,
    expires,
  });

  return response;
}
