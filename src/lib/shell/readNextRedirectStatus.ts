/** Next `redirect()` / `permanentRedirect()` encode status in error.digest. */
export const readNextRedirectStatus = (error: unknown): number | null => {
  if (typeof error !== "object" || error === null || !("digest" in error)) {
    return null;
  }
  const digest = (error as { digest: unknown }).digest;
  if (typeof digest !== "string" || !digest.startsWith("NEXT_REDIRECT;")) {
    return null;
  }
  const status = Number(digest.split(";").at(-2));
  return Number.isFinite(status) ? status : null;
};
