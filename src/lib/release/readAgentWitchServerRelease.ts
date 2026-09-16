import { AGENT_WITCH_SERVER_RELEASE_LABEL } from "@/lib/release/agentWitchServerReleaseLabel.constant";

export interface AgentWitchServerRelease {
  readonly label: string;
  readonly commitSha: string | null;
  readonly shortCommitSha: string | null;
}

const readGitCommitShaFromEnv = (): string | null => {
  const candidates = [
    process.env.RAILWAY_GIT_COMMIT_SHA,
    process.env.VERCEL_GIT_COMMIT_SHA,
    process.env.GITHUB_SHA,
  ];

  const commitSha = candidates
    .map((value) => value?.trim())
    .find((value) => value !== undefined && value.length > 0);

  return commitSha ?? null;
};

export const readAgentWitchServerRelease = (): AgentWitchServerRelease => {
  const commitSha = readGitCommitShaFromEnv();

  return {
    label: AGENT_WITCH_SERVER_RELEASE_LABEL,
    commitSha,
    shortCommitSha: commitSha !== null ? commitSha.slice(0, 7) : null,
  };
};
