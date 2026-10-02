const CREDENTIAL_QUERY_PATTERN =
  /[?&#](token|access_token|auth_token|api_key|password|secret)=/iu;

const SSH_SCP_PATTERN = /^git@[\w.-]+:[\w./~+-]+$/u;

export const hasEmbeddedCredentials = (url: string): boolean => {
  if (/^https:\/\/[^/]*@/iu.test(url)) {
    return true;
  }
  if (/^ssh:\/\/[^/@]+:[^/@]+@/iu.test(url)) {
    return true;
  }
  if (CREDENTIAL_QUERY_PATTERN.test(url)) {
    return true;
  }
  return false;
};

export const isHttpsGitUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname.length > 0 &&
      parsed.pathname.length > 1 &&
      !parsed.username &&
      !parsed.password
    );
  } catch {
    return false;
  }
};

export const isSshGitUrl = (url: string): boolean => {
  if (SSH_SCP_PATTERN.test(url)) {
    return true;
  }
  if (!url.toLowerCase().startsWith("ssh://")) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "ssh:" &&
      parsed.hostname.length > 0 &&
      parsed.pathname.length > 1 &&
      !parsed.password
    );
  } catch {
    return false;
  }
};

export const isValidProjectRepoUrl = (url: string): boolean => {
  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return false;
  }
  if (hasEmbeddedCredentials(trimmed)) {
    return false;
  }
  return isHttpsGitUrl(trimmed) || isSshGitUrl(trimmed);
};
