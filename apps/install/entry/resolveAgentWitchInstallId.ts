import crypto from "node:crypto";
import fs from "node:fs";

/**
 * 61e9c49e: a stable per-install fingerprint (hostname + resolved install
 * dir). Two installs on one machine and user (different HOME) differ; a
 * reinstall into the same folder keeps the id, so the server still
 * supersedes the old row for that install only.
 */
export const resolveAgentWitchInstallId = (input: {
  readonly hostname: string;
  readonly installDir: string;
  readonly realpath?: (target: string) => string;
}): string => {
  const realpath = input.realpath ?? fs.realpathSync;
  const resolvedDir = ((): string => {
    try {
      return realpath(input.installDir);
    } catch {
      return input.installDir;
    }
  })();
  return crypto
    .createHash("sha256")
    .update(`${input.hostname.trim().toLowerCase()}\0${resolvedDir}`)
    .digest("hex")
    .slice(0, 16);
};
