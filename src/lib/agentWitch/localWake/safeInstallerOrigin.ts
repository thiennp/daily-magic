/** The origin goes inside single quotes in the script: only a plain http(s) origin passes. */
export const safeInstallerOrigin = (origin: string): string => {
  const { protocol, origin: normalized } = new URL(origin);
  if (protocol !== "https:" && protocol !== "http:") {
    throw new Error("Unsupported origin for the local wake installer.");
  }
  return normalized.replace(/'/g, "");
};
