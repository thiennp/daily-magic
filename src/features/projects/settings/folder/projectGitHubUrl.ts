const GITHUB_REMOTE =
  /^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)([^/\s]+\/[^/\s]+?)(?:\.git)?\/?$/;

/** Browser URL for a GitHub remote (https, scp or ssh form), or null for other hosts. */
export const toGitHubWebUrl = (remote: string): string | null => {
  const match = GITHUB_REMOTE.exec(remote.trim());
  return match ? `https://github.com/${match[1]}` : null;
};
