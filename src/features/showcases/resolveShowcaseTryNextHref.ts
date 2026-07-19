const AUTH_REQUIRED_PATH_PREFIXES = [
  "/admin",
  "/automations",
  "/library",
  "/reports",
  "/marketplace",
  "/agent",
] as const;

const EXAMPLE_ORIGIN = "https://example.local";

export const buildShowcaseSignInHref = (callbackPath: string): string =>
  `/login?callbackUrl=${encodeURIComponent(callbackPath)}`;

export const isShowcaseTryNextAuthRequired = (href: string): boolean => {
  const url = new URL(href, EXAMPLE_ORIGIN);

  if (url.searchParams.has("sendTask")) {
    return true;
  }

  return AUTH_REQUIRED_PATH_PREFIXES.some(
    (prefix) =>
      url.pathname === prefix || url.pathname.startsWith(`${prefix}/`),
  );
};

/** Prefer signed-in destination; wrap auth-gated paths for anonymous readers. */
export const resolveShowcaseTryNextHref = (
  href: string,
  isSignedIn: boolean,
): string => {
  if (href.startsWith("/login")) {
    const callbackUrl = new URL(href, EXAMPLE_ORIGIN).searchParams.get(
      "callbackUrl",
    );

    if (isSignedIn && callbackUrl) {
      return callbackUrl;
    }

    return href;
  }

  if (isSignedIn || !isShowcaseTryNextAuthRequired(href)) {
    return href;
  }

  return buildShowcaseSignInHref(href);
};
