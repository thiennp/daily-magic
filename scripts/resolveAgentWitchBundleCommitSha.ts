import { execFileSync } from "node:child_process";

const COMMIT_SHA_PATTERN = /^[0-9a-f]{7,40}$/;

/**
 * DF-032: commit stamped into the shipped install bundle so local `/health`
 * can report which build is running. Deploy env first (same order as
 * readAgentWitchServerRelease), then `git rev-parse HEAD`; null when unknown.
 */
export const resolveAgentWitchBundleCommitSha = (
  env: Readonly<Record<string, string | undefined>> = process.env,
  readGitHead: () => string = () =>
    execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }),
): string | null => {
  const fromEnv = [
    env.RAILWAY_GIT_COMMIT_SHA,
    env.VERCEL_GIT_COMMIT_SHA,
    env.GITHUB_SHA,
  ]
    .map((value) => value?.trim().toLowerCase() ?? "")
    .find((value) => COMMIT_SHA_PATTERN.test(value));
  if (fromEnv !== undefined) {
    return fromEnv;
  }
  try {
    const head = readGitHead().trim().toLowerCase();
    return COMMIT_SHA_PATTERN.test(head) ? head : null;
  } catch {
    return null;
  }
};
