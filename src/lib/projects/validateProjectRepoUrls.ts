/** Max remotes stored per project (v1). */
export const PROJECT_REPO_URLS_MAX = 20;

/** Max length for defaultBranch. */
export const PROJECT_DEFAULT_BRANCH_MAX_LENGTH = 200;

export type ProjectRepoMetadata = {
  readonly repoUrls: readonly string[];
  readonly defaultBranch: string | null;
};

export type ValidateProjectRepoUrlsResult =
  | { readonly ok: true; readonly repoUrls: readonly string[] }
  | { readonly ok: false; readonly error: string };

export type ValidateDefaultBranchResult =
  | { readonly ok: true; readonly defaultBranch: string | null }
  | { readonly ok: false; readonly error: string };

const CREDENTIAL_QUERY_PATTERN =
  /[?&#](token|access_token|auth_token|api_key|password|secret)=/iu;

const SSH_SCP_PATTERN = /^git@[\w.-]+:[\w./~+-]+$/u;

const hasEmbeddedCredentials = (url: string): boolean => {
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

const isHttpsGitUrl = (url: string): boolean => {
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

const isSshGitUrl = (url: string): boolean => {
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

/** Trim, validate, dedupe (case-sensitive), preserve order. Cap at PROJECT_REPO_URLS_MAX. */
export const validateProjectRepoUrls = (
  value: unknown,
): ValidateProjectRepoUrlsResult => {
  if (!Array.isArray(value)) {
    return { ok: false, error: "repoUrls must be an array of strings." };
  }
  if (value.length > PROJECT_REPO_URLS_MAX) {
    return {
      ok: false,
      error: `repoUrls supports at most ${PROJECT_REPO_URLS_MAX} entries.`,
    };
  }

  const out: string[] = [];
  const seen = new Set<string>();

  for (const item of value) {
    if (typeof item !== "string") {
      return { ok: false, error: "Each repo URL must be a string." };
    }
    const trimmed = item.trim();
    if (trimmed.length === 0) {
      return { ok: false, error: "repoUrls entries must be non-empty." };
    }
    if (hasEmbeddedCredentials(trimmed)) {
      return {
        ok: false,
        error: "repoUrls must not include credentials or token query params.",
      };
    }
    if (!isHttpsGitUrl(trimmed) && !isSshGitUrl(trimmed)) {
      return {
        ok: false,
        error:
          "Each repo URL must be https://… or SSH (git@host:path / ssh://…).",
      };
    }
    if (seen.has(trimmed)) {
      continue;
    }
    seen.add(trimmed);
    out.push(trimmed);
  }

  return { ok: true, repoUrls: out };
};

export const validateDefaultBranch = (
  value: unknown,
): ValidateDefaultBranchResult => {
  if (value === null) {
    return { ok: true, defaultBranch: null };
  }
  if (typeof value !== "string") {
    return { ok: false, error: "defaultBranch must be a string or null." };
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { ok: false, error: "defaultBranch cannot be blank." };
  }
  if (trimmed.length > PROJECT_DEFAULT_BRANCH_MAX_LENGTH) {
    return {
      ok: false,
      error: `defaultBranch max length is ${PROJECT_DEFAULT_BRANCH_MAX_LENGTH}.`,
    };
  }
  if (/\s/u.test(trimmed)) {
    return { ok: false, error: "defaultBranch cannot contain whitespace." };
  }
  return { ok: true, defaultBranch: trimmed };
};

/**
 * Parse optional repo metadata from a request body record.
 * Omitted fields → undefined (leave unchanged on update / defaults on create).
 */
export const parseOptionalProjectRepoFields = (
  record: Record<string, unknown>,
):
  | {
      readonly ok: true;
      readonly repoUrls?: readonly string[];
      readonly defaultBranch?: string | null;
    }
  | { readonly ok: false; readonly error: string } => {
  let repoUrls: readonly string[] | undefined;
  let defaultBranch: string | null | undefined;

  if (record.repoUrls !== undefined) {
    const validated = validateProjectRepoUrls(record.repoUrls);
    if (!validated.ok) {
      return validated;
    }
    repoUrls = validated.repoUrls;
  }

  if (record.defaultBranch !== undefined) {
    const validated = validateDefaultBranch(record.defaultBranch);
    if (!validated.ok) {
      return validated;
    }
    defaultBranch = validated.defaultBranch;
  }

  return { ok: true, repoUrls, defaultBranch };
};
