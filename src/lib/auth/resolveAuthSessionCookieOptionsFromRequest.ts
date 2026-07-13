export interface AuthSessionCookieOptions {
  readonly name: string;
  readonly secure: boolean;
}

const isSecureRequest = (request: Request): boolean => {
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedProto) {
    const primaryProto = forwardedProto.split(",")[0]?.trim();

    if (primaryProto === "https" || primaryProto === "http") {
      return primaryProto === "https";
    }
  }

  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
};

const resolveAuthUrlUsesSecureCookies = (): boolean | null => {
  const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;

  if (!authUrl) {
    return null;
  }

  try {
    return new URL(authUrl).protocol === "https:";
  } catch {
    return null;
  }
};

const resolveAuthSessionCookieOptionsFromRequest = (
  request: Request,
): AuthSessionCookieOptions => {
  const secure = resolveAuthUrlUsesSecureCookies() ?? isSecureRequest(request);

  return {
    name: secure ? "__Secure-authjs.session-token" : "authjs.session-token",
    secure,
  };
};

export default resolveAuthSessionCookieOptionsFromRequest;
