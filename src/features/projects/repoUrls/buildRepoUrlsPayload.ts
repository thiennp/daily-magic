export type AwcProjectRepoUrlsFieldsValue = {
  readonly repoUrls: readonly string[];
  readonly defaultBranch: string;
};

/** Collect non-empty trimmed URLs + optional branch for API payloads. */
export const buildRepoUrlsPayload = (
  value: AwcProjectRepoUrlsFieldsValue,
): {
  readonly repoUrls: string[];
  readonly defaultBranch: string | null;
} => {
  const repoUrls = value.repoUrls
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
  const trimmedBranch = value.defaultBranch.trim();
  return {
    repoUrls,
    defaultBranch: trimmedBranch.length > 0 ? trimmedBranch : null,
  };
};
