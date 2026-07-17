import { NextResponse } from "next/server";

import createDatabaseAuthSession from "@/lib/auth/createDatabaseAuthSession";
import findOrCreateUserByEmail from "@/lib/auth/findOrCreateUserByEmail";
import isDevSecretConfigured from "@/lib/auth/isDevSecretConfigured";
import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";
import resolveAuthSessionCookieOptionsFromRequest from "@/lib/auth/resolveAuthSessionCookieOptionsFromRequest";

interface TestLoginBody {
  readonly email?: unknown;
}

const parseTestLoginEmail = (body: TestLoginBody): string | null => {
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !isTestAgentWitchEmail(email)) {
    return null;
  }

  return email;
};

const isDatabaseConfigured = (): boolean =>
  typeof process.env.DATABASE_URL === "string" &&
  process.env.DATABASE_URL.trim().length > 0;

export async function POST(request: Request): Promise<NextResponse> {
  if (!isDevSecretConfigured()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json()) as TestLoginBody;
  const email = parseTestLoginEmail(body);

  if (email === null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured." },
      { status: 503 },
    );
  }

  const user = await findOrCreateUserByEmail(email).catch(() => null);

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
