import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

export interface AuthSessionCookieOptions {
  readonly name: string;
  readonly secure: boolean;
}

const resolveAppBaseUrlUsesSecureCookies = (): boolean => {
  try {
    return new URL(resolveAppBaseUrl()).protocol === "https:";
  } catch {
    return false;
  }
};

const resolveAuthSessionCookieOptionsFromRequest = (
  request: Request,
): AuthSessionCookieOptions => {
  void request;
  const secure = resolveAppBaseUrlUsesSecureCookies();

  return {
    name: secure ? "__Secure-authjs.session-token" : "authjs.session-token",
    secure,
  };
};

export default resolveAuthSessionCookieOptionsFromRequest;
