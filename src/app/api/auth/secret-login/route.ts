import { NextResponse } from "next/server";

import createDatabaseAuthSession from "@/lib/auth/createDatabaseAuthSession";
import findOrCreateUserByEmail from "@/lib/auth/findOrCreateUserByEmail";
import isDevSecretConfigured from "@/lib/auth/isDevSecretConfigured";
import isValidDevSecret from "@/lib/auth/isValidDevSecret";
import resolveAuthSessionCookieOptionsFromRequest from "@/lib/auth/resolveAuthSessionCookieOptionsFromRequest";

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

const isDatabaseConfigured = (): boolean =>
  typeof process.env.DATABASE_URL === "string" &&
  process.env.DATABASE_URL.trim().length > 0;

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

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured." },
      { status: 503 },
    );
  }

  const user = await findOrCreateUserByEmail(credentials.email).catch(
    () => null,
  );

  if (!user?.id) {
    return NextResponse.json({ error: "Could not sign in" }, { status: 500 });
  }

  const session = await createDatabaseAuthSession(user.id).catch(() => null);

  if (!session) {
    return NextResponse.json(
      { error: "Could not create session" },
      { status: 500 },
    );
  }

  const cookieOptions = resolveAuthSessionCookieOptionsFromRequest(request);
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: cookieOptions.name,
    value: session.sessionToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: cookieOptions.secure,
    expires: session.expires,
  });

  return response;
}
