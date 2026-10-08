const SCP_REMOTE = /^[\w.-]+@([\w.-]+):(.+)$/u;

/** "github.com/acme/app" from an https, ssh or scp-style remote URL. */
export const formatGitRemote = (remote: string): string => {
  const trimmed = remote.trim();
  const scp = SCP_REMOTE.exec(trimmed);
  const hostAndPath = scp
    ? `${scp[1]}/${scp[2]}`
    : trimmed.replace(/^[a-z+]+:\/\/(?:[^/@]*@)?/iu, "");
  return hostAndPath.replace(/\.git$/u, "").replace(/\/+$/u, "");
};
