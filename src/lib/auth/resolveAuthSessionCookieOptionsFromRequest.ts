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

const resolveAuthSessionCookieOptionsFromRequest = (
  request: Request,
): AuthSessionCookieOptions => {
  const secure = isSecureRequest(request);

  return {
    name: secure ? "__Secure-authjs.session-token" : "authjs.session-token",
    secure,
  };
};

export default resolveAuthSessionCookieOptionsFromRequest;
