import path from "node:path";

/** A bundle file name from the server's manifest: plain segments only, no "..", no absolute path. */
export const isSafeBundleRelativePath = (value: string): boolean =>
  /^[A-Za-z0-9][A-Za-z0-9._-]*(\/[A-Za-z0-9][A-Za-z0-9._-]*)*$/.test(value) &&
  value.length <= 200 &&
  !value.split("/").includes("..");

/** Where the file lands, or null when it would leave the install folder. */
export const resolveBundleTarget = (
  installDir: string,
  relativePath: string,
): string | null => {
  if (!isSafeBundleRelativePath(relativePath)) return null;
  const base = path.resolve(installDir);
  const target = path.resolve(base, relativePath);
  return target.startsWith(base + path.sep) ? target : null;
};

/** Code is downloaded and run from this origin: https only (plain http just for this computer). */
export const isTrustedUpdateOrigin = (origin: string): boolean => {
  try {
    const url = new URL(origin);
    return (
      url.protocol === "https:" ||
      (url.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    );
  } catch {
    return false;
  }
};
