const resolveAuthSessionCookieName = (): string => {
  const authUrl = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "";
  const useSecureCookie = authUrl.startsWith("https://");

  return useSecureCookie
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
};

export default resolveAuthSessionCookieName;
