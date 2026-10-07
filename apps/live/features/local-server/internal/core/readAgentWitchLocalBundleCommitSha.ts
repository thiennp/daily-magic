const COMMIT_SHA_PATTERN = /^[0-9a-f]{7,40}$/;

export interface AgentWitchLocalBundleCommit {
  readonly commitSha: string | null;
  readonly shortCommitSha: string | null;
}

/**
 * DF-032: commit the shipped bundle was built from. The install bundle build
 * replaces `process.env.AGENT_WITCH_BUNDLE_COMMIT_SHA` with a literal
 * (scripts/buildAgentWitchInstallBundle.ts); dev runs read the env or get null.
 */
export const readAgentWitchLocalBundleCommitSha = (
  raw: string | undefined = process.env.AGENT_WITCH_BUNDLE_COMMIT_SHA,
): AgentWitchLocalBundleCommit => {
  const value = (raw ?? "").trim().toLowerCase();
  if (!COMMIT_SHA_PATTERN.test(value)) {
    return { commitSha: null, shortCommitSha: null };
  }
  return { commitSha: value, shortCommitSha: value.slice(0, 7) };
};
